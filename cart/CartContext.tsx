"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import type { Product } from "@/types/product";

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (product: Product) => boolean;

  increaseQuantity: (slug: string) => void;

  decreaseQuantity: (slug: string) => void;

  removeFromCart: (slug: string) => void;

  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 第一次載入時，讀取 LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // cart 改變時，自動儲存到 LocalStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 加入購物車
  function addToCart(product: Product): boolean {
    const currentItem = cart.find(
      (item) => item.id === product.id
    );

    // 庫存為 0
    if (product.stock_quantity <= 0) {
      alert(
        "目前存貨不足，無法購買。\n\n請選購其他商品。"
      );
      return false;
    }

    // 已經加入購物車，而且達到庫存上限
    if (
      currentItem &&
      currentItem.quantity >= product.stock_quantity
    ) {
      alert(
        `目前庫存只有 ${product.stock_quantity} 份，無法再增加。`
      );
      return false;
    }

    setCart((prev) => {
      const exist = prev.find(
        (item) => item.id === product.id
      );

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    return true;
  }

  // 增加數量
  function increaseQuantity(slug: string) {
    setCart((prev) =>
      prev.map((item) => {
        if (item.slug !== slug) {
          return item;
        }

        // 已達到庫存上限
        if (item.quantity >= item.stock_quantity) {
          alert(
            `目前庫存只有 ${item.stock_quantity} 份，無法再增加。`
          );
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  }

  // 減少數量
  function decreaseQuantity(slug: string) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.slug === slug
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // 刪除商品
  function removeFromCart(slug: string) {
    setCart((prev) =>
      prev.filter((item) => item.slug !== slug)
    );
  }

  // 清空購物車
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart 必須放在 CartProvider 裡"
    );
  }

  return context;
}