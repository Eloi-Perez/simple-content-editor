import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../lib/iron-config'

import path from 'path'
import formidable from 'formidable'
import sizeOf from 'image-size'

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

const uploadFolder = path.resolve(process.cwd() + '/public/images/')
const options = {
    multiples: false,
    maxFileSize: 50 * 1024 * 1024, // 5MB
    uploadDir: uploadFolder,
    keepExtensions: true,
    filter: function ({ name, originalFilename, mimetype }) {
        // keep only images
        return mimetype && mimetype.includes("image")
    },
}

export default withIronSessionApiRoute(handler, ironOptions)

async function handler(req, res) {
    const user = await req.session.user
    if (!user) {
        res.status(401).json({ authorized: false })
    } else {
        const form = new formidable.IncomingForm(options)
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log("Error parsing the files")
                return res.status(400).json({
                    status: "Fail",
                    message: "There was an error parsing the files",
                    error: err,
                })
            } else {
                try {
                    const finalURL = '/images/' + path.basename(files.images.filepath)
                    const dimensions = sizeOf(files.images.filepath)
                    return res.status(200).json({
                        url: finalURL,
                        width: dimensions.width,
                        height: dimensions.height
                    })
                } catch (e) {
                    res.status(500).json({ error: e })
                }
            }
        })
    }
}