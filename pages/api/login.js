import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../lib/iron-config'

export default withIronSessionApiRoute(loginRoute, ironOptions)

async function loginRoute(req, res) {
    const user = process.env.DB_USER
    const pass = process.env.DB_PASS

    if (req.body.username === user & req.body.password === pass) {
        req.session.user = req.body.username
        await req.session.save()
        res.status(200).json({ authorized: true })
    } else {
        res.status(401).json({ authorized: false })
    }
}
