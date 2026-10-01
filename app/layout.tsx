import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

const repoUrl = 'https://github.com/WayneLai0127/personal-portfolio'

export const metadata: Metadata = {
  title: {
    default: "Wayne's Portfolio",
    template: "%s – Wayne's Portfolio"
  },
  description: "Hello, I'm Wayne, a fullstack deveploer.",
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png', sizes: '32x32' }]
  }
}

const navbar = (
  <Navbar
    logo={
      <>
        <img
          src="/favicon.png"
          style={{ height: 20, objectFit: 'contain' }}
          alt="icon"
          className="logo"
        />
        <p style={{ margin: 5 }}>Wayne's profile</p>
      </>
    }
    projectLink={repoUrl}
  />
)

const footer = <Footer>Wayne's personal portfolio site powered by Nextra</Footer>

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase={repoUrl}
          copyPageButton={false}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
