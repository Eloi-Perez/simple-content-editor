import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../lib/iron-config'

import path from 'path'
import { promises as fs } from 'fs'

const imageFolder = path.resolve(process.cwd() + '/public/images/')

export default withIronSessionApiRoute(handler, ironOptions)

async function handler(req, res) {
    const user = await req.session.user
    if (!user) {
        res.status(401).json({ authorized: false })
    } else {
        const file = path.basename(req.body.imagePath)
        const filePath = path.resolve(imageFolder + '/' + file)
        try {
            await fs.unlink(filePath);
            res.status(200).json({ message: 'deleted' })
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }
}