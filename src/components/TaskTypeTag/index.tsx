import React from 'react';
import { View, Text } from '@tarojs/components';
import { TaskType, TASK_TYPE_LABELS, TASK_TYPE_COLORS, TASK_TYPE_EMOJI } from '@/types';
import styles from './index.module.scss';

interface TaskTypeTagProps {
  type: TaskType;
  size?: 'small' | 'normal';
}

const TaskTypeTag: React.FC<TaskTypeTagProps> = ({ type, size = 'normal' }) => {
  return (
    <View
      className={`${styles.tag} ${size === 'small' ? styles.tagSmall : styles.tagNormal}`}
      style={{ backgroundColor: `${TASK_TYPE_COLORS[type]}18`, color: TASK_TYPE_COLORS[type] }}
    >
      <Text className={styles.tagEmoji}>{TASK_TYPE_EMOJI[type]}</Text>
      <Text className={size === 'small' ? styles.tagTextSmall : styles.tagTextNormal}>
        {TASK_TYPE_LABELS[type]}
      </Text>
    </View>
  );
};

export default TaskTypeTag;
