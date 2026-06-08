import { FamilyMember, FamilyPost } from '@/types';

export const mockFamilyMembers: FamilyMember[] = [
  {
    id: 'fm1',
    nickname: '奶奶',
    avatar: 'https://picsum.photos/id/91/200/200',
    relation: '祖母',
    childName: '小糖果'
  },
  {
    id: 'fm2',
    nickname: '外婆',
    avatar: 'https://picsum.photos/id/177/200/200',
    relation: '外祖母',
    childName: '小糖果'
  },
  {
    id: 'fm3',
    nickname: '叔叔一家',
    avatar: 'https://picsum.photos/id/338/200/200',
    relation: '叔父',
    childName: '小豆子'
  }
];

export const mockFamilyPosts: FamilyPost[] = [
  {
    id: 'fp1',
    authorId: 'fm3',
    authorName: '小豆子妈妈',
    authorAvatar: 'https://picsum.photos/id/338/200/200',
    checkin: {
      id: 'c6',
      taskId: 't11',
      taskName: '手印画动物园',
      taskType: 'craft',
      images: ['https://picsum.photos/id/8/300/300'],
      note: '小豆子画了一只手印大象，太可爱了！',
      moodBaby: 'very_happy',
      moodParent: 'healed',
      visibility: 'family',
      createdAt: '2026-06-03 15:00',
      duration: 25,
      isFeatured: false,
      likes: 8,
      comments: 3
    },
    likes: 8,
    comments: [
      { id: 'fc1', authorName: '奶奶', content: '宝宝真棒！', createdAt: '2026-06-03 15:30', isQuickReply: true },
      { id: 'fc2', authorName: '外婆', content: '太可爱了', createdAt: '2026-06-03 16:00', isQuickReply: true },
      { id: 'fc3', authorName: '小糖果妈妈', content: '下次一起画呀！', createdAt: '2026-06-03 16:30', isQuickReply: false }
    ],
    createdAt: '2026-06-03 15:00',
    isLiked: false
  },
  {
    id: 'fp2',
    authorId: 'fm1',
    authorName: '奶奶',
    authorAvatar: 'https://picsum.photos/id/91/200/200',
    checkin: {
      id: 'c7',
      taskId: 't4',
      taskName: '绘本角色扮演',
      taskType: 'reading',
      images: ['https://picsum.photos/id/64/300/300'],
      note: '奶奶陪小豆子看了龟兔赛跑，小豆子演小乌龟',
      moodBaby: 'happy',
      moodParent: 'healed',
      visibility: 'family',
      createdAt: '2026-06-02 19:30',
      duration: 30,
      isFeatured: false,
      likes: 5,
      comments: 1
    },
    likes: 5,
    comments: [
      { id: 'fc4', authorName: '外婆', content: '奶奶辛苦了', createdAt: '2026-06-02 20:00', isQuickReply: false }
    ],
    createdAt: '2026-06-02 19:30',
    isLiked: true
  },
  {
    id: 'fp3',
    authorId: 'fm2',
    authorName: '外婆',
    authorAvatar: 'https://picsum.photos/id/177/200/200',
    checkin: {
      id: 'c8',
      taskId: 't9',
      taskName: '纸杯电话',
      taskType: 'science',
      images: ['https://picsum.photos/id/2/300/300'],
      note: '外婆和豆子隔着一个房间打电话，笑死了',
      moodBaby: 'very_happy',
      moodParent: 'healed',
      visibility: 'family',
      createdAt: '2026-06-01 10:00',
      duration: 20,
      isFeatured: false,
      likes: 12,
      comments: 4
    },
    likes: 12,
    comments: [
      { id: 'fc5', authorName: '奶奶', content: '哈哈太有趣了', createdAt: '2026-06-01 10:30', isQuickReply: false },
      { id: 'fc6', authorName: '小糖果妈妈', content: '下次我们也试试！', createdAt: '2026-06-01 11:00', isQuickReply: false }
    ],
    createdAt: '2026-06-01 10:00',
    isLiked: false
  },
  {
    id: 'fp4',
    authorId: 'fm3',
    authorName: '小豆子妈妈',
    authorAvatar: 'https://picsum.photos/id/338/200/200',
    checkin: {
      id: 'c9',
      taskId: 't2',
      taskName: '彩虹牛奶实验',
      taskType: 'science',
      images: ['https://picsum.photos/id/1/300/300'],
      note: '小豆子看到颜色扩散的时候惊叫了一声',
      moodBaby: 'very_happy',
      moodParent: 'accomplished',
      visibility: 'public',
      createdAt: '2026-05-31 14:00',
      duration: 15,
      isFeatured: true,
      likes: 20,
      comments: 6
    },
    likes: 20,
    comments: [
      { id: 'fc7', authorName: '奶奶', content: '宝宝真棒！', createdAt: '2026-05-31 14:30', isQuickReply: true }
    ],
    createdAt: '2026-05-31 14:00',
    isLiked: true
  }
];
