import { useRouter } from 'next/router'
import React, { useState, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { promises as fs } from 'fs'
import path from 'path'

let CustomEditor = dynamic(() => import('../../components/editorjs-create/custom-editor'), {
    ssr: false
})

function AdminHome({ oldData }) {
    const router = useRouter()
    const { editor } = router.query

    // const [imageArray, setImageArray] = useState([]) /* to keep track of uploaded image */
    let [editorInstance, setEditorInstance] = useState({}) /* to get the instance of editor.Js */
    const [editorData, setData] = useState(JSON.parse(oldData)) /* to store editorjs data from server or other source and show it in editor.js */

    const handleInstance = (instance) => {
        setEditorInstance(instance)
    }

    const saveArticle = async (e) => {
        e.preventDefault()

        /* get the editor.js content and save it to variable */
        const savedData = await editorInstance.save();
        setData(savedData)

        const data = {
            fileName: `${editor}.json`,
            data: savedData,
        }

        /* Clear all the unused images from server */
        // await clearEditorLeftoverImages()

        /* Save to server */
        fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }

    return (
        <>
            <h1>Editor mode</h1>
            <button onClick={saveArticle}>Save</button>
            {CustomEditor && <CustomEditor handleInstance={handleInstance} data={editorData} />}
            {/* {CustomEditor && <CustomEditor handleInstance={handleInstance}
                data={editorData} imageArray={imageArray} />} */}

            <p>{editorInstance && JSON.stringify(editorInstance)}</p>
            <p>{editorData && JSON.stringify(editorData)}</p>
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        const fileName = context.params.editor + '.json'
        const route = path.join(process.cwd(), 'data', fileName)
        const oldData = await fs.readFile(route, 'utf8')
        return {
            props: { oldData },
        }
    } catch (err) {
        console.error(err);
        return {
            notFound: true,
        }
    }
}


export default AdminHome