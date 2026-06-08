export type TaskType = 'craft' | 'science' | 'sport' | 'reading' | 'outdoor' | 'chore' | 'sensory' | 'holiday';

export type TaskDifficulty = 1 | 2 | 3 | 4 | 5;

export type AgeRange = '3-4' | '4-6' | '6-8' | '8-10' | '10-12';

export type TaskDuration = 5 | 15 | 30 | 60;

export type TaskStatus = 'new' | 'claimed' | 'in_progress' | 'completed';

export type MoodBaby = 'very_happy' | 'happy' | 'normal' | 'uncooperative';

export type MoodParent = 'accomplished' | 'tired' | 'healed';

export type Visibility = 'private' | 'family' | 'public';

export type GrowthStage = 'seed' | 'sprout' | 'sapling' | 'flowering' | 'fruiting' | 'big_tree';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface Task {
  id: string;
  name: string;
  type: TaskType;
  difficulty: TaskDifficulty;
  duration: TaskDuration;
  ageRange: AgeRange[];
  description: string;
  materials: string[];
  steps: TaskStep[];
  tips: string[];
  coverImage: string;
  completedCount: number;
  rating: number;
  isFavorite: boolean;
  season?: Season[];
  isHoliday?: boolean;
  holidayName?: string;
}

export interface TaskStep {
  order: number;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface TodayTask {
  task: Task;
  status: TaskStatus;
  claimedAt?: string;
  startedAt?: string;
  completedAt?: string;
  changeCount: number;
  maxChangeCount: number;
}

export interface Checkin {
  id: string;
  taskId: string;
  taskName: string;
  taskType: TaskType;
  images: string[];
  video?: string;
  note: string;
  moodBaby: MoodBaby;
  moodParent: MoodParent;
  visibility: Visibility;
  createdAt: string;
  duration: number;
  isFeatured: boolean;
  likes: number;
  comments: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  earned: boolean;
  earnedAt?: string;
  category: 'streak' | 'type' | 'special' | 'holiday';
}

export interface FamilyMember {
  id: string;
  nickname: string;
  avatar: string;
  relation: string;
  childName: string;
}

export interface FamilyPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  checkin: Checkin;
  likes: number;
  comments: FamilyComment[];
  createdAt: string;
  isLiked: boolean;
}

export interface FamilyComment {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
  isQuickReply: boolean;
}

export interface GrowthTreeData {
  stage: GrowthStage;
  totalCheckins: number;
  waterDrops: number;
  milestones: GrowthMilestone[];
  badges: Badge[];
  taskIcons: TaskIcon[];
}

export interface GrowthMilestone {
  stage: GrowthStage;
  requiredCheckins: number;
  reached: boolean;
}

export interface TaskIcon {
  type: TaskType;
  count: number;
}

export interface ChildInfo {
  nickname: string;
  avatar: string;
  birthday: string;
  age: number;
  interestTags: string[];
}

export interface UserStats {
  totalCheckins: number;
  totalDuration: number;
  totalBadges: number;
  totalPoints: number;
  streakDays: number;
  longestStreak: number;
}

export interface WeeklyReport {
  weekStart: string;
  weekEnd: string;
  checkinDays: number;
  totalDuration: number;
  newBadges: Badge[];
  moodTrend: MoodBaby[];
  typeDistribution: Record<TaskType, number>;
}

export interface MonthlyReport {
  month: string;
  checkinDays: number;
  totalDuration: number;
  newBadges: Badge[];
  abilityRadar: AbilityRadar;
  typeDistribution: Record<TaskType, number>;
}

export interface AbilityRadar {
  fineMotor: number;
  language: number;
  logic: number;
  social: number;
  creativity: number;
  physical: number;
}

export type AdventureTheme = 'ocean' | 'forest' | 'space' | 'garden' | 'desert' | 'candy';

export type MapNodeStatus = 'locked' | 'current' | 'unlocked';

export type TreasureType = 'points_30' | 'points_50' | 'points_100' | 'sticker' | 'lottery' | 'coupon';

export interface MapNode {
  id: string;
  order: number;
  name: string;
  emoji: string;
  status: MapNodeStatus;
  isTreasure: boolean;
  treasureType?: TreasureType;
  treasureOpened: boolean;
  storyFragment: string;
  storyEmoji: string;
  unlockedAt?: string;
  checkinId?: string;
}

export interface AdventureMap {
  id: string;
  theme: AdventureTheme;
  month: string;
  title: string;
  subtitle: string;
  emoji: string;
  bgGradient: string;
  accentColor: string;
  nodes: MapNode[];
  totalNodes: number;
  unlockedCount: number;
  isCompleted: boolean;
  completionBadge?: Badge;
}

export interface AdventureStoryEntry {
  nodeId: string;
  nodeName: string;
  nodeEmoji: string;
  storyFragment: string;
  storyEmoji: string;
  unlockedAt: string;
  checkinNote?: string;
  checkinImages?: string[];
}

