import { NextRequest, NextResponse } from "next/server";
import validateToken from "./pages/validateToken";

// Forzar el uso de Node.js runtime en lugar de Edge Runtime
export const runtime = 'nodejs'

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const { method } = req

    const publicRoutes = [
        '/api/user/login',
        '/api/user/register',
        '/api/user/forgot-password',
    ]
    if (publicRoutes.includes(pathname) || method == 'GET') {
        return NextResponse.next()
    }

    const authorization = req.headers.get('authorization')

    try {
        validateToken(authorization as string)
        return NextResponse.next()
    }
    catch (error: any) {
        if (error.message && error.message.includes('jwt expired')) {
            return NextResponse.json({ error: 'Token invalido' }, { status: 400 })
        }
        else if (error.message) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }
        else {
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
        }
    }
}

// Configurar en qué rutas aplicar el middleware
export const config = {
    matcher: [
        '/api/:path*',  // Todas las rutas API, pero filtramos las públicas dentro del middleware
    ]
}