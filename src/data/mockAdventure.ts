import { AdventureMap, MapNode, AdventureStoryEntry, ADVENTURE_THEME_CONFIG } from '@/types';

const oceanConfig = ADVENTURE_THEME_CONFIG.ocean;

const oceanNodes: MapNode[] = [
  { id: 'o1', order: 1, name: '出发港口', emoji: '⛵', status: 'unlocked', isTreasure: false, treasureOpened: false, storyFragment: '小海龟涛涛站在港口，望着无边的大海。"我要找到回家的路！"它坚定地说。', storyEmoji: '🌅', unlockedAt: '2026-06-01' },
  { id: 'o2', order: 2, name: '珊瑚花园', emoji: '🪸', status: 'unlocked', isTreasure: false, treasureOpened: false, storyFragment: '涛涛游过了五彩斑斓的珊瑚花园，遇到了热心的海马先生。"我知道回家的路！"海马先生说。', storyEmoji: '🦑', unlockedAt: '2026-06-02' },
  { id: 'o3', order: 3, name: '水母海', emoji: '🪼', status: 'unlocked', isTreasure: true, treasureType: 'points_30', treasureOpened: true, storyFragment: '穿过水母海时，涛涛发现了一个闪闪发光的宝箱！原来是海底精灵留下的礼物。', storyEmoji: '✨', unlockedAt: '2026-06-03' },
  { id: 'o4', order: 4, name: '海藻迷宫', emoji: '🌿', status: 'unlocked', isTreasure: false, treasureOpened: false, storyFragment: '茂密的海藻组成了一个巨大的迷宫。涛涛用勇气和智慧，终于找到了出口。', storyEmoji: '🌀', unlockedAt: '2026-06-05' },
  { id: 'o5', order: 5, name: '海豚湾', emoji: '🐬', status: 'current', isTreasure: false, treasureOpened: false, storyFragment: '一群友好的海豚在跳跃嬉戏，它们答应带涛涛穿过危险的海峡。', storyEmoji: '🌊' },
  { id: 'o6', order: 6, name: '深海暗流', emoji: '🌀', status: 'locked', isTreasure: false, treasureOpened: false, storyFragment: '深海中有一股神秘的暗流，传说只有最勇敢的旅行者才能通过。', storyEmoji: '😨' },
  { id: 'o7', order: 7, name: '沉船遗迹', emoji: '🚢', status: 'locked', isTreasure: true, treasureType: 'sticker', treasureOpened: false, storyFragment: '一艘古老沉船里藏着珍贵的航海图和神秘宝藏。', storyEmoji: '🗺️' },
  { id: 'o8', order: 8, name: '鲸鱼歌声', emoji: '🐋', status: 'locked', isTreasure: false, treasureOpened: false, storyFragment: '鲸鱼爷爷用低沉的歌声为涛涛指引方向，每一段旋律都藏着线索。', storyEmoji: '🎵' },
  { id: 'o9', order: 9, name: '珍珠洞窟', emoji: '🫧', status: 'locked', isTreasure: true, treasureType: 'points_100', treasureOpened: false, storyFragment: '洞窟深处闪耀着百颗珍珠的光芒，这是海洋女王留下的奖赏。', storyEmoji: '💎' },
  { id: 'o10', order: 10, name: '归家之岸', emoji: '🏖️', status: 'locked', isTreasure: false, treasureOpened: false, storyFragment: '终于，涛涛看到了那片熟悉的海岸！家人在沙滩上等它回来。这一路的冒险，让它变得更加勇敢了。', storyEmoji: '🎉' }
];

export const mockAdventureMap: AdventureMap = {
  id: 'map_202606',
  theme: 'ocean',
  month: '2026-06',
  title: oceanConfig.title,
  subtitle: oceanConfig.subtitle,
  emoji: oceanConfig.emoji,
  bgGradient: oceanConfig.bgGradient,
  accentColor: oceanConfig.accentColor,
  nodes: oceanNodes,
  totalNodes: 10,
  unlockedCount: 4,
  isCompleted: false,
  completionBadge: {
    id: 'badge_ocean_explorer',
    name: '海洋探险家',
    description: '完成海洋奇旅全部探险节点',
    icon: '🐚',
    condition: '完成海洋奇旅',
    earned: false,
    category: 'special'
  }
};

export const mockAdventureStories: AdventureStoryEntry[] = [
  { nodeId: 'o1', nodeName: '出发港口', nodeEmoji: '⛵', storyFragment: '小海龟涛涛站在港口，望着无边的大海。"我要找到回家的路！"它坚定地说。', storyEmoji: '🌅', unlockedAt: '2026-06-01', checkinNote: '今天和宝贝一起画了一幅海洋画' },
  { nodeId: 'o2', nodeName: '珊瑚花园', nodeEmoji: '🪸', storyFragment: '涛涛游过了五彩斑斓的珊瑚花园，遇到了热心的海马先生。"我知道回家的路！"海马先生说。', storyEmoji: '🦑', unlockedAt: '2026-06-02', checkinNote: '做了海洋主题的手工' },
  { nodeId: 'o3', nodeName: '水母海', nodeEmoji: '🪼', storyFragment: '穿过水母海时，涛涛发现了一个闪闪发光的宝箱！原来是海底精灵留下的礼物。', storyEmoji: '✨', unlockedAt: '2026-06-03', checkinNote: '一起做了一道海洋主题点心' },
  { nodeId: 'o4', nodeName: '海藻迷宫', nodeEmoji: '🌿', storyFragment: '茂密的海藻组成了一个巨大的迷宫。涛涛用勇气和智慧，终于找到了出口。', storyEmoji: '🌀', unlockedAt: '2026-06-05', checkinNote: '公园里玩迷宫游戏' }
];

export const mockAdventureNotifications = [
  { id: 'an1', type: 'adventure_new_map' as const, title: '🗺️ 新地图已解锁', content: '本月新地图「海洋奇旅」已开启，和宝贝一起出发吧！', read: false, createdAt: '2026-06-01 08:00:00' },
  { id: 'an2', type: 'adventure_treasure' as const, title: '🎁 发现神秘宝箱', content: '在探险途中发现了一个神秘宝箱，快去看看里面有什么！', read: false, createdAt: '2026-06-03 19:30:00' },
  { id: 'an3', type: 'adventure_near_end' as const, title: '🏁 接近终点', content: '距离本月终点仅差6站，坚持打卡就能揭开故事大结局哦！', read: true, createdAt: '2026-06-05 09:00:00' }
];
