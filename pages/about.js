import { promises as fs } from 'fs'
import path from 'path'

import Blocks from 'editorjs-blocks-react-renderer'
import imageN from '../components/editorjs-render/image'

import Link from 'next/link'


const rendererConfig = { //create new component with all this and Blocks and imageN
    image: {
        className: "hola",
        // actionsClassNames: {
        //     stretched: "image-block--stretched",
        //     withBorder: "image-block--with-border",
        //     withBackground: "image-block--with-background",
        // }
    }
}

export default function About({ data }) {
    return (
        <div>
            <Link href="/edit/about">
                <a><button><h3>Go to Editor mode</h3></button></a>
            </Link>
            <br />
            {data &&
                <Blocks
                    data={JSON.parse(data)}
                    renderers={{
                        image: imageN
                    }}
                    config={rendererConfig}
                />}
            {data && <p>{data.toString()}</p>}

        </div>
    )
}

export async function getStaticProps() {
    const route = path.join(process.cwd(), 'data', 'about.json')
    const data = await fs.readFile(route, 'utf8')
    return {
        props: { data },
        revalidate: 10,
    }
}