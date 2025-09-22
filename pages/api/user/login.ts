import { NextApiRequest, NextApiResponse } from "next";
import loginUser from "./services/login/loginUser";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { authorization } = req.headers
    try {
        if (method == 'PUT') {
            const { email, password } = req.body
            const result = await loginUser(email, password, authorization)
            if (!result) {
                return res.status(401).json({ error: "Invalid credentials" })
            }
            const { user, token } = result
            return res.status(200).json({ message: "Has iniciado sesión", user, token })
        }
    }
    catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}