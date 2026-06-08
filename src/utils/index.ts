import dayjs from 'dayjs';

export const getGreeting = (): string => {
  const hour = dayjs().hour();
  if (hour < 6) return '夜深了，注意休息';
  if (hour < 9) return '早安，美好的一天从陪伴开始';
  if (hour < 12) return '上午好，今天也要高质量陪伴哦';
  if (hour < 14) return '午安，睡个午觉精力更充沛';
  if (hour < 18) return '下午好，和孩子一起做点什么吧';
  if (hour < 21) return '晚上好，睡前的亲子时光最温馨';
  return '夜深了，宝贝该休息啦';
};

export const getCompanionQuote = (): string => {
  const quotes = [
    '今天的15分钟，是孩子明天的温暖记忆',
    '陪伴是最长情的告白，也是最温暖的教育',
    '每一次亲子时光，都在孩子心里种下一颗幸福的种子',
    '最好的教育，是和孩子一起探索世界',
    '和孩子在一起的每一刻，都值得被珍藏',
    '慢下来，和孩子一起感受生活的美好',
    '今天的陪伴，就是给孩子最好的礼物'
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}分钟`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}小时${m}分钟` : `${h}小时`;
};

export const getWeatherEmoji = (): string => {
  const weathers = ['☀️', '⛅', '🌤️', '🌈'];
  return weathers[Math.floor(Math.random() * weathers.length)];
};
