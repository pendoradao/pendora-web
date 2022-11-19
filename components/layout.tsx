import { ReactNode } from 'react'
import Footer from './footer'
import Narbar from './navbar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Narbar />
      <div className="min-h-screen" style={{minHeight: '100vh', marginTop: 12}}>
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}