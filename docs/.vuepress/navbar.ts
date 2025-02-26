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
            text: '线程基础', link: '/notes/并发编程/线程基础.md'
          },
          {
            text: '三大特性', link: '/notes/并发编程/三大特性.md'
          },
          {
            text: '锁', link: '/notes/并发编程/锁.md'
          },
          {
            text: '阻塞队列', link: '/notes/并发编程/阻塞队列.md'
          },
          {
            text: '线程池', link: '/notes/并发编程/线程池.md'
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
