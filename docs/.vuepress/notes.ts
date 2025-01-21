import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'


const concurrencyNote = defineNoteConfig({
  dir: '并发编程',
  link: '/concurrency',
  sidebar: ['线程基础', '三大特性','锁','阻塞队列','线程池'],
})
const playNote = defineNoteConfig({
  dir: 'play',
  link: '/play',
  sidebar: ['工具网站收录'],
})
export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [concurrencyNote, playNote],
})
