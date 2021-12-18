import s from './navbar.module.css'
import ActiveLink from './ActiveLink'

export default function Navbar() {
    // const router = useRouter()
    return (
        <nav className={s.navbar}>
            <ActiveLink href="/" title={'Home'}/>
            <ActiveLink href="/about" title={'About'} />
        </nav>
    )
}