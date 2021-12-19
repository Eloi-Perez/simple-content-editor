import { useRouter } from 'next/router'

import Link from 'next/link'
import s from './navbar.module.css'

export default function ActiveLink({ ...props }) {
    const router = useRouter()
    const index = () => {
        let path = router.pathname
        if (path === '/') { path = '/index'}
        return path
    }
    const href = `/edit${index()}`

    return (
        router.pathname !== '/edit/[editor]' &&
        <Link href={href} {...props}>
            <a className={`${s.link} ${s.linkeditor}`} >
                    <h2>Editor Mode</h2>
            </a>
        </Link>
    )
}