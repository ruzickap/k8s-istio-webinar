module.exports = {
  title: 'Istio webinar',
  description: 'Using Istio to control traffic flow without changing your application',
  base: '/k8s-istio-webinar/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    displayAllHeaders: true,
    lastUpdated: true,
    repo: 'ruzickap/k8s-istio-webinar',
    docsDir: 'docs',
    editLinks: true,
    logo: '/istio.svg',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Istio links',
        items: [
          { text: 'Istio', link: 'https://istio.io/' },
          { text: 'Istio docs', link: 'https://istio.io/docs/' },
          { text: 'Istio webinar', link: 'https://github.com/ruzickap/k8s-istio-webinar' }
        ]
      }
    ],
    sidebar: [
      '/',
      '/part-01/',
      '/part-02/',
      '/part-03/',
      '/part-04/',
      '/part-05/',
      '/part-06/',
      '/part-07/',
      '/part-08/'
    ]
  },
  plugins: [
    ['@vuepress/medium-zoom'],
    ['@vuepress/back-to-top'],
    ['seo']
  ]
}
