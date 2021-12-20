import { useRouter } from 'next/router'
import { withIronSessionSsr } from 'iron-session/next'
import { ironOptions } from '../../lib/iron-config'
import React, { useState, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { promises as fs } from 'fs'
import path from 'path'

import s from '../../styles/editor.module.css'

let CustomEditor = dynamic(() => import('../../components/editorjs-create/custom-editor'), {
    ssr: false
})

function AdminHome({ oldData }) {
    const router = useRouter()
    const { editor } = router.query

    const [imageArray, setImageArray] = useState([]) /* to keep track of uploaded image */
    const [editorInstance, setEditorInstance] = useState({}) /* to get the instance of editor.Js */
    const [editorData, setData] = useState(JSON.parse(oldData)) /* to store editorjs data from server or other source and show it in editor.js */

    // Handle route change
    React.useEffect(() => {
        router.events.on("routeChangeStart", handleRouteChange);
        return () => {
            router.events.off("routeChangeStart", handleRouteChange);
        };
    }, [])
    const handleRouteChange = (url) => {
        let confirm = window.confirm('Are you sure you want to continue? Unsaved data will be lost' + '\n' + 'OK to continue, Cancel to stay on this page');
        if (!confirm) {
            // console.error('throwing')
            // router.replace(router.asPath, undefined, { shallow: true })
            throw 'stop redirect'
        }
    }

    // Track instance editor.js
    const handleInstance = (instance) => {
        setEditorInstance(instance)
    }

    // Fill array with current images on loading
    React.useEffect(() => {
        const data = JSON.parse(oldData)
        const list = []
        data.blocks.forEach(block => {
            if (block.type === 'image') { list.push(block.data.file.url) }
        })
        setImageArray(list)
    }, [])

    function removeImage(img) {
        const array = imageArray.filter(image => image !== img)
        setImageArray(array)
    }

    // Remove unused imges
    const clearEditorLeftoverImages = async (savedData) => {
        // Get editor.js images
        const currentImages = []
        savedData.blocks.forEach(block => {
            if (block.type === 'image') { currentImages.push(block.data.file.url) }
        })

        for (const img of imageArray) {
            if (!currentImages.includes(img)) {
                try {
                    // delete image from backend
                    const data = { imagePath: img }
                    const res = await fetch('/api/deleteImage', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                    const result = await res.json()
                    console.log(JSON.stringify(result))
                    // remove from array
                    removeImage(img)
                } catch (err) {
                    console.log(err.message)
                }
            }
        }
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
        await clearEditorLeftoverImages(savedData)

        /* Save to server */
        fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }

    const logOut = async () => {
        let confirm = window.confirm('Are you sure you want to log out? Unsaved data will be lost' + '\n' + 'OK to continue, Cancel to stay on this page');
        if (confirm) {
            try {
                const call = await fetch('/api/logout')
                const response = await call.json()
                if (response.loggedOff) {
                    // router.push('/')
                    window.location.href = '/'
                }
            } catch (error) {
                console.error('An unexpected error happened:', error)
            }
        }
    }

    return (
        <>
            <button className={s.save} onClick={saveArticle}>Save</button>
            {/* <button onClick={() => console.log(imageArray)}>Log Array Images</button> */}
            <br />
            <h1>Editor mode</h1>
            {CustomEditor && <CustomEditor handleInstance={handleInstance}
                data={editorData} imageArray={imageArray} />}

            <h3>Debuggin Info:</h3>
            <p>{editorInstance && JSON.stringify(editorInstance)}</p>
            <p>{editorData && JSON.stringify(editorData)}</p>
            <p>{imageArray && JSON.stringify(imageArray)}</p>
            <p>{router.asPath}</p>
            <button onClick={logOut}>Log Out</button>
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context) {
        const user = await context.req.session.user
        if (!user) { //(user.admin !== true)
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }
        try {
            const fileName = context.params.editor + '.json'
            const route = path.join(process.cwd(), 'data', fileName)
            const oldData = await fs.readFile(route, 'utf8')
            return {
                props: {
                    oldData,
                    // user: context.req.session.user, //if I need user-name in page
                },

            }
        } catch (err) {
            console.error(err);
            return {
                notFound: true,
            }
        }
    },
    ironOptions,
)


export default AdminHome