import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { Product } from './ProductCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function ShoppingCart({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}: ShoppingCartProps) {
  const total = cartItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const itemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Carrinho de Compras</span>
            {itemCount > 0 && (
              <Badge className="bg-[#DF760B]">{itemCount}</Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Revise seus itens antes de finalizar a compra
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {!cartItems || cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
                <Button 
                  onClick={onClose}
                  className="bg-[#DF760B] hover:bg-orange-700 text-white"
                >
                  Continuar Comprando
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-4">
                  {cartItems?.map((item) => (
                    <div key={item.id} className="flex space-x-4 p-4 border border-orange-100 rounded-lg">
                      {/* Product Image */}
                      <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="font-semibold text-[#DF760B]">
                            R$ {item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              R$ {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center space-x-1 border border-gray-200 rounded">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <span className="text-sm font-semibold text-gray-900">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Cart Summary */}
              <div className="py-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Subtotal</span>
                  <span className="font-semibold text-gray-900">R$ {total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Frete</span>
                  <span>Calculado no checkout</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-[#DF760B]">R$ {total.toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <Button 
                  onClick={onCheckout}
                  className="w-full bg-[#DF760B] hover:bg-orange-700 text-white"
                  size="lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Finalizar Compra
                </Button>

                <Button 
                  variant="outline"
                  onClick={onClose}
                  className="w-full border-orange-200 text-[#DF760B] hover:bg-orange-50"
                >
                  Continuar Comprando
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}