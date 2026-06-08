import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import dayjs from 'dayjs';
import TaskCard from '@/components/TaskCard';
import WeekProgress from '@/components/WeekProgress';
import { useTaskStore } from '@/store/useTaskStore';
import { useTimer } from '@/hooks/useTimer';
import { getCompanionQuote, getWeatherEmoji } from '@/utils';
import styles from './index.module.scss';

const HomePage = () => {
  const { todayTask, claimTask, startTask, completeTask, changeTask, weekCheckins } = useTaskStore();
  const { formattedTime, start: startTimer, stop: stopTimer } = useTimer();
  const [showDetail, setShowDetail] = useState(false);
  const [quote] = useState(getCompanionQuote());

  const handleFlip = () => {
    setShowDetail(!showDetail);
  };

  const handleClaim = () => {
    claimTask();
    Taro.showToast({ title: '任务已领取', icon: 'success' });
  };

  const handleChange = () => {
    if (todayTask.changeCount >= todayTask.maxChangeCount) {
      Taro.showToast({ title: '今日更换次数已用完', icon: 'none' });
      return;
    }
    changeTask();
    setShowDetail(false);
  };

  const handleCustom = () => {
    Taro.navigateTo({ url: '/pages/custom-task/index' });
  };

  const handleStartTimer = () => {
    startTask();
    startTimer();
  };

  const handleStopTimer = () => {
    stopTimer();
  };

  const handleCheckin = () => {
    completeTask();
    Taro.navigateTo({ url: '/pages/checkin/index' });
  };

  const handleNavigate = (url: string) => {
    Taro.switchTab({ url });
  };

  const remainingChanges = todayTask.maxChangeCount - todayTask.changeCount;

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.dateRow}>
          <Text className={styles.dateText}>{dayjs().format('YYYY年MM月DD日')}</Text>
          <Text className={styles.weatherText}>{getWeatherEmoji()} 晴 26°</Text>
        </View>
        <View className={styles.quoteBox}>
          <Text className={styles.quoteText}>「{quote}」</Text>
        </View>
      </View>

      <View className={styles.cardSection}>
        <TaskCard
          task={todayTask.task}
          status={todayTask.status}
          showDetail={showDetail}
          onFlip={handleFlip}
        />
      </View>

      {todayTask.status === 'new' && (
        <>
          <View className={styles.actionButtons}>
            <View className={styles.btnClaim} onClick={handleClaim}>
              <Text>领取任务</Text>
            </View>
            <View
              className={classnames(styles.btnChange, remainingChanges <= 0 && styles.btnDisabled)}
              onClick={handleChange}
            >
              <Text>换一个</Text>
            </View>
            <View className={styles.btnCustom} onClick={handleCustom}>
              <Text>自定义</Text>
            </View>
          </View>
          <Text className={styles.changeHint}>
            今日剩余{remainingChanges}次免费更换机会
          </Text>
        </>
      )}

      {todayTask.status === 'claimed' && (
        <View className={styles.timerSection}>
          <Text className={styles.timerDisplay}>{formattedTime}</Text>
          <View className={classnames(styles.timerBtn, styles.timerStart)} onClick={handleStartTimer}>
            <Text>开始计时</Text>
          </View>
        </View>
      )}

      {todayTask.status === 'in_progress' && (
        <View className={styles.timerSection}>
          <Text className={styles.timerDisplay}>{formattedTime}</Text>
          <View className={classnames(styles.timerBtn, styles.timerStop)} onClick={handleStopTimer}>
            <Text>结束计时</Text>
          </View>
        </View>
      )}

      {(todayTask.status === 'in_progress' || todayTask.status === 'claimed') && (
        <View className={styles.actionButtons}>
          <View className={styles.btnCheckin} onClick={handleCheckin}>
            <Text>去打卡</Text>
          </View>
        </View>
      )}

      {todayTask.status === 'completed' && (
        <View className={styles.completedBanner}>
          <Text className={styles.completedEmoji}>🎉</Text>
          <Text className={styles.completedText}>今日任务已完成</Text>
          <Text className={styles.completedSubText}>明天还有新的精彩任务等你哦</Text>
        </View>
      )}

      <View className={styles.progressSection}>
        <WeekProgress completed={weekCheckins} total={7} />
      </View>

      <View className={styles.quickEntries}>
        <View className={styles.entryItem} onClick={() => handleNavigate('/pages/explore/index')}>
          <Text className={styles.entryEmoji}>📚</Text>
          <Text className={styles.entryLabel}>任务库</Text>
        </View>
        <View className={styles.entryItem} onClick={() => handleNavigate('/pages/growth/index')}>
          <Text className={styles.entryEmoji}>🌳</Text>
          <Text className={styles.entryLabel}>成长树</Text>
        </View>
        <View className={styles.entryItem} onClick={() => Taro.navigateTo({ url: '/pages/checkin-records/index' })}>
          <Text className={styles.entryEmoji}>📅</Text>
          <Text className={styles.entryLabel}>打卡记录</Text>
        </View>
        <View className={styles.entryItem} onClick={() => Taro.navigateTo({ url: '/pages/badges/index' })}>
          <Text className={styles.entryEmoji}>🏅</Text>
          <Text className={styles.entryLabel}>徽章</Text>
        </View>
      </View>
    </View>
  );
};

export default HomePage;
