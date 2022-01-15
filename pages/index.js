import { promises as fs } from 'fs'
import path from 'path'

// import Link from 'next/link'
import dynamic from 'next/dynamic'

const RenderBlock = dynamic(() => import('../components/editorjs-render/main-render'))

import s from '../styles/pages.module.css'

export default function Home({ arrayFiles }) {
    return (
        <>
            {RenderBlock && arrayFiles && arrayFiles.map((f, i) =>
                <div key={'RenderBlock ' + i} className={s.root}>
                    <RenderBlock data={f} />
                </div>
            )}
        </>
    )
}

export async function getStaticProps() {
    const routeFolder = path.join(process.cwd(), 'data', 'index') // folder 'index'
    const arrayFilesNames = await fs.readdir(routeFolder) // [ 'index1.json', 'index2.json', ... ]
    const promiseArrayFiles = await arrayFilesNames.map(async (f) => {
        const fileRoute = await path.join(routeFolder, f)
        const file = await fs.readFile(fileRoute, 'utf8')
        return file
    })
    const arrayFiles = await Promise.all(promiseArrayFiles)
    return {
        props: { arrayFiles },
        revalidate: 10,
    }
}