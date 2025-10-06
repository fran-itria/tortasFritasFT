import { Options } from "../../../sequelize/db";


export default async function findOptions() {
    const options = await Options.findAll()
    if (options.length > 0) return options
    else throw new Error('No se encontraron las configuraciones del emprendimiento')
}