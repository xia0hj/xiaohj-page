//@ts-check

module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',

  themeConfig: {
    // 右上角的导航
    nav: [
      { text: 'Home', link: '/' },
      { text: '1', link: '/1/' },
      { text: '2', link: '/2/' },
      { text: 'My Github', link: 'https://github.com/xia0hj' },
    ],
    // 指定哪些页面启用左边的侧边栏
    sidebar: [
      '/',
      '/1',
      ['/2', 'Explicit link text']
    ]
  }
}
