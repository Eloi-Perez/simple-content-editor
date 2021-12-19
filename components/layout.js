import Navbar from './navbar/navbar'
import Footer from './footer/footer'
import s from '../styles/layout.module.css'

export default function Layout({ children }) {
    return (
        <div className={s.root}>
            <Navbar />
            <main className={s.main}>
                {children}
            </main>
            <Footer />
        </div>
    )
}