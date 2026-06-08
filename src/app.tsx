import React, { useEffect } from 'react';
import { useDidShow, useDidHide } from '@tarojs/taro';
import './app.scss';

interface AppProps {
  children: React.ReactNode;
}

function App(props: AppProps) {
  useEffect(() => {});

  useDidShow(() => {});

  useDidHide(() => {});

  return props.children;
}

export default App;
