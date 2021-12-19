import { promises as fs } from 'fs'
import path from 'path'

import Link from 'next/link'
import dynamic from 'next/dynamic'

const RenderBlock = dynamic(() => import('../components/editorjs-render/main-render'))

import s from '../styles/pages.module.css'

export default function Home({ data }) {
    return (
        <div className={s.root}>
            <Link href="/edit/index">
                <a><button><h3>Go to Editor mode</h3></button></a>
            </Link>
            <br />
            {data && <RenderBlock data={data} />}
        </div>
    )
}

export async function getStaticProps() {
    const route = path.join(process.cwd(), 'data', 'index.json')
    const data = await fs.readFile(route, 'utf8')
    return {
        props: { data },
        revalidate: 10,
    }
}