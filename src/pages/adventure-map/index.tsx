import { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useAdventureStore } from '@/store/useAdventureStore';
import { TREASURE_TYPE_CONFIG } from '@/types';
import styles from './index.module.scss';

const AdventureMapPage = () => {
  const {
    currentMap,
    showTreasureModal,
    currentTreasure,
    showStoryModal,
    currentStoryNode,
    advanceNode,
    openTreasure,
    closeTreasureModal,
    openStoryModal,
    closeStoryModal
  } = useAdventureStore();

  const [, setScrollLeft] = useState(0);

  const currentNodeIndex = currentMap.nodes.findIndex((n) => n.status === 'current');
  const scrollTarget = currentNodeIndex >= 0 ? currentNodeIndex * 280 : 0;

  const handleNodeClick = (node: typeof currentMap.nodes[0]) => {
    if (node.status === 'locked') return;
    if (node.status === 'current') {
      Taro.showToast({ title: '打卡后即可到达这里', icon: 'none' });
      return;
    }
    if (node.isTreasure && !node.treasureOpened) {
      openTreasure(node.id);
      return;
    }
    openStoryModal(node.id);
  };

  const handleAdvance = () => {
    advanceNode();
    Taro.showToast({ title: '🎉 又前进了一站！', icon: 'none' });
  };

  const handleViewStory = () => {
    Taro.navigateTo({ url: '/pages/adventure-story/index' });
  };

  const renderPathLine = (index: number) => {
    const node = currentMap.nodes[index];
    const prevNode = index > 0 ? currentMap.nodes[index - 1] : null;
    const isActive = node.status !== 'locked' && prevNode && prevNode.status !== 'locked';
    return (
      <View
        key={`path-${index}`}
        className={classnames(styles.pathLine, isActive && styles.pathLineActive)}
      />
    );
  };

  const renderNode = (node: typeof currentMap.nodes[0], index: number) => {
    const isUnlocked = node.status === 'unlocked';
    const isCurrent = node.status === 'current';
    const isLocked = node.status === 'locked';

    return (
      <View key={node.id} className={styles.nodeWrapper}>
        {index > 0 && renderPathLine(index)}
        <View
          className={classnames(
            styles.nodeCard,
            isUnlocked && styles.nodeUnlocked,
            isCurrent && styles.nodeCurrent,
            isLocked && styles.nodeLocked,
            node.isTreasure && styles.nodeTreasure
          )}
          onClick={() => handleNodeClick(node)}
        >
          {isCurrent && <View className={styles.nodePulse} />}
          {node.isTreasure && !node.treasureOpened && (
            <View className={styles.treasureBadge}>
              <Text className={styles.treasureBadgeText}>🎁</Text>
            </View>
          )}
          {node.isTreasure && node.treasureOpened && (
            <View className={classnames(styles.treasureBadge, styles.treasureBadgeOpened)}>
              <Text className={styles.treasureBadgeText}>✨</Text>
            </View>
          )}
          <Text className={classnames(
            styles.nodeEmoji,
            isLocked && styles.nodeEmojiLocked
          )}>
            {isLocked ? '❓' : node.emoji}
          </Text>
          <Text className={classnames(
            styles.nodeName,
            isLocked && styles.nodeNameLocked
          )}>
            {isLocked ? '???' : node.name}
          </Text>
          {isUnlocked && node.unlockedAt && (
            <Text className={styles.nodeDate}>{node.unlockedAt.slice(5, 10)}</Text>
          )}
          {isCurrent && (
            <Text className={styles.nodeHint}>打卡解锁</Text>
          )}
          {isLocked && (
            <View className={styles.nodeFog} />
          )}
        </View>
      </View>
    );
  };

  const renderFinishNode = () => (
    <View className={styles.nodeWrapper}>
      {renderPathLine(currentMap.nodes.length)}
      <View
        className={classnames(
          styles.nodeCard,
          styles.nodeFinish,
          currentMap.isCompleted && styles.nodeFinishCompleted
        )}
      >
        <Text className={styles.nodeEmoji}>🏆</Text>
        <Text className={styles.nodeName}>终点庆典</Text>
        {currentMap.isCompleted ? (
          <Text className={styles.nodeDate}>已达成！</Text>
        ) : (
          <Text className={styles.nodeHint}>完成全部解锁</Text>
        )}
      </View>
    </View>
  );

  return (
    <View className={styles.page}>
      <View className={styles.mapHeader} style={{ background: currentMap.bgGradient }}>
        <View className={styles.headerContent}>
          <Text className={styles.mapEmoji}>{currentMap.emoji}</Text>
          <View className={styles.headerInfo}>
            <Text className={styles.mapTitle}>{currentMap.title}</Text>
            <Text className={styles.mapSubtitle}>{currentMap.subtitle}</Text>
          </View>
        </View>
        <View className={styles.progressRow}>
          <View className={styles.progressBar}>
            <View
              className={styles.progressFill}
              style={{
                width: `${(currentMap.unlockedCount / currentMap.totalNodes) * 100}%`,
                background: currentMap.accentColor
              }}
            />
          </View>
          <Text className={styles.progressText}>
            {currentMap.unlockedCount}/{currentMap.totalNodes} 站
          </Text>
        </View>
      </View>

      <ScrollView
        scrollX
        className={styles.mapScroll}
        scrollLeft={scrollTarget}
        onScroll={(e) => setScrollLeft(e.detail.scrollLeft)}
        enhanced
        showScrollbar={false}
      >
        <View className={styles.mapTrack}>
          {currentMap.nodes.map((node, index) => renderNode(node, index))}
          {renderFinishNode()}
        </View>
      </ScrollView>

      <View className={styles.actionSection}>
        {currentMap.nodes.some((n) => n.status === 'current') && (
          <View className={styles.advanceBtn} onClick={handleAdvance}>
            <Text className={styles.advanceBtnText}>🚶 前进到下一站</Text>
          </View>
        )}
        <View className={styles.storyBtn} onClick={handleViewStory}>
          <Text className={styles.storyBtnText}>📖 探险手账</Text>
        </View>
      </View>

      <View className={styles.infoSection}>
        <View className={styles.infoCard}>
          <Text className={styles.infoTitle}>💡 探险提示</Text>
          <Text className={styles.infoText}>每完成一次任务打卡，地图上就前进一步哦！宝箱节点会自动打开，看看里面有什么惊喜~</Text>
        </View>
        <View className={styles.infoCard}>
          <Text className={styles.infoTitle}>⏰ 补卡机制</Text>
          <Text className={styles.infoText}>漏打卡可以用积分兑换「时光倒流卡」补上，但宝箱节点不可补卡哦~</Text>
        </View>
      </View>

      {showTreasureModal && currentTreasure && (
        <View className={styles.modalOverlay} onClick={closeTreasureModal}>
          <View className={styles.treasureModal} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.treasureTitle}>🎁 发现宝箱！</Text>
            <View className={styles.treasureBox}>
              <Text className={styles.treasureBoxEmoji}>🧰</Text>
            </View>
            <View className={styles.treasureContent}>
              <Text className={styles.treasureContentEmoji}>
                {currentTreasure.treasureType ? TREASURE_TYPE_CONFIG[currentTreasure.treasureType].emoji : '💰'}
              </Text>
              <Text className={styles.treasureContentLabel}>
                {currentTreasure.treasureType ? TREASURE_TYPE_CONFIG[currentTreasure.treasureType].label : '神秘礼物'}
              </Text>
            </View>
            <View className={styles.treasureCloseBtn} onClick={closeTreasureModal}>
              <Text>太棒了！收下</Text>
            </View>
          </View>
        </View>
      )}

      {showStoryModal && currentStoryNode && (
        <View className={styles.modalOverlay} onClick={closeStoryModal}>
          <View className={styles.storyModal} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.storyModalTitle}>{currentStoryNode.storyEmoji} {currentStoryNode.name}</Text>
            <Text className={styles.storyModalFragment}>{currentStoryNode.storyFragment}</Text>
            {currentStoryNode.unlockedAt && (
              <Text className={styles.storyModalDate}>解锁于 {currentStoryNode.unlockedAt}</Text>
            )}
            <View className={styles.storyModalCloseBtn} onClick={closeStoryModal}>
              <Text>知道了</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AdventureMapPage;
