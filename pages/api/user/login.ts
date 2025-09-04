import { NextApiRequest, NextApiResponse } from "next";
import loginUser from "./services/login/loginUser";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { authorization } = req.headers
    try {
        if (method == 'PUT') {
            const { email, password } = req.body
            const login = await loginUser(email, password, authorization)
            return res.status(200).json({ Message: "Has iniciado sesión", user: login })
        }
    }
    catch (error: any) {
        if (error.message && error.message.includes('jwt expired')) res.status(400).json({ error: 'Token invalido' })
        else if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}