import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const ReportPage = () => {
  return (
    <View className={styles.page}>
      <Text className={styles.emoji}>📊</Text>
      <Text className={styles.title}>陪伴报告</Text>
      <Text className={styles.hint}>功能正在开发中...</Text>
    </View>
  );
};

export default ReportPage;
