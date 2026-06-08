import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface WeekProgressProps {
  completed: number;
  total: number;
}

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

const WeekProgress: React.FC<WeekProgressProps> = ({ completed, total }) => {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.title}>本周打卡进度</Text>
        <Text className={styles.count}>{completed}/{total} 天</Text>
      </View>
      <View className={styles.days}>
        {WEEKDAYS.map((day, index) => {
          const isCompleted = index < completed;
          const isToday = index === todayIndex;
          return (
            <View key={day} className={styles.dayItem}>
              <View
                className={`${styles.dayCircle} ${isCompleted ? styles.dayCompleted : ''} ${isToday ? styles.dayToday : ''}`}
              >
                {isCompleted && <Text className={styles.dayCheck}>✓</Text>}
              </View>
              <Text className={`${styles.dayLabel} ${isToday ? styles.dayLabelToday : ''}`}>
                {day}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default WeekProgress;
