import React, { useState } from 'react';
import { View, Text, Input, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useUserStore } from '@/store/useUserStore';
import dayjs from 'dayjs';
import styles from './index.module.scss';

const INTEREST_OPTIONS = [
  '手工', '科学', '绘画', '阅读', '运动', '音乐',
  '舞蹈', '棋类', '积木', '自然', '烹饪', '数学',
  '动物', '植物', '天文', '地理', '语言', '戏剧'
];

const AVATAR_EMOJIS = ['👶', '👧', '👦', '🧒', '👼', '🧒'];

const ChildInfoPage = () => {
  const { childInfo, setChildInfo } = useUserStore();
  const [nickname, setNickname] = useState(childInfo.nickname);
  const [birthday, setBirthday] = useState(childInfo.birthday);
  const [selectedTags, setSelectedTags] = useState<string[]>([...childInfo.interestTags]);
  const [avatarEmoji, setAvatarEmoji] = useState('👶');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const computedAge = (() => {
    if (!birthday) return 0;
    const birth = dayjs(birthday);
    const now = dayjs();
    let age = now.year() - birth.year();
    if (now.month() < birth.month() || (now.month() === birth.month() && now.date() < birth.date())) {
      age--;
    }
    return Math.max(0, age);
  })();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      if (prev.length >= 6) {
        Taro.showToast({ title: '最多选择6个兴趣标签', icon: 'none' });
        return prev;
      }
      return [...prev, tag];
    });
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.detail.value);
  };

  const handleSave = () => {
    if (!nickname.trim()) {
      Taro.showToast({ title: '请输入孩子昵称', icon: 'none' });
      return;
    }
    if (!birthday) {
      Taro.showToast({ title: '请选择出生日期', icon: 'none' });
      return;
    }

    setChildInfo({
      nickname: nickname.trim(),
      avatar: childInfo.avatar,
      birthday,
      age: computedAge,
      interestTags: selectedTags
    });

    Taro.showToast({ title: '保存成功', icon: 'success' });
    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  };

  const handleAvatarSelect = (emoji: string) => {
    setAvatarEmoji(emoji);
    setShowAvatarPicker(false);
  };

  return (
    <View className={styles.page}>
      <View className={styles.avatarSection}>
        <View className={styles.avatarCircle} onClick={() => setShowAvatarPicker(!showAvatarPicker)}>
          <Text>{avatarEmoji}</Text>
        </View>
        <Text className={styles.avatarHint}>点击更换头像</Text>
      </View>

      {showAvatarPicker && (
        <View className={styles.tagSection}>
          <Text className={styles.tagTitle}>选择头像</Text>
          <View className={styles.tagList}>
            {AVATAR_EMOJIS.map((emoji) => (
              <View
                key={emoji}
                className={classnames(styles.tagItem, avatarEmoji === emoji && styles.tagSelected)}
                onClick={() => handleAvatarSelect(emoji)}
              >
                <Text>{emoji}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View className={styles.formSection}>
        <View className={styles.formItem}>
          <Text className={styles.formLabel}>昵称</Text>
          <Input
            className={styles.formInput}
            placeholder="请输入孩子昵称"
            value={nickname}
            onInput={(e) => setNickname(e.detail.value)}
          />
        </View>
        <View className={styles.formItem}>
          <Text className={styles.formLabel}>出生日期</Text>
          <Picker mode="date" value={birthday} onChange={handleBirthdayChange} start="2014-01-01" end="2026-12-31">
            <View className={styles.pickerTrigger}>
              <Text className={styles.formValue}>
                {birthday || '请选择'}
              </Text>
              <Text className={styles.formArrow}>›</Text>
            </View>
          </Picker>
        </View>
        <View className={styles.formItem}>
          <Text className={styles.formLabel}>年龄</Text>
          <Text className={styles.ageDisplay}>
            <Text className={styles.ageHighlight}>{computedAge}</Text> 岁
          </Text>
        </View>
      </View>

      <View className={styles.tagSection}>
        <Text className={styles.tagTitle}>兴趣标签</Text>
        <Text className={styles.tagHint}>选择孩子感兴趣的方向，帮助推荐更合适的任务（最多6个）</Text>
        <View className={styles.tagList}>
          {INTEREST_OPTIONS.map((tag) => (
            <View
              key={tag}
              className={classnames(styles.tagItem, selectedTags.includes(tag) && styles.tagSelected)}
              onClick={() => toggleTag(tag)}
            >
              <Text>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.infoCard}>
        <Text className={styles.infoTitle}>💡 关于年龄和兴趣</Text>
        <Text className={styles.infoText}>
          我们会根据孩子的年龄自动推荐适龄任务，兴趣标签则帮助我们更精准地匹配孩子喜欢的活动类型。
          年龄会根据出生日期自动计算，无需手动修改。
        </Text>
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.saveBtn} onClick={handleSave}>
          <Text>保存修改</Text>
        </View>
      </View>
    </View>
  );
};

export default ChildInfoPage;
