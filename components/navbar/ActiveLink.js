import Link from 'next/link'
import s from './navbar.module.css'
import { useRouter } from "next/router"

export default function ActiveLink({ title, href, ...props }) {
    const router = useRouter()
    return (
        <Link href={href} {...props}>
            <a className={`${s.link} ${(router.pathname === href || router.asPath === '/edit' + href || (router.asPath === '/edit/index' && href === '/')) ? s.active : ''}`} >
                <h2>{title} </h2>
            </a>
        </Link>
    )
}