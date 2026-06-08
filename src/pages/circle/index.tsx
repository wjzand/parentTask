import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { mockFamilyPosts, mockFamilyMembers } from '@/data/mockFamily';
import { TASK_TYPE_EMOJI, MOOD_BABY_EMOJI } from '@/types';
import TaskTypeTag from '@/components/TaskTypeTag';
import styles from './index.module.scss';

const QUICK_REPLIES = ['宝宝真棒！', '太可爱了', '好厉害！', '好温馨', '一起加油'];

const CirclePage = () => {
  const [posts, setPosts] = useState(mockFamilyPosts);
  const [showComments, setShowComments] = useState<string | null>(null);

  const handleLike = (postId: string) => {
    setPosts(posts.map(p =>
      p.id === postId
        ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const handleQuickReply = (postId: string, reply: string) => {
    console.info('[Circle] Quick reply:', { postId, reply });
    Taro.showToast({ title: '评论成功', icon: 'success' });
  };

  const handleAddMember = () => {
    Taro.showToast({ title: '邀请功能开发中', icon: 'none' });
  };

  const toggleComments = (postId: string) => {
    setShowComments(showComments === postId ? null : postId);
  };

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>亲友圈</Text>
        <View className={styles.addBtn} onClick={handleAddMember}>
          <Text>+ 添加亲友</Text>
        </View>
      </View>

      <ScrollView scrollX className={styles.membersScroll}>
        <View className={styles.membersList}>
          {mockFamilyMembers.map((member) => (
            <View key={member.id} className={styles.memberItem}>
              <View className={styles.memberAvatar}>
                <Text>👨‍👩‍👧</Text>
              </View>
              <Text className={styles.memberName}>{member.nickname}</Text>
            </View>
          ))}
          <View className={styles.memberItem} onClick={handleAddMember}>
            <View className={styles.memberAvatar}>
              <Text>➕</Text>
            </View>
            <Text className={styles.memberName}>添加</Text>
          </View>
        </View>
      </ScrollView>

      <ScrollView scrollY className={styles.postList}>
        {posts.map((post) => (
          <View key={post.id} className={styles.postCard}>
            <View className={styles.postHeader}>
              <View className={styles.postAvatar}>
                <Text>👩</Text>
              </View>
              <View className={styles.postAuthor}>
                <Text className={styles.postAuthorName}>{post.authorName}</Text>
                <Text className={styles.postTime}>{post.createdAt}</Text>
              </View>
              <TaskTypeTag type={post.checkin.taskType} size="small" />
            </View>

            <View className={styles.postContent}>
              <Text className={styles.postNote}>{post.checkin.note}</Text>
              <View className={styles.postImages}>
                {post.checkin.images.map((img, idx) => (
                  <View key={idx} className={styles.postImage}>
                    <Text className={styles.postImageEmoji}>
                      {TASK_TYPE_EMOJI[post.checkin.taskType]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View className={styles.postActions}>
              <View className={classnames(styles.actionBtn, post.isLiked && styles.actionLiked)} onClick={() => handleLike(post.id)}>
                <Text>{post.isLiked ? '❤️' : '🤍'} {post.likes}</Text>
              </View>
              <View className={styles.actionBtn} onClick={() => toggleComments(post.id)}>
                <Text>💬 {post.comments.length}</Text>
              </View>
              <View className={styles.actionBtn}>
                <Text>{MOOD_BABY_EMOJI[post.checkin.moodBaby]}</Text>
              </View>
            </View>

            {showComments === post.id && (
              <>
                {post.comments.length > 0 && (
                  <View className={styles.commentsList}>
                    {post.comments.map((comment) => (
                      <View key={comment.id} className={styles.commentItem}>
                        <Text className={styles.commentAuthor}>{comment.authorName}</Text>
                        <Text className={styles.commentText}>{comment.content}</Text>
                      </View>
                    ))}
                  </View>
                )}
                <View className={styles.quickComments}>
                  {QUICK_REPLIES.map((reply) => (
                    <View
                      key={reply}
                      className={styles.quickCommentBtn}
                      onClick={() => handleQuickReply(post.id, reply)}
                    >
                      <Text>{reply}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CirclePage;
