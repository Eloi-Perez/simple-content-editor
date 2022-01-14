// import { useRouter } from 'next/router'

import s from './footer.module.css'

export default function Footer() {
    // const router = useRouter()
    return (
        <footer className={s.root}>
            <div className={s.container}>
                <p>Some Link</p>
                <h3>This is a Footer</h3>
                <p className={s.login}>some actions</p>
            </div>
        </footer>
    )
}