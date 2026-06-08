import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const FavoritesPage = () => {
  return (
    <View className={styles.page}>
      <Text className={styles.emoji}>❤️</Text>
      <Text className={styles.title}>我的收藏</Text>
      <Text className={styles.hint}>功能正在开发中...</Text>
    </View>
  );
};

export default FavoritesPage;
