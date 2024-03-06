export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}
export interface ProductListResponse {
  products: Product[]
  paginate: {
    page: number
    limit: number
    totalItems: number
    page_size: number
  }
}
export interface ProductListQuery {
  page?: number
  limit?: number
  sort_by?: 'createdAt' | 'price' | 'sold' | 'view'
  order?: 'asc' | 'desc'
  rating_filter?: number
  exclude?: string
  category?: string
  price_max?: number
  price_min?: number
  name?: string
}
