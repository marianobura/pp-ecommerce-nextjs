export type Product = {
  id: number;
  title: string;
  price: number;
  brand: string;
  description: string;
  images: string[];
  stock: number;
  rating: number;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
};