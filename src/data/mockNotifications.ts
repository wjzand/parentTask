import { Notification } from '@/types';

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'task_push',
    title: '今日任务已更新',
    content: '小糖果，今天的任务是"树叶贴画大作战"，一起去捡落叶吧！',
    read: false,
    createdAt: '2026-06-04 08:00'
  },
  {
    id: 'n2',
    type: 'badge_earned',
    title: '获得新徽章',
    content: '恭喜获得"森林卫士"徽章！完成5个户外探索任务解锁',
    read: false,
    createdAt: '2026-06-03 20:00'
  },
  {
    id: 'n3',
    type: 'family_interact',
    title: '奶奶赞了你的打卡',
    content: '奶奶觉得你的"树叶贴画"作品太棒了！',
    read: true,
    createdAt: '2026-06-03 16:45'
  },
  {
    id: 'n4',
    type: 'checkin_remind',
    title: '打卡提醒',
    content: '今天的任务还没完成哦，抓住睡前的15分钟吧！',
    read: true,
    createdAt: '2026-06-02 21:00'
  },
  {
    id: 'n5',
    type: 'report',
    title: '周报已生成',
    content: '上周共打卡5天，累计陪伴75分钟，查看详细报告',
    read: true,
    createdAt: '2026-06-01 20:00'
  },
  {
    id: 'n6',
    type: 'family_interact',
    title: '小豆子妈妈评论了你的打卡',
    content: '"下次一起画呀！"——来自小豆子妈妈',
    read: true,
    createdAt: '2026-05-31 11:00'
  }
];
