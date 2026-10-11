export interface Product {
  productId: number;
  categoryId?: number;
  categoryName: string;
  name: string;
  description: string | null;
  price: number;
  discountPrice: number | null;
  imageUrl: string | null;
  isActive: boolean;
  isAvailable: boolean;
}
