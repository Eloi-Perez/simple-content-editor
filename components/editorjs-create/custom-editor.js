import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from './tools'

const CustomEditor = ({ handleInstance, data }) => {
    const ReactEditorJS = createReactEditorJS()
    return <ReactEditorJS onInitialize={(instance) => handleInstance(instance)}
        tools={EDITOR_JS_TOOLS} data={data}
        placeholder={`Write from here...`}
    />
}
export default CustomEditor