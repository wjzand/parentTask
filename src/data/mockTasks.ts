import { Task, Checkin, TodayTask, TaskStep } from '@/types';

const createSteps = (titles: string[], descs: string[]): TaskStep[] =>
  titles.map((t, i) => ({ order: i + 1, title: t, description: descs[i] || '' }));

export const mockTasks: Task[] = [
  {
    id: 't1',
    name: '树叶贴画大作战',
    type: 'craft',
    difficulty: 2,
    duration: 15,
    ageRange: ['4-6', '6-8'],
    description: '和孩子一起捡拾落叶，用树叶拼出各种有趣的图案，锻炼创造力和精细动作能力。',
    materials: ['落叶若干', '白纸', '胶水', '彩笔'],
    steps: createSteps(
      ['收集落叶', '构思图案', '粘贴创作', '装饰完善'],
      ['带孩子到小区或公园捡拾不同形状颜色的落叶', '和宝贝一起讨论想拼什么图案，可以是动物、风景等', '在白纸上涂胶水，把树叶粘贴成想要的形状', '用彩笔添加细节，让作品更生动']
    ),
    tips: ['选择较干燥的树叶更容易粘贴', '可以提前一天收集树叶压平'],
    coverImage: 'https://picsum.photos/id/1025/750/500',
    completedCount: 1286,
    rating: 4.8,
    isFavorite: false,
    season: ['autumn']
  },
  {
    id: 't2',
    name: '彩虹牛奶实验',
    type: 'science',
    difficulty: 2,
    duration: 15,
    ageRange: ['4-6', '6-8'],
    description: '用牛奶、食用色素和洗洁精做一个绚丽的彩虹实验，探索表面张力的奥秘。',
    materials: ['全脂牛奶', '食用色素', '洗洁精', '浅盘', '棉签'],
    steps: createSteps(
      ['倒入牛奶', '滴入色素', '蘸取洗洁精', '观察变化'],
      ['将牛奶倒入浅盘中，覆盖底部', '在牛奶表面滴入不同颜色的食用色素', '用棉签蘸取洗洁精', '将蘸有洗洁精的棉签点在牛奶表面观察']
    ),
    tips: ['一定要用全脂牛奶效果最好', '注意不要让孩子误食实验材料'],
    coverImage: 'https://picsum.photos/id/1/750/500',
    completedCount: 956,
    rating: 4.9,
    isFavorite: true,
  },
  {
    id: 't3',
    name: '室内障碍赛',
    type: 'sport',
    difficulty: 3,
    duration: 30,
    ageRange: ['4-6', '6-8', '8-10'],
    description: '利用家中物品搭建障碍赛道，和孩子一起完成跳跃、爬行、平衡等挑战。',
    materials: ['靠垫', '纸箱', '毛绒玩具', '胶带'],
    steps: createSteps(
      ['规划路线', '搭建障碍', '讲解规则', '开始挑战'],
      ['在客厅规划一条安全的障碍赛道', '用靠垫当跳板、纸箱当隧道、玩具当路标', '向孩子讲解每个关卡通过方式', '计时开始，全家轮流挑战']
    ),
    tips: ['确保赛道周围没有尖锐物品', '可以在终点设置小奖品'],
    coverImage: 'https://picsum.photos/id/237/750/500',
    completedCount: 743,
    rating: 4.7,
    isFavorite: false,
  },
  {
    id: 't4',
    name: '绘本角色扮演',
    type: 'reading',
    difficulty: 1,
    duration: 30,
    ageRange: ['3-4', '4-6'],
    description: '选择一本孩子喜欢的绘本，一起分角色朗读和表演，让故事活起来。',
    materials: ['一本绘本', '简单道具（可选）'],
    steps: createSteps(
      ['选择绘本', '分配角色', '朗读表演', '讨论故事'],
      ['让孩子挑选一本最喜欢的绘本', '家长和孩子分别扮演不同角色', '用夸张的声音和动作朗读对白', '读完后讨论故事中的道理']
    ),
    tips: ['可以准备简单的帽子或围巾做道具', '鼓励孩子自由发挥改编故事'],
    coverImage: 'https://picsum.photos/id/64/750/500',
    completedCount: 2103,
    rating: 4.9,
    isFavorite: true,
  },
  {
    id: 't5',
    name: '社区植物寻宝',
    type: 'outdoor',
    difficulty: 2,
    duration: 30,
    ageRange: ['4-6', '6-8'],
    description: '带着寻宝清单到小区里找各种植物，观察大自然的同时培养观察力。',
    materials: ['寻宝清单', '放大镜', '小袋子', '蜡笔'],
    steps: createSteps(
      ['制作清单', '出发寻宝', '观察记录', '分享发现'],
      ['画一张简单的植物寻宝清单：三叶草、蒲公英、松果等', '带上清单出发在小区里寻找', '找到后用放大镜仔细观察并画下来', '回家后和宝贝分享今天的发现']
    ),
    tips: ['避免接触不认识的植物', '提醒孩子不要采摘花朵'],
    coverImage: 'https://picsum.photos/id/1036/750/500',
    completedCount: 567,
    rating: 4.6,
    isFavorite: false,
    season: ['spring', 'summer', 'autumn']
  },
  {
    id: 't6',
    name: '小小收纳师',
    type: 'chore',
    difficulty: 1,
    duration: 15,
    ageRange: ['3-4', '4-6'],
    description: '教孩子整理自己的玩具和书籍，分类收纳，培养秩序感和责任心。',
    materials: ['收纳箱', '标签贴纸', '彩笔'],
    steps: createSteps(
      ['认识分类', '贴标签', '动手收纳', '检查验收'],
      ['教孩子按类型给玩具分类：积木、毛绒玩具、车等', '在收纳箱上画或贴上分类标签', '让孩子按标签把玩具放回对应的箱子', '检查是否都归位，给予鼓励']
    ),
    tips: ['可以放一首整理歌增加趣味', '不要一次要求太多，从整理一类开始'],
    coverImage: 'https://picsum.photos/id/225/750/500',
    completedCount: 892,
    rating: 4.5,
    isFavorite: false,
  },
  {
    id: 't7',
    name: '触觉猜猜盒',
    type: 'sensory',
    difficulty: 1,
    duration: 5,
    ageRange: ['3-4', '4-6'],
    description: '在一个盒子里放不同材质的物品，让孩子伸手触摸猜是什么，锻炼触觉感知。',
    materials: ['纸箱', '棉花', '海绵', '毛刷', '小石头'],
    steps: createSteps(
      ['准备盒子', '放入物品', '触摸猜测', '揭晓答案'],
      ['在纸箱上挖一个能伸进手的洞', '放入不同触感的物品', '让孩子伸手进去摸并描述感觉', '猜完后拿出来对比']
    ),
    tips: ['确保放入的物品安全无尖锐边角', '可以引导孩子用语言描述触感'],
    coverImage: 'https://picsum.photos/id/598/750/500',
    completedCount: 423,
    rating: 4.8,
    isFavorite: false,
  },
  {
    id: 't8',
    name: '春节包饺子',
    type: 'holiday',
    difficulty: 2,
    duration: 60,
    ageRange: ['4-6', '6-8', '8-10'],
    description: '过年一起包饺子，让孩子参与揉面、擀皮、包馅，感受传统年味。',
    materials: ['面粉', '水', '饺子馅', '擀面杖', '案板'],
    steps: createSteps(
      ['和面揉面', '擀饺子皮', '包馅造型', '煮饺子品尝'],
      ['让孩子帮忙把面粉加水揉成团', '教孩子用擀面杖擀出圆圆的饺子皮', '放馅、对折、捏紧，创意各种造型', '煮好后全家一起品尝劳动成果']
    ),
    tips: ['给孩子准备一小块面自己发挥', '注意远离开水和火源'],
    coverImage: 'https://picsum.photos/id/292/750/500',
    completedCount: 3215,
    rating: 4.9,
    isFavorite: true,
    isHoliday: true,
    holidayName: '春节'
  },
  {
    id: 't9',
    name: '纸杯电话',
    type: 'science',
    difficulty: 1,
    duration: 15,
    ageRange: ['4-6', '6-8'],
    description: '用两个纸杯和一根线做一个简易电话，探索声音传播的奥秘。',
    materials: ['纸杯2个', '棉线', '牙签', '彩笔'],
    steps: createSteps(
      ['装饰纸杯', '穿线连接', '拉紧测试', '远距离通话'],
      ['用彩笔在纸杯上画喜欢的图案', '在杯底戳小洞，穿入棉线用牙签固定', '两人各拿一个杯子把线拉紧', '一人说话一人听，试试最远多远能听到']
    ),
    tips: ['线一定要拉紧才能传声', '可以用不同材质的线对比效果'],
    coverImage: 'https://picsum.photos/id/2/750/500',
    completedCount: 1567,
    rating: 4.7,
    isFavorite: false,
  },
  {
    id: 't10',
    name: '亲子瑜伽时光',
    type: 'sport',
    difficulty: 2,
    duration: 15,
    ageRange: ['4-6', '6-8'],
    description: '简单有趣的亲子瑜伽动作，和宝贝一起伸展身体，放松心情。',
    materials: ['瑜伽垫（可选）', '舒适衣物'],
    steps: createSteps(
      ['热身准备', '树式平衡', '蝴蝶式', '放松休息'],
      ['换上舒适的衣服，在垫子上坐好深呼吸', '两人面对面做树式，互相帮助保持平衡', '坐下来脚掌相对做蝴蝶式，像蝴蝶扇翅膀', '躺下来闭眼深呼吸，享受亲子时光']
    ),
    tips: ['动作幅度不要太大', '可以播放轻柔的背景音乐'],
    coverImage: 'https://picsum.photos/id/3/750/500',
    completedCount: 678,
    rating: 4.6,
    isFavorite: false,
  },
  {
    id: 't11',
    name: '手印画动物园',
    type: 'craft',
    difficulty: 1,
    duration: 15,
    ageRange: ['3-4', '4-6'],
    description: '用手掌和手指蘸颜料印出各种动物形状，创作独一无二的手印画。',
    materials: ['颜料', '画纸', '湿巾', '画笔'],
    steps: createSteps(
      ['准备颜料', '印手印', '添画细节', '创作故事'],
      ['将不同颜色颜料倒在调色盘上', '手掌蘸颜料印在纸上做动物身体', '用画笔添上眼睛耳朵等细节', '给每个手印动物编一个故事']
    ),
    tips: ['穿旧衣服或画围裙', '提前准备湿巾方便擦手'],
    coverImage: 'https://picsum.photos/id/8/750/500',
    completedCount: 1890,
    rating: 4.8,
    isFavorite: false,
  },
  {
    id: 't12',
    name: '夜间星空观察',
    type: 'outdoor',
    difficulty: 3,
    duration: 30,
    ageRange: ['6-8', '8-10', '10-12'],
    description: '选一个晴朗的夜晚，和孩子一起观察星空，辨认星座，探索宇宙奥秘。',
    materials: ['星图（可用App）', '毯子', '手电筒', '笔记本'],
    steps: createSteps(
      ['选择地点', '铺好毯子', '辨认星座', '记录感受'],
      ['找一个光污染少的开阔场地', '铺上毯子躺下仰望星空', '用星图找到北斗七星等常见星座', '让孩子画出看到的星空并写下感受']
    ),
    tips: ['注意保暖和防蚊', '不要直视强光源保护眼睛'],
    coverImage: 'https://picsum.photos/id/1039/750/500',
    completedCount: 345,
    rating: 4.9,
    isFavorite: true,
    season: ['summer', 'autumn']
  }
];

