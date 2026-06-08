import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useUserStore } from '@/store/useUserStore';
import { formatDuration } from '@/utils';
import styles from './index.module.scss';

const MinePage = () => {
  const { childInfo, stats, points } = useUserStore();

  const handleEditChild = () => {
    Taro.navigateTo({ url: '/pages/childInfo/index' });
  };

  const handleMenuClick = (url: string) => {
    Taro.navigateTo({ url });
  };

  const menuItems = [
    { icon: '🏅', text: '我的徽章', url: '/pages/badges/index', extra: `${stats.totalBadges}枚` },
    { icon: '💰', text: '积分兑换', url: '/pages/points/index', extra: '' },
    { icon: '❤️', text: '我的收藏', url: '/pages/favorites/index', extra: '' },
    { icon: '📝', text: '自定义任务', url: '/pages/customTask/index', extra: '' },
    { icon: '🔔', text: '消息通知', url: '/pages/messages/index', extra: '', dot: true },
    { icon: '📊', text: '陪伴报告', url: '/pages/report/index', extra: '' },
    { icon: '⚙️', text: '设置', url: '/pages/settings/index', extra: '' }
  ];

  return (
    <View className={styles.page}>
      <View className={styles.profileCard}>
        <View className={styles.avatar}>
          <Text>👶</Text>
        </View>
        <View className={styles.profileInfo}>
          <Text className={styles.childName}>{childInfo.nickname}</Text>
          <Text className={styles.childAge}>{childInfo.age}岁 · {childInfo.birthday}</Text>
          <View className={styles.interestTags}>
            {childInfo.interestTags.map((tag) => (
              <Text key={tag} className={styles.interestTag}>{tag}</Text>
            ))}
          </View>
        </View>
        <View className={styles.editBtn} onClick={handleEditChild}>
          <Text>编辑</Text>
        </View>
      </View>

      <View className={styles.statsCard}>
        <View className={styles.statItem}>
          <Text className={styles.statValue}>{stats.totalCheckins}</Text>
          <Text className={styles.statLabel}>打卡天数</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statValue}>{formatDuration(stats.totalDuration)}</Text>
          <Text className={styles.statLabel}>陪伴时长</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statValue}>{stats.streakDays}</Text>
          <Text className={styles.statLabel}>连续天数</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statValue}>{stats.totalBadges}</Text>
          <Text className={styles.statLabel}>徽章数</Text>
        </View>
      </View>

      <View className={styles.pointsCard}>
        <View className={styles.pointsLeft}>
          <Text className={styles.pointsLabel}>陪伴积分</Text>
          <Text className={styles.pointsValue}>{points}</Text>
        </View>
        <View className={styles.pointsBtn} onClick={() => handleMenuClick('/pages/points/index')}>
          <Text>去兑换</Text>
        </View>
      </View>

      <View className={styles.menuSection}>
        {menuItems.map((item) => (
          <View key={item.text} className={styles.menuItem} onClick={() => handleMenuClick(item.url)}>
            <Text className={styles.menuIcon}>{item.icon}</Text>
            <Text className={styles.menuText}>{item.text}</Text>
            {item.extra && <Text className={styles.menuExtra}>{item.extra}</Text>}
            {item.dot && <View className={styles.notificationDot} />}
            <Text className={styles.menuArrow}>›</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MinePage;
