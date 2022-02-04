import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../lib/iron-config'

import { Buffer } from 'buffer'
import { writeFile } from 'fs'
import path from 'path'
import findRemoveSync from 'find-remove'

export const config = {
    api: {
        externalResolver: true,
    },
}


export default withIronSessionApiRoute(handler, ironOptions)

async function handler(req, res) {
    if (req.method === 'POST') {
        const user = await req.session.user
        if (!user) {
            res.status(401).json({ authorized: false })
        } else { // Authorized
            try {
                const folderName = req.body.pageName
                const fileName = req.body.fileName
                const data = new Uint8Array(Buffer.from(JSON.stringify(req.body.data)))
                let pathData = path.join(process.cwd(), 'data', folderName)
                let pathBackup = path.join(process.cwd(), 'data', 'backup')
                writeFile(pathData + '/' + fileName, data, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ error: 'Wrong route', path: pathData })
                        res.status(500).json({ error: 'error' })
                    } else {
                        const miliseconds = Date.parse(new Date())
                        const backup = miliseconds + '.' + fileName
                        writeFile(pathBackup + '/' + backup, data)
                        let resultDel = findRemoveSync(pathBackup, {
                            age: { seconds: 2592000 }, // 2592000 -> 30 days
                            extensions: '.json',
                            limit: 100
                        })
                        console.log(resultDel)
                        //send to second backup?
                        res.status(200).json({ message: 'Saved!' })
                    }
                });
            } catch (err) {
                res.status(500).json({ error: 'error POST: ' + err })
            }
        }
    } else {
        res.status(405).end()
    }
}