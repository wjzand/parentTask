import { ChildInfo, UserStats } from '@/types';

export const mockChildInfo: ChildInfo = {
  nickname: '小糖果',
  avatar: 'https://picsum.photos/id/1027/200/200',
  birthday: '2020-03-15',
  age: 6,
  interestTags: ['手工', '科学', '绘画', '阅读']
};

export const mockUserStats: UserStats = {
  totalCheckins: 35,
  totalDuration: 525,
  totalBadges: 3,
  totalPoints: 420,
  streakDays: 5,
  longestStreak: 14
};
