export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/explore/index',
    'pages/growth/index',
    'pages/circle/index',
    'pages/mine/index',
    'pages/task-detail/index',
    'pages/checkin/index',
    'pages/checkin-records/index',
    'pages/report/index',
    'pages/badges/index',
    'pages/points/index',
    'pages/custom-task/index',
    'pages/messages/index',
    'pages/child-info/index',
    'pages/favorites/index',
    'pages/settings/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFFBEB',
    navigationBarTitleText: '亲子任务卡',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#A68B6B',
    selectedColor: '#FAAD14',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '今日任务'
      },
      {
        pagePath: 'pages/explore/index',
        text: '任务库'
      },
      {
        pagePath: 'pages/growth/index',
        text: '成长树'
      },
      {
        pagePath: 'pages/circle/index',
        text: '亲友圈'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
