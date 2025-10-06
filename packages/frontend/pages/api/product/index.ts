import { NextApiRequest, NextApiResponse } from "next";
import getAllProducts from "./services/getAllProducts";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const products = await getAllProducts()
        res.status(200).json(products)
    } catch (error: any) {
        if (error.message) res.status(500).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}