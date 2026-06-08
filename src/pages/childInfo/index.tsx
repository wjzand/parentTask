import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const ChildInfoPage = () => {
  return (
    <View className={styles.page}>
      <Text className={styles.emoji}>👶</Text>
      <Text className={styles.title}>孩子信息</Text>
      <Text className={styles.hint}>功能正在开发中...</Text>
    </View>
  );
};

export default ChildInfoPage;
