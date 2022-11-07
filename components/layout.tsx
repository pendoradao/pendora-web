import { ReactNode } from 'react'
import Footer from './footer'
import Header from './header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen" style={{'minHeight': '100vh'}}>
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}