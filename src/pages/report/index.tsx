import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useUserStore } from '@/store/useUserStore';
import { mockWeeklyReport, mockMonthlyReport } from '@/data/mockReport';
import {
  TaskType,
  TASK_TYPE_EMOJI,
  TASK_TYPE_LABELS,
  TASK_TYPE_COLORS,
  MOOD_BABY_EMOJI,
  MoodBaby
} from '@/types';
import { formatDuration } from '@/utils';
import styles from './index.module.scss';

const RADAR_DIMENSIONS = [
  { key: 'fineMotor' as const, emoji: '✋', label: '精细动作' },
  { key: 'language' as const, emoji: '🗣️', label: '语言表达' },
  { key: 'logic' as const, emoji: '🧠', label: '逻辑思维' },
  { key: 'social' as const, emoji: '🤝', label: '社交能力' },
  { key: 'creativity' as const, emoji: '🎨', label: '创造力' },
  { key: 'physical' as const, emoji: '🏃', label: '体能发展' }
];

const MOOD_HEIGHT_MAP: Record<MoodBaby, number> = {
  very_happy: 80,
  happy: 60,
  normal: 40,
  uncooperative: 20
};

const WEEK_DAYS = ['一', '二', '三', '四', '五', '六', '日'];

const ReportPage = () => {
  const { childInfo } = useUserStore();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');

  const weekly = mockWeeklyReport;
  const monthly = mockMonthlyReport;

  const typeEntries = Object.entries(
    activeTab === 'weekly' ? weekly.typeDistribution : monthly.typeDistribution
  ) as [TaskType, number][];
  const maxCount = Math.max(...typeEntries.map(([, c]) => c), 1);

  const renderOverview = () => {
    const days = activeTab === 'weekly' ? weekly.checkinDays : monthly.checkinDays;
    const duration = activeTab === 'weekly' ? weekly.totalDuration : monthly.totalDuration;
    const badges = activeTab === 'weekly' ? weekly.newBadges : monthly.newBadges;

    return (
      <View className={styles.overviewCard}>
        <View className={styles.overviewItem}>
          <Text className={styles.overviewValue}>{days}</Text>
          <Text className={styles.overviewLabel}>打卡天数</Text>
        </View>
        <View className={styles.overviewItem}>
          <Text className={styles.overviewValue}>{formatDuration(duration)}</Text>
          <Text className={styles.overviewLabel}>陪伴时长</Text>
        </View>
        <View className={styles.overviewItem}>
          <Text className={styles.overviewValue}>{badges.length}</Text>
          <Text className={styles.overviewLabel}>新徽章</Text>
        </View>
      </View>
    );
  };

  const renderMoodTrend = () => {
    return (
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>😊 宝宝心情趋势</Text>
        <View className={styles.moodRow}>
          {weekly.moodTrend.map((mood, idx) => (
            <View key={idx} className={styles.moodItem}>
              <Text className={styles.moodEmoji}>{MOOD_BABY_EMOJI[mood]}</Text>
              <View
                className={styles.moodBar}
                style={{ height: `${MOOD_HEIGHT_MAP[mood]}rpx` }}
              />
              <Text className={styles.moodDay}>{WEEK_DAYS[idx]}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderTypeDistribution = () => {
    const filtered = typeEntries.filter(([, c]) => c > 0);
    return (
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>📊 任务类型分布</Text>
        <View className={styles.typeList}>
          {filtered.map(([type, count]) => (
            <View key={type} className={styles.typeItem}>
              <Text className={styles.typeEmoji}>{TASK_TYPE_EMOJI[type]}</Text>
              <Text className={styles.typeName}>{TASK_TYPE_LABELS[type]}</Text>
              <View className={styles.typeBarBg}>
                <View
                  className={styles.typeBarFill}
                  style={{
                    width: `${(count / maxCount) * 100}%`,
                    backgroundColor: TASK_TYPE_COLORS[type]
                  }}
                />
              </View>
              <Text className={styles.typeCount}>{count}次</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderRadar = () => {
    const radar = monthly.abilityRadar;
    const center = 250;
    const maxR = 180;

    const getPoint = (index: number, value: number) => {
      const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
      const r = (value / 100) * maxR;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle)
      };
    };

    const points = RADAR_DIMENSIONS.map((dim, idx) => getPoint(idx, radar[dim.key]));

    return (
      <View className={styles.radarSection}>
        <Text className={styles.sectionTitle}>🎯 能力发展分析</Text>
        <View className={styles.radarContainer}>
          <View className={styles.radarBg}>
            {[0.25, 0.5, 0.75, 1].map((scale) => (
              <View
                key={scale}
                className={styles.radarRing}
                style={{
                  width: `${maxR * 2 * scale}rpx`,
                  height: `${maxR * 2 * scale}rpx`
                }}
              />
            ))}
          </View>

          <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {RADAR_DIMENSIONS.map((dim, idx) => {
              const labelPoint = getPoint(idx, 120);
              return (
                <View
                  key={dim.key}
                  className={styles.radarLabel}
                  style={{
                    left: `${labelPoint.x}rpx`,
                    top: `${labelPoint.y}rpx`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <Text className={styles.radarLabelEmoji}>{dim.emoji}</Text>
                  <Text className={styles.radarLabelText}>{dim.label}</Text>
                  <Text className={styles.radarValueText}>{radar[dim.key]}</Text>
                </View>
              );
            })}
          </View>

          <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {points.map((p, idx) => {
              return (
                <View
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: `${p.x}rpx`,
                    top: `${p.y}rpx`,
                    width: '12rpx',
                    height: '12rpx',
                    borderRadius: '50%',
                    background: '#FFC53D',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const renderBadges = () => {
    const badges = activeTab === 'weekly' ? weekly.newBadges : monthly.newBadges;
    return (
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>🏅 解锁徽章</Text>
        {badges.length > 0 ? (
          <View className={styles.badgeList}>
            {badges.map((badge) => (
              <View key={badge.id} className={styles.badgeItem}>
                <View className={styles.badgeIcon}>
                  <Text>{badge.icon}</Text>
                </View>
                <Text className={styles.badgeName}>{badge.name}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text className={styles.emptyBadge}>本周暂无新徽章，继续加油！</Text>
        )}
      </View>
    );
  };

  const renderSummary = () => {
    const days = activeTab === 'weekly' ? weekly.checkinDays : monthly.checkinDays;
    const duration = activeTab === 'weekly' ? weekly.totalDuration : monthly.totalDuration;
    const total = activeTab === 'weekly' ? 7 : 30;

    return (
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>� 陪伴总结</Text>
        <Text className={styles.summaryText}>
          {childInfo.nickname}在{activeTab === 'weekly' ? '本周' : '本月'}共完成
          <Text className={styles.highlight}>{days}</Text>天打卡，
          累计陪伴<Text className={styles.highlight}>{formatDuration(duration)}</Text>。
          {days >= total * 0.7
            ? '坚持得很棒，继续保持高质量的陪伴时光！'
            : '再多花一点时间陪伴宝贝吧，每一分钟都是珍贵的回忆。'}
        </Text>
      </View>
    );
  };

  const handleShare = () => {
    Taro.showToast({ title: '报告已保存', icon: 'success' });
  };

  return (
    <View className={styles.page}>
      <View className={styles.tabBar}>
        <View
          className={classnames(styles.tabItem, activeTab === 'weekly' && styles.tabActive)}
          onClick={() => setActiveTab('weekly')}
        >
          <Text>周报</Text>
        </View>
        <View
          className={classnames(styles.tabItem, activeTab === 'monthly' && styles.tabActive)}
          onClick={() => setActiveTab('monthly')}
        >
          <Text>月报</Text>
        </View>
      </View>

      <View className={styles.dateRange}>
        <Text className={styles.dateText}>
          {activeTab === 'weekly'
            ? `${weekly.weekStart} ~ ${weekly.weekEnd}`
            : `${monthly.month}`}
        </Text>
      </View>

      {renderOverview()}

      {activeTab === 'weekly' && renderMoodTrend()}

      {renderTypeDistribution()}

      {activeTab === 'monthly' && renderRadar()}

      {renderBadges()}

      {renderSummary()}

      <View className={styles.shareBtn} onClick={handleShare}>
        <Text>保存报告图片</Text>
      </View>
    </View>
  );
};

export default ReportPage;
