import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  base: '/tools/',
  theme: defaultTheme({
    logo: '/public/favicon.ico',
    contributors: false,
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
          text: 'AI',
          collapsable: true,
          children: [
            // '/AI/01_Course.md',
            '/AI/00_env_python.md',
            '/AI/00_Certification.md',
            '/AI/02_ollama.md',
            'AI/02.webui.md'
          ],
        },
        {
          text: 'Raspberry',
          collapsable: true,
          children: [
            '/Raspberry/01.md',
            '/Raspberry/02.md',
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
            { text: "逆向", link: '/C/source.md' },
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


