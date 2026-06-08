import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const CheckinRecordsPage = () => {
  return (
    <View className={styles.page}>
      <Text className={styles.emoji}>📅</Text>
      <Text className={styles.title}>打卡记录</Text>
      <Text className={styles.hint}>功能正在开发中...</Text>
    </View>
  );
};

export default CheckinRecordsPage;
