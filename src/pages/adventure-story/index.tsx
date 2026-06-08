import { View, Text, ScrollView } from '@tarojs/components';
import { useAdventureStore } from '@/store/useAdventureStore';
import styles from './index.module.scss';

const AdventureStoryPage = () => {
  const { currentMap, stories } = useAdventureStore();

  const unlockedNodes = currentMap.nodes.filter((n) => n.status === 'unlocked');
  const displayEntries = unlockedNodes.map((node) => {
    const story = stories.find((s) => s.nodeId === node.id);
    return {
      nodeId: node.id,
      nodeName: node.name,
      nodeEmoji: node.emoji,
      storyFragment: node.storyFragment,
      storyEmoji: node.storyEmoji,
      unlockedAt: node.unlockedAt || '',
      checkinNote: story?.checkinNote,
      isTreasure: node.isTreasure,
      treasureOpened: node.treasureOpened,
      order: node.order
    };
  }).sort((a, b) => a.order - b.order);

  return (
    <View className={styles.page}>
      <View className={styles.header} style={{ background: currentMap.bgGradient }}>
        <Text className={styles.headerEmoji}>{currentMap.emoji}</Text>
        <View className={styles.headerInfo}>
          <Text className={styles.headerTitle}>{currentMap.title} · 探险手账</Text>
          <Text className={styles.headerSub}>已收集 {displayEntries.length} 段故事</Text>
        </View>
      </View>

      {displayEntries.length === 0 ? (
        <View className={styles.empty}>
          <Text className={styles.emptyEmoji}>📖</Text>
          <Text className={styles.emptyText}>还没有解锁的故事</Text>
          <Text className={styles.emptyHint}>完成打卡任务，解锁更多剧情吧！</Text>
        </View>
      ) : (
        <ScrollView scrollY className={styles.storyList}>
          {displayEntries.map((entry, index) => (
            <View key={entry.nodeId} className={styles.storyCard}>
              <View className={styles.cardTimeline}>
                <View className={styles.timelineDot}>
                  <Text className={styles.timelineDotText}>{index + 1}</Text>
                </View>
                {index < displayEntries.length - 1 && <View className={styles.timelineLine} />}
              </View>
              <View className={styles.cardContent}>
                <View className={styles.cardHeader}>
                  <Text className={styles.cardEmoji}>{entry.nodeEmoji}</Text>
                  <View className={styles.cardTitleRow}>
                    <Text className={styles.cardTitle}>{entry.nodeName}</Text>
                    {entry.isTreasure && (
                      <View className={styles.treasureTag}>
                        <Text className={styles.treasureTagText}>
                          {entry.treasureOpened ? '✨ 已开宝箱' : '🎁 宝箱'}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text className={styles.cardDate}>{entry.unlockedAt.slice(0, 10)}</Text>
                </View>
                <View className={styles.storyBlock}>
                  <Text className={styles.storyEmoji}>{entry.storyEmoji}</Text>
                  <Text className={styles.storyText}>{entry.storyFragment}</Text>
                </View>
                {entry.checkinNote && (
                  <View className={styles.checkinNote}>
                    <Text className={styles.checkinNoteLabel}>📝 打卡记录</Text>
                    <Text className={styles.checkinNoteText}>{entry.checkinNote}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}

          {currentMap.isCompleted && (
            <View className={styles.finaleCard}>
              <Text className={styles.finaleEmoji}>🎉</Text>
              <Text className={styles.finaleTitle}>故事完结</Text>
              <Text className={styles.finaleText}>
                恭喜你完成了「{currentMap.title}」的全部探险！
                这个故事将永远留存在你的探险手账中。
              </Text>
              <View className={styles.finaleBadge}>
                <Text className={styles.finaleBadgeEmoji}>{currentMap.completionBadge?.icon || '🏆'}</Text>
                <Text className={styles.finaleBadgeName}>{currentMap.completionBadge?.name || '月度探险家'}</Text>
              </View>
            </View>
          )}

          {!currentMap.isCompleted && (
            <View className={styles.continueCard}>
              <Text className={styles.continueEmoji}>🗺️</Text>
              <Text className={styles.continueTitle}>冒险还在继续...</Text>
              <Text className={styles.continueText}>
                还有 {currentMap.totalNodes - currentMap.unlockedCount} 个节点等待解锁，
                继续打卡揭开故事的结局吧！
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default AdventureStoryPage;
