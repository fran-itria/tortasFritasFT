import { NextApiRequest, NextApiResponse } from "next";
import loginWithToken from "./services/login/loginWithToken";


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    try {
        if (method == 'GET') {
            const { authorization } = req.headers
            const user = await loginWithToken(authorization as string)
            res.status(200).json(user)
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}