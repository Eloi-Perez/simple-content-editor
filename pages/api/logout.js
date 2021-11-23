import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../lib/iron-config'

export default withIronSessionApiRoute(logoutRoute, ironOptions)

function logoutRoute(req, res, session) {
    req.session.destroy()
    res.json({ loggedOff: true })
}