import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen" style={{'height': '100vh'}}>
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}