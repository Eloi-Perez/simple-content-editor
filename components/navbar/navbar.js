import s from './navbar.module.css'
import ActiveLink from './ActiveLink'
import EditorLink from './EditorLink'

export default function Navbar() {
    // const router = useRouter()
    return (
        <nav className={s.root}>
            <ActiveLink href="/" title={'Home'} />
            <ActiveLink href="/about" title={'About'} />
            <EditorLink />
        </nav>
    )
}