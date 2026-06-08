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

export interface Notification {
  id: string;
  type: 'task_push' | 'checkin_remind' | 'family_interact' | 'badge_earned' | 'report';
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
