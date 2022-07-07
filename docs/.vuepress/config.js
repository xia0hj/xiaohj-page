//@ts-check

module.exports = {
  title: 'xiaohj 的个人空间',
  description: 'Just playing around',

  themeConfig: {
    logo: 'avatars.jpg',
    // 右上角的导航
    nav: [
      { text: 'Home', link: '/' },
      { text: '学习笔记', link: '/notes/' },
      { text: '1', link: '/1/' },
      { text: '2', link: '/2/' },
      { text: 'My Github', link: 'https://github.com/xia0hj' },
    ],
    sidebar: {
      '/notes/': [
        {
          title: 'JavaScript',
          children: [['javascript.md', '笔记']]
        },
        {
          title: 'Vue',
          children: [['vue.md', '笔记']]
        },
        {
          title: 'CSS',
          children: [['css.md', '笔记']]
        },
        {
          title: '网络相关',
          children: [['network.md', '笔记']]
        },
        {
          title: '前端工具链',
          children: [['toolchain.md', '笔记']]
        },
        {
          title: 'React',
          children: [['react.md', '笔记']]
        },
        {
          title: '后端相关',
          children: [['backend.md', '笔记']]
        },
        {
          title: '软技能',
          children: [['soft-skill.md', '笔记']]
        }
      ]
    },
    activeHeaderLinks: false // 禁止实时更新 url 后面的 #hash
  },

  plugins: ['@vuepress/back-to-top']
}
