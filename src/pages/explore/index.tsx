import { useState, useMemo } from 'react';
import { View, Text, Input, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import TaskTypeTag from '@/components/TaskTypeTag';
import { useTaskStore } from '@/store/useTaskStore';
import { TaskType, TASK_TYPE_EMOJI, AgeRange, TaskDuration } from '@/types';
import styles from './index.module.scss';

const TABS: { key: TaskType | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'craft', label: '手工创作' },
  { key: 'science', label: '科学实验' },
  { key: 'sport', label: '运动游戏' },
  { key: 'reading', label: '绘本共读' },
  { key: 'outdoor', label: '户外探索' },
  { key: 'chore', label: '家务小帮手' },
  { key: 'sensory', label: '感官发展' },
  { key: 'holiday', label: '节日特辑' }
];

const AGE_FILTERS: { key: AgeRange | 'all'; label: string }[] = [
  { key: 'all', label: '全部年龄' },
  { key: '3-4', label: '3-4岁' },
  { key: '4-6', label: '4-6岁' },
  { key: '6-8', label: '6-8岁' },
  { key: '8-10', label: '8-10岁' },
  { key: '10-12', label: '10-12岁' }
];

const DURATION_FILTERS: { key: TaskDuration | 'all'; label: string }[] = [
  { key: 'all', label: '全部时长' },
  { key: 5, label: '5分钟' },
  { key: 15, label: '15分钟' },
  { key: 30, label: '30分钟+' }
];

const ExplorePage = () => {
  const { allTasks, toggleFavorite } = useTaskStore();
  const [activeTab, setActiveTab] = useState<TaskType | 'all'>('all');
  const [ageFilter, setAgeFilter] = useState<AgeRange | 'all'>('all');
  const [durationFilter, setDurationFilter] = useState<TaskDuration | 'all'>('all');
  const [searchText, setSearchText] = useState('');

  const filteredTasks = useMemo(() => {
    let result = allTasks;
    if (activeTab !== 'all') {
      result = result.filter((t) => t.type === activeTab);
    }
    if (ageFilter !== 'all') {
      result = result.filter((t) => t.ageRange.includes(ageFilter));
    }
    if (durationFilter !== 'all') {
      if (durationFilter === 30) {
        result = result.filter((t) => t.duration >= 30);
      } else {
        result = result.filter((t) => t.duration === durationFilter);
      }
    }
    if (searchText.trim()) {
      const keyword = searchText.trim().toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(keyword) ||
          t.materials.some((m) => m.toLowerCase().includes(keyword))
      );
    }
    return result;
  }, [allTasks, activeTab, ageFilter, durationFilter, searchText]);

  const handleTaskClick = (taskId: string) => {
    Taro.navigateTo({ url: `/pages/task-detail/index?id=${taskId}` });
  };

  const handleFavorite = (taskId: string, e: any) => {
    e.stopPropagation();
    toggleFavorite(taskId);
  };

  return (
    <View className={styles.page}>
      <View className={styles.searchBar}>
        <Input
          className={styles.searchInput}
          placeholder="搜索任务名称或材料..."
          value={searchText}
          onInput={(e) => setSearchText(e.detail.value)}
        />
      </View>

      <ScrollView scrollX className={styles.tabBar}>
        {TABS.map((tab) => (
          <View
            key={tab.key}
            className={classnames(styles.tabItem, activeTab === tab.key && styles.tabActive)}
            onClick={() => setActiveTab(tab.key)}
          >
            <Text>{tab.label}</Text>
          </View>
        ))}
      </ScrollView>

      <View className={styles.filterRow}>
        {AGE_FILTERS.map((f) => (
          <View
            key={f.key}
            className={classnames(styles.filterBtn, ageFilter === f.key && styles.filterActive)}
            onClick={() => setAgeFilter(f.key)}
          >
            <Text>{f.label}</Text>
          </View>
        ))}
      </View>

      <View className={styles.filterRow}>
        {DURATION_FILTERS.map((f) => (
          <View
            key={f.key}
            className={classnames(styles.filterBtn, durationFilter === f.key && styles.filterActive)}
            onClick={() => setDurationFilter(f.key)}
          >
            <Text>{f.label}</Text>
          </View>
        ))}
      </View>

      <ScrollView scrollY className={styles.taskList}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <View
              key={task.id}
              className={styles.taskItem}
              onClick={() => handleTaskClick(task.id)}
            >
              <View className={styles.taskImage}>
                <Text className={styles.taskImageEmoji}>{TASK_TYPE_EMOJI[task.type]}</Text>
              </View>
              <View className={styles.taskInfo}>
                <Text className={styles.taskName}>{task.name}</Text>
                <View className={styles.taskMeta}>
                  <TaskTypeTag type={task.type} size="small" />
                </View>
                <View className={styles.taskStats}>
                  <Text className={styles.statItem}>⏱ {task.duration}分钟</Text>
                  <Text className={styles.statItem}>{task.completedCount}家庭已做</Text>
                  <Text className={styles.statItem}>★ {task.rating}</Text>
                </View>
              </View>
              <View className={styles.favoriteBtn} onClick={(e) => handleFavorite(task.id, e)}>
                <Text>{task.isFavorite ? '❤️' : '🤍'}</Text>
              </View>
            </View>
          ))
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyEmoji}>🔍</Text>
            <Text className={styles.emptyText}>没有找到相关任务</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ExplorePage;
