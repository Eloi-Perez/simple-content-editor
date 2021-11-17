import { Buffer } from 'buffer'
import { writeFile } from 'fs'
import path from 'path'


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const fileName = req.body.fileName
            const data = new Uint8Array(Buffer.from(JSON.stringify(req.body.data)))
            let pathData = path.resolve(process.cwd() + '/data/') + '/'
            writeFile(pathData + fileName, data, (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'Wrong route', path: pathData })
                    res.status(500).json({ error: 'error' })
                } else {
                    const miliseconds = Date.parse(new Date())
                    const backup = miliseconds + '.' + fileName
                    writeFile(pathData + backup, data)
                    //delete older backup + second backup
                    res.status(200).json({ message: 'Saved!' })
                }
            });
        } catch (err) {
            res.status(500).json({ error: 'error POST: ' + err })
        }
    } else {
        res.status(405).end()
    }
}