export const mockTodayTask: TodayTask = {
  task: mockTasks[0],
  status: 'new',
  changeCount: 0,
  maxChangeCount: 3
};

export const mockCheckins: Checkin[] = [
  {
    id: 'c1',
    taskId: 't1',
    taskName: '树叶贴画大作战',
    taskType: 'craft',
    images: ['https://picsum.photos/id/1025/300/300'],
    note: '宝宝第一次独立完成了粘贴，特别有成就感！',
    moodBaby: 'very_happy',
    moodParent: 'accomplished',
    visibility: 'family',
    createdAt: '2026-06-03 16:30',
    duration: 20,
    isFeatured: false,
    likes: 5,
    comments: 2
  },
  {
    id: 'c2',
    taskId: 't4',
    taskName: '绘本角色扮演',
    taskType: 'reading',
    images: ['https://picsum.photos/id/64/300/300'],
    note: '今天演了小红帽，宝宝演大灰狼，笑得停不下来',
    moodBaby: 'very_happy',
    moodParent: 'healed',
    visibility: 'public',
    createdAt: '2026-06-02 20:00',
    duration: 35,
    isFeatured: true,
    likes: 12,
    comments: 4
  },
  {
    id: 'c3',
    taskId: 't3',
    taskName: '室内障碍赛',
    taskType: 'sport',
    images: ['https://picsum.photos/id/237/300/300', 'https://picsum.photos/id/659/300/300'],
    note: '爸爸也参与了，全家一起笑哈哈',
    moodBaby: 'happy',
    moodParent: 'accomplished',
    visibility: 'family',
    createdAt: '2026-06-01 10:15',
    duration: 40,
    isFeatured: false,
    likes: 8,
    comments: 3
  },
  {
    id: 'c4',
    taskId: 't2',
    taskName: '彩虹牛奶实验',
    taskType: 'science',
    images: ['https://picsum.photos/id/1/300/300'],
    note: '颜色扩散的那一刻宝宝眼睛都亮了！',
    moodBaby: 'very_happy',
    moodParent: 'healed',
    visibility: 'public',
    createdAt: '2026-05-31 14:20',
    duration: 18,
    isFeatured: false,
    likes: 6,
    comments: 1
  },
  {
    id: 'c5',
    taskId: 't6',
    taskName: '小小收纳师',
    taskType: 'chore',
    images: ['https://picsum.photos/id/225/300/300'],
    note: '虽然只收了一半，但开始就是进步',
    moodBaby: 'normal',
    moodParent: 'accomplished',
    visibility: 'private',
    createdAt: '2026-05-30 09:00',
    duration: 12,
    isFeatured: false,
    likes: 0,
    comments: 0
  }
];
