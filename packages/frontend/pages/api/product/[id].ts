import { NextApiRequest, NextApiResponse } from "next"
import getProducgtById from "./services/getProductById"


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    try {
        const product = await getProducgtById(id as string)
        res.status(200).json(product)
    } catch (error: any) {
        if (error.message) res.status(500).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}