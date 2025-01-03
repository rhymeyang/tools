import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  base: '/tools/',
  theme: defaultTheme({
    logo: '/tools/images/logo.png',
    navbar: false,
    sidebar: {
      '/': [
        {
          text: 'Collection',
          children: [
            { text: "General", link: '/' },
          ],
        },
        {
          text: 'System',
          collapsable: true,
          children: [
            { text: "Old System", link: '/System/Old.md' },
          ],
        },
        {
          text: 'Daily',
          collapsable: true,
          children: [
            { text: "Daily Tools", link: '/General/Daily_Tools.md' },

          ],
        },
        {
          text: 'Resource',
          collapsable: true,
          children: [
            { text: "Book", link: '/Resource/Books.md' },
          //  { text: "Go", link: '/Resource/Go.md' },
          { text: "BlockChain", link: '/Test/blockchain.md' },
          ],
        },
        {
          text: 'Environment',
          collapsable: true,
          children: [
            { text: "Linux", link: '/Env/Linux.md' },
          ],
        }
      ]
    },
  }),
  lang: 'zh-CN',
  title: "Vicky's Notes",
  description: 'Collection',
})


