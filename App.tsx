import React, { useState } from "react";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner";
import { AboutSection } from "./components/AboutSection";
import { ProductsSection } from "./components/ProductsSection";
import { StoreSection } from "./components/StoreSection";
import { ContactSection } from "./components/ContactSection";
import {
  ShoppingCart,
  CartItem,
} from "./components/ShoppingCart";
import { Footer } from "./components/Footer";
import { Mascot } from "./components/Mascot";
import { Product } from "./components/ProductCard";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        toast.success(
          `${product.name} - Quantidade atualizada no carrinho!`,
        );
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        toast.success(
          `${product.name} adicionado ao carrinho!`,
        );
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
  ) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === productId);
      if (item) {
        toast.success(`${item.name} removido do carrinho`);
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const handleCheckout = () => {
    // Simulate checkout process
    toast.success("Redirecionando para o pagamento...", {
      description:
        "Você será direcionado para nossa página de pagamento seguro.",
    });

    // In a real app, this would redirect to a payment gateway
    setTimeout(() => {
      setCartItems([]);
      setIsCartOpen(false);
      toast.success("Pedido realizado com sucesso!", {
        description:
          "Você receberá um e-mail de confirmação em breve.",
      });
    }, 2000);
  };

  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />

      <Header
        cartItems={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main>
        <HeroBanner />
        <AboutSection />
        <ProductsSection onAddToCart={addToCart} />
        <StoreSection />
        <ContactSection />
      </main>

      <Footer />

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <Mascot />
    </div>
  );
}