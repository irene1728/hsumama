export type Product = {
  id: number;
  slug: string;
  name: string;
  image: string;

  category:
    | "pork"
    | "chicken"
    | "beef"
    | "lamb"
    | "sausage"
    | "seafood"
    | "soup";

  price: number;

  description: string;

  weight: string | null;

  storage: string;

  delivery: string;

  featured: boolean;
};