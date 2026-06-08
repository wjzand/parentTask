import { WeeklyReport, MonthlyReport } from '@/types';
import { mockBadges } from './mockBadges';

export const mockWeeklyReport: WeeklyReport = {
  weekStart: '2026-06-01',
  weekEnd: '2026-06-07',
  checkinDays: 5,
  totalDuration: 75,
  newBadges: [mockBadges[1]],
  moodTrend: ['happy', 'very_happy', 'happy', 'normal', 'very_happy', 'happy', 'uncooperative'],
  typeDistribution: {
    craft: 2,
    science: 1,
    sport: 1,
    reading: 1,
    outdoor: 0,
    chore: 0,
    sensory: 0,
    holiday: 0
  }
};

export const mockMonthlyReport: MonthlyReport = {
  month: '2026-05',
  checkinDays: 22,
  totalDuration: 330,
  newBadges: [mockBadges[0], mockBadges[1], mockBadges[5]],
  abilityRadar: {
    fineMotor: 75,
    language: 60,
    logic: 45,
    social: 55,
    creativity: 80,
    physical: 65
  },
  typeDistribution: {
    craft: 6,
    science: 4,
    sport: 3,
    reading: 5,
    outdoor: 2,
    chore: 1,
    sensory: 1,
    holiday: 0
  }
};
