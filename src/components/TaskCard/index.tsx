import React from 'react';
import { View, Text } from '@tarojs/components';
import { Task, TASK_TYPE_EMOJI, AGE_RANGE_LABELS, AgeRange } from '@/types';
import TaskTypeTag from '@/components/TaskTypeTag';
import styles from './index.module.scss';

interface TaskCardProps {
  task: Task;
  status?: 'new' | 'claimed' | 'in_progress' | 'completed';
  showDetail?: boolean;
  onFlip?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, status = 'new', showDetail = false, onFlip }) => {
  const renderStars = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  return (
    <View className={styles.cardWrapper} onClick={onFlip}>
      <View className={`${styles.card} ${showDetail ? styles.cardFlipped : ''}`}>
        {!showDetail ? (
          <View className={styles.cardFront}>
            <View className={styles.cardHeader}>
              <TaskTypeTag type={task.type} />
              <Text className={styles.duration}>⏱ {task.duration}分钟</Text>
            </View>
            <View className={styles.cardCover}>
              <Text className={styles.coverEmoji}>{TASK_TYPE_EMOJI[task.type]}</Text>
            </View>
            <Text className={styles.taskName}>{task.name}</Text>
            <View className={styles.cardMeta}>
              <Text className={styles.stars}>{renderStars(task.difficulty)}</Text>
              <Text className={styles.age}>
                {task.ageRange.map((a: AgeRange) => AGE_RANGE_LABELS[a]).join(' · ')}
              </Text>
            </View>
            {task.materials.length > 0 && (
              <View className={styles.materials}>
                <Text className={styles.materialsLabel}>所需材料：</Text>
                <Text className={styles.materialsText}>{task.materials.join('、')}</Text>
              </View>
            )}
            {status !== 'new' && (
              <View className={`${styles.statusBadge} ${status === 'claimed' ? styles.statusClaimed : ''} ${status === 'in_progress' ? styles.statusInProgress : ''} ${status === 'completed' ? styles.statusCompleted : ''}`}>
                <Text className={styles.statusText}>
                  {status === 'claimed' ? '已领取' : status === 'in_progress' ? '进行中' : '已完成'}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View className={styles.cardBack}>
            <Text className={styles.backTitle}>📝 任务步骤</Text>
            {task.steps.map((step) => (
              <View key={step.order} className={styles.stepItem}>
                <View className={styles.stepOrder}>
                  <Text className={styles.stepOrderText}>{step.order}</Text>
                </View>
                <View className={styles.stepContent}>
                  <Text className={styles.stepTitle}>{step.title}</Text>
                  <Text className={styles.stepDesc}>{step.description}</Text>
                </View>
              </View>
            ))}
            {task.tips.length > 0 && (
              <View className={styles.tipsSection}>
                <Text className={styles.tipsTitle}>💡 温馨提示</Text>
                {task.tips.map((tip, idx) => (
                  <Text key={idx} className={styles.tipText}>· {tip}</Text>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default TaskCard;
