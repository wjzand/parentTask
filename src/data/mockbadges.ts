import { Badge } from '@/types';

export const mockBadges: Badge[] = [
  {
    id: 'b1',
    name: '初次陪伴',
    description: '完成第一次打卡',
    icon: '🌱',
    condition: '完成第一次打卡',
    earned: true,
    earnedAt: '2026-05-01',
    category: 'streak'
  },
  {
    id: 'b2',
    name: '周冠军',
    description: '一周打卡7天',
    icon: '🏆',
    condition: '一周打卡7天',
    earned: true,
    earnedAt: '2026-05-08',
    category: 'streak'
  },
  {
    id: 'b3',
    name: '手工达人',
    description: '完成10个手工任务',
    icon: '🎨',
    condition: '完成10个手工任务',
    earned: false,
    category: 'type'
  },
  {
    id: 'b4',
    name: '运动小将',
    description: '完成10个运动任务',
    icon: '⚽',
    condition: '完成10个运动任务',
    earned: false,
    category: 'type'
  },
  {
    id: 'b5',
    name: '科学怪才',
    description: '完成10个实验任务',
    icon: '🔬',
    condition: '完成10个实验任务',
    earned: false,
    category: 'type'
  },
  {
    id: 'b6',
    name: '森林卫士',
    description: '完成5个户外探索任务',
    icon: '🌲',
    condition: '完成5个户外探索任务',
    earned: true,
    earnedAt: '2026-05-20',
    category: 'type'
  },
  {
    id: 'b7',
    name: '家务小帮手',
    description: '完成5个家务任务',
    icon: '🧹',
    condition: '完成5个家务任务',
    earned: false,
    category: 'type'
  },
  {
    id: 'b8',
    name: '21天习惯养成',
    description: '连续打卡21天',
    icon: '🔥',
    condition: '连续打卡21天',
    earned: false,
    category: 'streak'
  },
  {
    id: 'b9',
    name: '百日坚持',
    description: '累计打卡100天',
    icon: '💎',
    condition: '累计打卡100天',
    earned: false,
    category: 'streak'
  },
  {
    id: 'b10',
    name: '创意之星',
    description: '打卡内容被评为精选3次',
    icon: '⭐',
    condition: '打卡内容被评为精选3次',
    earned: false,
    category: 'special'
  },
  {
    id: 'b11',
    name: '端午龙舟',
    description: '端午节完成龙舟手工任务',
    icon: '🐉',
    condition: '端午节完成指定任务',
    earned: false,
    category: 'holiday'
  }
];
