export interface UserProfile {
    id: string
    email: string
    full_name: string | null
    phone: string | null
    address: string | null
    city: string | null
    postal_code: string | null
    newsletter_subscribed: boolean
    created_at: string
    updated_at: string
}

export interface AuthUser {
    id: string
    email: string
    user_metadata: {
        full_name?: string
        phone?: string
    }
}

export interface RegisterFormData {
    email: string
    password: string
    full_name: string
    phone?: string
    address?: string
    city?: string
    postal_code?: string
    newsletter_subscribed?: boolean
}

export interface LoginFormData {
    email: string
    password: string
}
