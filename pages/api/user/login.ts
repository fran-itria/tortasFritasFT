import { NextApiRequest, NextApiResponse } from "next";
import loginUser from "./services/login/loginUser";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    try {
        if (method == 'PUT') {
            const { email, password, token } = req.body
            const login = await loginUser(email, password, token)
            return res.status(200).json({ Message: "Has iniciado sesión", user: login })
        }
    }
    catch (error: any) {
        console.log(error)
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}