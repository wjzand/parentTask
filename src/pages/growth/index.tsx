import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useUserStore } from '@/store/useUserStore';
import { mockBadges } from '@/data/mockBadges';
import { mockCheckins } from '@/data/mockTasks';
import {
  GrowthStage,
  GROWTH_STAGE_LABELS,
  GROWTH_MILESTONES,
  TASK_TYPE_EMOJI,
  MOOD_BABY_EMOJI
} from '@/types';
import styles from './index.module.scss';

const TREE_EMOJI_MAP: Record<GrowthStage, string> = {
  seed: '🫘',
  sprout: '🌱',
  sapling: '🌿',
  flowering: '🌸',
  fruiting: '🍎',
  big_tree: '🌳'
};

const currentStage: GrowthStage = 'sapling';
const totalCheckins = 35;

const GrowthPage = () => {
  const { stats } = useUserStore();
  const [activeTab, setActiveTab] = useState<'tree' | 'calendar' | 'records'>('tree');

  const currentMilestones = GROWTH_MILESTONES.map((m) => ({
    ...m,
    reached: totalCheckins >= m.requiredCheckins
  }));

  const earnedBadges = mockBadges.filter((b) => b.earned);
  const unearnedBadges = mockBadges.filter((b) => !b.earned);

  const renderTree = () => (
    <View className={styles.treeSection}>
      <View className={styles.treeContainer}>
        <View className={styles.treeBg} />
        <Text className={styles.treeEmoji}>{TREE_EMOJI_MAP[currentStage]}</Text>
        <Text className={styles.treeStageLabel}>{GROWTH_STAGE_LABELS[currentStage]}</Text>
        <Text className={styles.treeCheckinCount}>已打卡 {totalCheckins} 天</Text>
        <View className={styles.waterBtn}>
          <Text>💧 浇水</Text>
        </View>
      </View>
    </View>
  );

  const renderMilestones = () => (
    <View className={styles.milestoneSection}>
      <Text className={styles.milestoneTitle}>成长里程碑</Text>
      <View className={styles.milestoneList}>
        {currentMilestones.map((m) => (
          <View key={m.stage} className={styles.milestoneItem}>
            <View className={classnames(styles.milestoneDot, m.reached && styles.milestoneReached)}>
              {m.reached && <Text className={styles.milestoneDotText}>✓</Text>}
            </View>
            <Text className={classnames(styles.milestoneLabel, m.reached && styles.milestoneLabelReached)}>
              {GROWTH_STAGE_LABELS[m.stage]}
            </Text>
            <Text className={styles.milestoneCount}>{m.requiredCheckins}天</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderBadges = () => (
    <View className={styles.badgeSection}>
      <View className={styles.sectionHeader}>
        <Text className={styles.sectionTitle}>陪伴徽章</Text>
        <Text className={styles.sectionMore} onClick={() => Taro.navigateTo({ url: '/pages/badges/index' })}>
          查看全部
        </Text>
      </View>
      <View className={styles.badgeGrid}>
        {earnedBadges.map((badge) => (
          <View key={badge.id} className={styles.badgeItem}>
            <View className={classnames(styles.badgeIcon, styles.badgeIconEarned)}>
              <Text>{badge.icon}</Text>
            </View>
            <Text className={classnames(styles.badgeName, styles.badgeNameEarned)}>{badge.name}</Text>
          </View>
        ))}
        {unearnedBadges.slice(0, 4).map((badge) => (
          <View key={badge.id} className={styles.badgeItem}>
            <View className={styles.badgeIcon}>
              <Text style={{ opacity: 0.4 }}>{badge.icon}</Text>
            </View>
            <Text className={styles.badgeName}>{badge.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCalendar = () => {
    const daysInMonth = new Date(2026, 5, 0).getDate();
    const checkedDays = [1, 2, 3, 5, 6, 7, 10, 11, 12, 15, 16, 17, 20, 21, 22, 25, 26, 27, 30, 31];
    const today = 4;
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

    return (
      <View className={styles.calendarSection}>
        <View className={styles.calendarGrid}>
          {weekdays.map((d) => (
            <View key={d} className={classnames(styles.calendarDay, styles.calendarEmpty)}>
              <Text>{d}</Text>
            </View>
          ))}
          {days.map((day) => (
            <View
              key={day}
              className={classnames(
                styles.calendarDay,
                checkedDays.includes(day) && styles.calendarChecked,
                day === today && styles.calendarToday
              )}
            >
              <Text>{day}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderRecords = () => (
    <View className={styles.recordsSection}>
      {mockCheckins.map((checkin) => (
        <View key={checkin.id} className={styles.recordItem}>
          <View className={styles.recordImage}>
            <Text className={styles.recordImageEmoji}>{TASK_TYPE_EMOJI[checkin.taskType]}</Text>
          </View>
          <View className={styles.recordInfo}>
            <Text className={styles.recordName}>{checkin.taskName}</Text>
            <Text className={styles.recordDate}>{checkin.createdAt}</Text>
          </View>
          <Text className={styles.recordMood}>{MOOD_BABY_EMOJI[checkin.moodBaby]}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View className={styles.page}>
      <View className={styles.tabBar}>
        <View
          className={classnames(styles.tabItem, activeTab === 'tree' && styles.tabActive)}
          onClick={() => setActiveTab('tree')}
        >
          <Text>成长树</Text>
        </View>
        <View
          className={classnames(styles.tabItem, activeTab === 'calendar' && styles.tabActive)}
          onClick={() => setActiveTab('calendar')}
        >
          <Text>日历</Text>
        </View>
        <View
          className={classnames(styles.tabItem, activeTab === 'records' && styles.tabActive)}
          onClick={() => setActiveTab('records')}
        >
          <Text>打卡记录</Text>
        </View>
      </View>

      {activeTab === 'tree' && (
        <>
          {renderTree()}
          {renderMilestones()}
          {renderBadges()}
        </>
      )}
      {activeTab === 'calendar' && renderCalendar()}
      {activeTab === 'records' && renderRecords()}
    </View>
  );
};

export default GrowthPage;
