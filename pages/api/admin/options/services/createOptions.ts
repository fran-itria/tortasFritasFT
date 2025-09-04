import { Options } from "../../../sequelize/db";


export default async function createOptions() {
    const option = await Options.create()
    if (option) return option
}