import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const error_description = searchParams.get('error_description')
    const next = searchParams.get('next') ?? '/'

    // Log para debug
    console.log('[OAuth Callback] Received request:', {
        code: code ? 'present' : 'missing',
        error,
        error_description,
        next
    })

    // Se houver erro do provider (Google, etc)
    if (error) {
        console.error('[OAuth Callback] Provider error:', error, error_description)
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${error}`)
    }

    if (code) {
        try {
            const supabase = await createClient()
            const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

            if (!exchangeError && data.session) {
                console.log('[OAuth Callback] Success! User:', data.user?.email)
                // Sucesso - redirecionar para a página inicial
                return NextResponse.redirect(`${origin}${next}`)
            }

            // Log detalhado do erro
            console.error('[OAuth Callback] Exchange error:', {
                message: exchangeError?.message,
                status: exchangeError?.status,
                name: exchangeError?.name,
            })
        } catch (err) {
            console.error('[OAuth Callback] Unexpected error:', err)
        }
    } else {
        console.error('[OAuth Callback] No code provided')
    }

    // Se houver erro ou não houver código, redirecionar para página de erro
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
