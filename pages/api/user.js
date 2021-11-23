import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../lib/iron-config'

export default withIronSessionApiRoute(userRoute, ironOptions)

function userRoute(req, res) {
    res.json({ user: req.session.user });
}