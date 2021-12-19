import Blocks from 'editorjs-blocks-react-renderer'
import imageN from './image'

const rendererConfig = {
    code: {
        className: "code-editorjs"
    },
    delimiter: {
        className: "delimiter-editorjs"
    },
    embed: {
        className: "embed-editorjs"
    },
    header: {
        className: "header-editorjs"
    },
    paragraph: {
        className: "paragraph-editorjs"
    },
    image: {
        className: "image-editorjs"
    },
    quote: {
        className: "quote-editorjs"
    },
    table: {
        className: "table-editorjs"
    }
}

export default function RenderBlock({ data }) {
    return (
        <>
            {data &&
                <Blocks
                    data={JSON.parse(data)}
                    renderers={{
                        image: imageN
                    }}
                    config={rendererConfig}
                />}
        </>
    )
}