import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/' },
  {
    text: '笔记',
    items: [
      {
        text: '并发编程', items: [
          {
            text: '并发基础', link: '/notes/并发编程/并发基础.md'
          }
        ]
      },
      {
        text: '玩机', items: [
          {
            text: '工具网站收录', link: '/notes/play/工具网站收录.md'
          }
        ]
      },

    ]
  },
])
