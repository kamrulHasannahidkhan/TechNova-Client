"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  isHydrated: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const load = async () => {
      if (session?.user) {
        try {
          const res = await fetch("/api/cart");
          if (res.ok) {
            const serverCart = await res.json();
            setItems(serverCart.map((i: any) => ({ _id: i.productId, name: i.name, price: i.price, image: i.image, quantity: i.quantity })));
            setIsHydrated(true);
            return;
          }
        } catch {}
      }
      const saved = sessionStorage.getItem("cart");
      setItems(saved ? JSON.parse(saved) : []);
      setIsHydrated(true);
    };

    load();
  }, [status, session]);

  useEffect(() => {
    if (!isHydrated) return;

    if (session?.user) {
      fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: items.map((i) => ({ productId: i._id, name: i.name, price: i.price, image: i.image, quantity: i.quantity })),
        }),
      }).catch(() => {});
    } else {
      sessionStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, session, isHydrated]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) return prev.map((i) => (i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setItems((prev) => prev.filter((i) => i._id !== id));

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(id);
    setItems((prev) => prev.map((i) => (i._id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => setItems([]);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, isHydrated }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
