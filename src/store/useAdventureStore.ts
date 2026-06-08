import { create } from 'zustand';
import { AdventureMap, MapNode, AdventureStoryEntry } from '@/types';
import { mockAdventureMap, mockAdventureStories } from '@/data/mockAdventure';

interface AdventureStore {
  currentMap: AdventureMap;
  stories: AdventureStoryEntry[];
  showTreasureModal: boolean;
  currentTreasure: MapNode | null;
  showStoryModal: boolean;
  currentStoryNode: MapNode | null;
  advanceNode: () => void;
  openTreasure: (nodeId: string) => void;
  closeTreasureModal: () => void;
  openStoryModal: (nodeId: string) => void;
  closeStoryModal: () => void;
  useTimeCard: (nodeId: string) => void;
}

export const useAdventureStore = create<AdventureStore>((set, get) => ({
  currentMap: mockAdventureMap,
  stories: mockAdventureStories,
  showTreasureModal: false,
  currentTreasure: null,
  showStoryModal: false,
  currentStoryNode: null,

  advanceNode: () => {
    const { currentMap } = get();
    const currentNode = currentMap.nodes.find((n) => n.status === 'current');
    if (!currentNode) return;

    const updatedNodes = currentMap.nodes.map((n) => {
      if (n.id === currentNode.id) {
        return { ...n, status: 'unlocked' as const, unlockedAt: new Date().toISOString() };
      }
      if (n.order === currentNode.order + 1) {
        return { ...n, status: 'current' as const };
      }
      return n;
    });

    const unlockedCount = updatedNodes.filter((n) => n.status === 'unlocked').length;
    const isCompleted = unlockedCount >= currentMap.totalNodes;
    const treasureNode = updatedNodes.find(
      (n) => n.order === currentNode.order && n.isTreasure && !n.treasureOpened
    );

    set({
      currentMap: {
        ...currentMap,
        nodes: updatedNodes,
        unlockedCount,
        isCompleted
      },
      showTreasureModal: !!treasureNode,
      currentTreasure: treasureNode || null
    });
  },

  openTreasure: (nodeId: string) => {
    const { currentMap } = get();
    const node = currentMap.nodes.find((n) => n.id === nodeId);
    if (!node || !node.isTreasure || node.treasureOpened) return;

    const updatedNodes = currentMap.nodes.map((n) =>
      n.id === nodeId ? { ...n, treasureOpened: true } : n
    );

    set({
      currentMap: { ...currentMap, nodes: updatedNodes },
      showTreasureModal: true,
      currentTreasure: { ...node, treasureOpened: true }
    });
  },

  closeTreasureModal: () => set({ showTreasureModal: false, currentTreasure: null }),

  openStoryModal: (nodeId: string) => {
    const { currentMap } = get();
    const node = currentMap.nodes.find((n) => n.id === nodeId);
    if (!node || node.status === 'locked') return;
    set({ showStoryModal: true, currentStoryNode: node });
  },

  closeStoryModal: () => set({ showStoryModal: false, currentStoryNode: null }),

  useTimeCard: (nodeId: string) => {
    const { currentMap } = get();
    const node = currentMap.nodes.find((n) => n.id === nodeId);
    if (!node || node.isTreasure) return;

    const updatedNodes = currentMap.nodes.map((n) => {
      if (n.id === nodeId) {
        return { ...n, status: 'unlocked' as const, unlockedAt: new Date().toISOString() };
      }
      if (n.order === node.order + 1 && n.status === 'locked') {
        const hasCurrent = currentMap.nodes.some((nn) => nn.status === 'current');
        if (!hasCurrent) {
          return { ...n, status: 'current' as const };
        }
      }
      return n;
    });

    const unlockedCount = updatedNodes.filter((n) => n.status === 'unlocked').length;

    set({
      currentMap: {
        ...currentMap,
        nodes: updatedNodes,
        unlockedCount,
        isCompleted: unlockedCount >= currentMap.totalNodes
      }
    });
  }
}));
