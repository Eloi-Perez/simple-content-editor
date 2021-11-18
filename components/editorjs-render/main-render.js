import Blocks from 'editorjs-blocks-react-renderer'
import imageN from './image'

const rendererConfig = {
    image: {
        className: "image-editorjs",
        // actionsClassNames: {
        //     stretched: "image-block--stretched",
        //     withBorder: "image-block--with-border",
        //     withBackground: "image-block--with-background",
        // }
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