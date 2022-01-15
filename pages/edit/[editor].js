import { useRouter } from 'next/router'
import { withIronSessionSsr } from 'iron-session/next'
import { ironOptions } from '../../lib/iron-config'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { promises as fs } from 'fs'
import path from 'path'

import s from '../../styles/editor.module.css'

let ContainerEditor = dynamic(() => import('../../components/editorjs-create/container-editor'), {
    ssr: false
})

function AdminHome({ pageName, arrayFiles, arrayFilesNames }) {
    const router = useRouter()
    // const { editor } = router.query

    // Handle route change
    useEffect(() => {
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
            <h1>Editor mode</h1>
            {ContainerEditor && arrayFiles && arrayFiles.map((f, i) =>
                <div key={'ContainerEditor ' + i}>
                    <ContainerEditor pageName={pageName} fileName={arrayFilesNames[i]} oldData={f} />
                </div>
            )}

            <h3>Debuggin Info:</h3>
            {arrayFiles && arrayFiles.map((f, i) => (<p key={'rawData ' + i}>{f}</p>))}
            {/* <p>{editorInstance && JSON.stringify(editorInstance)}</p>
            <p>{editorData && JSON.stringify(editorData)}</p>
            <p>{imageArray && JSON.stringify(imageArray)}</p> */}
            <p>{router.asPath}</p>



            <button className={s.save} onClick={logOut}>Log Out</button>
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
            const pageName = context.params.editor

            const routeFolder = path.join(process.cwd(), 'data', pageName)
            const arrayFilesNames = await fs.readdir(routeFolder) // [ 'index1.json', 'index2.json' ]
            const promiseArrayFiles = await arrayFilesNames.map(async (f) => {
                const fileRoute = await path.join(routeFolder, f)
                const file = await fs.readFile(fileRoute, 'utf8')
                return file
            })
            const arrayFiles = await Promise.all(promiseArrayFiles)

            return {
                props: {
                    pageName,
                    arrayFiles,
                    arrayFilesNames,
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