export interface Notification {
  id: string;
  type: 'task_push' | 'checkin_remind' | 'family_interact' | 'badge_earned' | 'report' | 'adventure_new_map' | 'adventure_treasure' | 'adventure_near_end' | 'adventure_completed';
  title: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  craft: '手工创作',
  science: '科学实验',
  sport: '运动游戏',
  reading: '绘本共读',
  outdoor: '户外探索',
  chore: '家务小帮手',
  sensory: '感官发展',
  holiday: '节日特辑'
};

export const TASK_TYPE_COLORS: Record<TaskType, string> = {
  craft: '#FF9C6E',
  science: '#69C0FF',
  sport: '#73D13D',
  reading: '#B37FEB',
  outdoor: '#36CFC9',
  chore: '#FFD666',
  sensory: '#F759AB',
  holiday: '#FF4D4F'
};

export const TASK_TYPE_EMOJI: Record<TaskType, string> = {
  craft: '🎨',
  science: '🔬',
  sport: '⚽',
  reading: '📖',
  outdoor: '🌿',
  chore: '🧹',
  sensory: '🤲',
  holiday: '🎉'
};

export const MOOD_BABY_LABELS: Record<MoodBaby, string> = {
  very_happy: '非常开心',
  happy: '开心',
  normal: '一般',
  uncooperative: '不配合'
};

export const MOOD_BABY_EMOJI: Record<MoodBaby, string> = {
  very_happy: '😆',
  happy: '😊',
  normal: '😐',
  uncooperative: '😤'
};

export const MOOD_PARENT_LABELS: Record<MoodParent, string> = {
  accomplished: '有成就感',
  tired: '有点累',
  healed: '很治愈'
};

export const MOOD_PARENT_EMOJI: Record<MoodParent, string> = {
  accomplished: '💪',
  tired: '😅',
  healed: '🥰'
};

export const GROWTH_STAGE_LABELS: Record<GrowthStage, string> = {
  seed: '种子',
  sprout: '发芽',
  sapling: '小树',
  flowering: '开花',
  fruiting: '结果',
  big_tree: '大树'
};

export const GROWTH_MILESTONES: GrowthMilestone[] = [
  { stage: 'seed', requiredCheckins: 0, reached: true },
  { stage: 'sprout', requiredCheckins: 7, reached: false },
  { stage: 'sapling', requiredCheckins: 21, reached: false },
  { stage: 'flowering', requiredCheckins: 50, reached: false },
  { stage: 'fruiting', requiredCheckins: 100, reached: false },
  { stage: 'big_tree', requiredCheckins: 365, reached: false }
];

export const AGE_RANGE_LABELS: Record<AgeRange, string> = {
  '3-4': '小童 3-4岁',
  '4-6': '中童 4-6岁',
  '6-8': '大童 6-8岁',
  '8-10': '学龄 8-10岁',
  '10-12': '少年 10-12岁'
};

export const ADVENTURE_THEME_CONFIG: Record<AdventureTheme, { title: string; emoji: string; bgGradient: string; accentColor: string; subtitle: string }> = {
  ocean: { title: '海洋奇旅', emoji: '🌊', bgGradient: 'linear-gradient(180deg, #E6F7FF 0%, #BAE7FF 50%, #91D5FF 100%)', accentColor: '#1890FF', subtitle: '帮助小海龟找到回家的路' },
  forest: { title: '森林冒险', emoji: '🌲', bgGradient: 'linear-gradient(180deg, #F6FFED 0%, #D9F7BE 50%, #B7EB8F 100%)', accentColor: '#52C41A', subtitle: '寻找神奇草药治病救人' },
  space: { title: '太空漫游', emoji: '🚀', bgGradient: 'linear-gradient(180deg, #F9F0FF 0%, #EFDBFF 50%, #D3ADF7 100%)', accentColor: '#722ED1', subtitle: '收集星星碎片点亮星座' },
  garden: { title: '花园秘境', emoji: '🌺', bgGradient: 'linear-gradient(180deg, #FFF0F6 0%, #FFD6E7 50%, #FFADD2 100%)', accentColor: '#EB2F96', subtitle: '寻找传说中的七色花' },
  desert: { title: '沙漠寻宝', emoji: '🏜️', bgGradient: 'linear-gradient(180deg, #FFFBE6 0%, #FFF1B8 50%, #FFE58F 100%)', accentColor: '#FA8C16', subtitle: '穿越沙漠找到古老宝藏' },
  candy: { title: '糖果王国', emoji: '🍭', bgGradient: 'linear-gradient(180deg, #FFF0F6 0%, #FFD6E7 30%, #EFDBFF 70%, #D9F7BE 100%)', accentColor: '#F759AB', subtitle: '寻找糖果王国的秘密配方' }
};

export const TREASURE_TYPE_CONFIG: Record<TreasureType, { label: string; emoji: string; value: number }> = {
  points_30: { label: '陪伴积分×30', emoji: '💰', value: 30 },
  points_50: { label: '陪伴积分×50', emoji: '💰', value: 50 },
  points_100: { label: '陪伴积分×100', emoji: '💎', value: 100 },
  sticker: { label: '限定贴纸', emoji: '✨', value: 0 },
  lottery: { label: '绘本抽奖机会', emoji: '🎁', value: 0 },
  coupon: { label: '亲子优惠券', emoji: '🎫', value: 0 }
};
