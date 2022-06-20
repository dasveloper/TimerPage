import Footer from '@/components/footer'
import Header from '@/components/header'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col p-6 container">
      <Header />
      <div className="flex-1 container">{children}</div>
      <Footer />
    </div>
  )
}
