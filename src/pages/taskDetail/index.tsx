import React, { useState, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import classnames from 'classnames';
import TaskTypeTag from '@/components/TaskTypeTag';
import { useTaskStore } from '@/store/useTaskStore';
import { useTimer } from '@/hooks/useTimer';
import {
  Task,
  TASK_TYPE_EMOJI,
  AGE_RANGE_LABELS,
  AgeRange
} from '@/types';
import { formatDuration } from '@/utils';
import styles from './index.module.scss';

const TaskDetailPage = () => {
  const router = useRouter();
  const { allTasks, toggleFavorite } = useTaskStore();
  const { formattedTime, isRunning, start: startTimer, stop: stopTimer } = useTimer();
  const [checkedMaterials, setCheckedMaterials] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const task: Task | undefined = useMemo(() => {
    const id = router.params.id;
    if (!id) return allTasks[0];
    return allTasks.find((t) => t.id === id) || allTasks[0];
  }, [router.params.id, allTasks]);

  if (!task) {
    return (
      <View className={styles.page}>
        <Text>任务不存在</Text>
      </View>
    );
  }

  const toggleMaterial = (index: number) => {
    setCheckedMaterials((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const toggleStep = (order: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(order)) {
        next.delete(order);
      } else {
        next.add(order);
      }
      return next;
    });
  };

  const handleClaim = () => {
    Taro.showToast({ title: '任务已领取', icon: 'success' });
  };

  const handleCheckin = () => {
    Taro.navigateTo({ url: '/pages/checkin/index' });
  };

  const handleFavorite = () => {
    toggleFavorite(task.id);
    Taro.showToast({
      title: task.isFavorite ? '已取消收藏' : '已收藏',
      icon: 'none'
    });
  };

  const renderStars = (difficulty: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} className={classnames(styles.starItem, i > difficulty && styles.starEmpty)}>
          ★
        </Text>
      );
    }
    return stars;
  };

  return (
    <View className={styles.page}>
      <View className={styles.coverSection}>
        <Text className={styles.coverEmoji}>{TASK_TYPE_EMOJI[task.type]}</Text>
        <View className={styles.coverTypeBadge}>
          <TaskTypeTag type={task.type} />
        </View>
      </View>

      <View className={styles.infoCard}>
        <Text className={styles.taskName}>{task.name}</Text>
        <Text className={styles.taskDesc}>{task.description}</Text>
        <View className={styles.metaRow}>
          <View className={styles.metaItem}>
            <Text className={styles.metaLabel}>耗时</Text>
            <Text className={styles.metaValue}>{formatDuration(task.duration)}</Text>
          </View>
          <View className={styles.metaItem}>
            <Text className={styles.metaLabel}>难度</Text>
            <View className={styles.starsRow}>{renderStars(task.difficulty)}</View>
          </View>
          <View className={styles.metaItem}>
            <Text className={styles.metaLabel}>适合</Text>
            <Text className={styles.metaValue}>
              {task.ageRange.map((a: AgeRange) => AGE_RANGE_LABELS[a]).join(' · ')}
            </Text>
          </View>
        </View>
        <View className={styles.statsRow}>
          <View className={styles.statItem}>
            <Text className={styles.statIcon}>👨‍👩‍👧</Text>
            <Text className={styles.statText}>{task.completedCount}家庭已做</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statIcon}>⭐</Text>
            <Text className={styles.statText}>好评 {task.rating}</Text>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>🧰 材料清单</Text>
        <View className={styles.materialList}>
          {task.materials.map((material, idx) => {
            const checked = checkedMaterials.has(idx);
            return (
              <View
                key={idx}
                className={classnames(styles.materialItem, checked && styles.materialChecked)}
                onClick={() => toggleMaterial(idx)}
              >
                <Text className={classnames(styles.materialCheck, checked && styles.materialCheckActive)}>
                  {checked ? '✓' : '○'}
                </Text>
                <Text className={classnames(styles.materialName, checked && styles.materialNameChecked)}>
                  {material}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>📝 步骤引导</Text>
        <View className={styles.stepList}>
          {task.steps.map((step) => {
            const done = completedSteps.has(step.order);
            return (
              <View key={step.order} className={styles.stepItem}>
                <View className={classnames(styles.stepOrder, done && styles.stepOrderDone)}>
                  <Text className={styles.stepOrderText}>{done ? '✓' : step.order}</Text>
                </View>
                <View className={styles.stepContent}>
                  <View className={styles.stepHeader}>
                    <Text className={styles.stepTitle}>{step.title}</Text>
                    <View
                      className={classnames(styles.stepCheckBox, done && styles.stepChecked)}
                      onClick={() => toggleStep(step.order)}
                    >
                      <Text>{done ? '✓' : ''}</Text>
                    </View>
                  </View>
                  <Text className={classnames(styles.stepDesc, done && styles.stepDescDone)}>
                    {step.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {task.tips.length > 0 && (
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>💡 温馨提示</Text>
          <View className={styles.tipsList}>
            {task.tips.map((tip, idx) => (
              <View key={idx} className={styles.tipItem}>
                <Text className={styles.tipIcon}>·</Text>
                <Text className={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View className={styles.timerCard}>
        <View className={styles.timerLeft}>
          <Text className={styles.timerEmoji}>⏱</Text>
          <View className={styles.timerInfo}>
            <Text className={styles.timerLabel}>专注陪伴计时</Text>
            <Text className={styles.timerValue}>{formattedTime}</Text>
          </View>
        </View>
        <View
          className={classnames(styles.timerBtn, isRunning ? styles.timerBtnStop : styles.timerBtnStart)}
          onClick={isRunning ? stopTimer : startTimer}
        >
          <Text>{isRunning ? '结束计时' : '开始计时'}</Text>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.btnFav} onClick={handleFavorite}>
          <Text>{task.isFavorite ? '❤️' : '🤍'}</Text>
        </View>
        <View className={styles.btnClaim} onClick={handleClaim}>
          <Text>领取任务</Text>
        </View>
        <View className={styles.btnCheckin} onClick={handleCheckin}>
          <Text>去打卡</Text>
        </View>
      </View>
    </View>
  );
};

export default TaskDetailPage;
