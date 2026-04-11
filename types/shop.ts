export interface Product {
    id: string;
    name: string;
    description?: string;
    long_description?: string;
    price: number;
    image_url?: string;
    images?: string[];
    category: string;
    stock: number;
    show_on_home?: boolean;
    subcategory?: string;
    brand?: string;
    volume?: string;
    gender?: string;
    fragrance_family?: string;
    top_notes?: string;
    heart_notes?: string;
    base_notes?: string;
    origin_country?: string;
    concentration?: string;
    rating?: number;
    review_count?: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Favorite {
    id: string;
    user_id: string;
    product_id: string;
    list_id?: string | null;
    created_at: string;
    product?: Product; // Joined product data
}

export interface FavoriteList {
    id: string;
    user_id: string;
    name: string;
    created_at: string;
}

export interface Profile {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    address?: string;
    role: string;
    created_at: string;
}

export interface Order {
    id: string;
    user_id: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total_amount: number;
    payment_status: 'paid' | 'unpaid' | 'refunded';
    shipping_address?: string;
    created_at: string;
    profiles?: Profile; // Changed from user to profiles to match Supabase join usually
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    products?: Product;
}

export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: 'rent' | 'supplier' | 'marketing' | 'software' | 'logistics' | 'other';
    recurrence?: 'monthly' | 'weekly' | 'one_time';
    expense_date: string;
    created_at: string;
}

export interface ContentBlock {
    id: string;
    section_name: string;
    title: string;
    description?: string;
    image_url?: string;
    link_url?: string;
    link_text?: string;
    is_active: boolean;
    created_at: string;
}

export interface NavigationItem {
    id: string;
    label: string;
    href?: string;
    parent_id?: string | null;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    children?: NavigationItem[];
}
