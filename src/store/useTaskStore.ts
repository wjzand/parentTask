import { create } from 'zustand';
import { TodayTask, Task, TaskStatus } from '@/types';
import { mockTasks, mockTodayTask } from '@/data/mockTasks';

interface TaskStore {
  todayTask: TodayTask;
  allTasks: Task[];
  weekCheckins: number;
  setTodayTask: (task: TodayTask) => void;
  claimTask: () => void;
  startTask: () => void;
  completeTask: () => void;
  changeTask: () => void;
  setWeekCheckins: (count: number) => void;
  toggleFavorite: (taskId: string) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  todayTask: mockTodayTask,
  allTasks: mockTasks,
  weekCheckins: 3,

  setTodayTask: (task) => set({ todayTask: task }),

  claimTask: () => {
    const { todayTask } = get();
    set({
      todayTask: {
        ...todayTask,
        status: 'claimed' as TaskStatus,
        claimedAt: new Date().toISOString()
      }
    });
  },

  startTask: () => {
    const { todayTask } = get();
    set({
      todayTask: {
        ...todayTask,
        status: 'in_progress' as TaskStatus,
        startedAt: new Date().toISOString()
      }
    });
  },

  completeTask: () => {
    const { todayTask } = get();
    set({
      todayTask: {
        ...todayTask,
        status: 'completed' as TaskStatus,
        completedAt: new Date().toISOString()
      }
    });
  },

  changeTask: () => {
    const { todayTask, allTasks } = get();
    if (todayTask.changeCount >= todayTask.maxChangeCount) return;
    const otherTasks = allTasks.filter((t) => t.id !== todayTask.task.id);
    const randomTask = otherTasks[Math.floor(Math.random() * otherTasks.length)];
    set({
      todayTask: {
        task: randomTask,
        status: 'new' as TaskStatus,
        changeCount: todayTask.changeCount + 1,
        maxChangeCount: todayTask.maxChangeCount
      }
    });
  },

  setWeekCheckins: (count) => set({ weekCheckins: count }),

  toggleFavorite: (taskId) => {
    set((state) => ({
      allTasks: state.allTasks.map((t) =>
        t.id === taskId ? { ...t, isFavorite: !t.isFavorite } : t
      )
    }));
  }
}));
