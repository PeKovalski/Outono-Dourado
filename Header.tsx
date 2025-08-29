import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Leaf, ShoppingCart, Menu } from 'lucide-react';

interface HeaderProps {
  cartItems: number;
  onCartClick: () => void;
}

export function Header({ cartItems, onCartClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-orange-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-[#DF760B] p-2 rounded-full">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-[rgba(116,60,8,1)] text-[16px]">Outono Dourado</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Button
              variant="ghost"
              onClick={() => scrollToSection('home')}
              className="text-[#DF760B] hover:text-orange-800 hover:bg-orange-50"
            >
              Início
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('about')}
              className="text-[#DF760B] hover:text-orange-800 hover:bg-orange-50"
            >
              Sobre Nós
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('products')}
              className="text-[#DF760B] hover:text-orange-800 hover:bg-orange-50"
            >
              Produtos
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('store')}
              className="text-[#DF760B] hover:text-orange-800 hover:bg-orange-50"
            >
              Loja Física
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('contact')}
              className="text-[#DF760B] hover:text-orange-800 hover:bg-orange-50"
            >
              Contato
            </Button>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={onCartClick}
              className="relative border-orange-200 text-[#DF760B] hover:bg-orange-50"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-[#DF760B] text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden text-[#DF760B]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-orange-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                onClick={() => scrollToSection('home')}
                className="text-[#DF760B] justify-start"
              >
                Início
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('about')}
                className="text-[#DF760B] justify-start"
              >
                Sobre Nós
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('products')}
                className="text-[#DF760B] justify-start"
              >
                Produtos
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('store')}
                className="text-[#DF760B] justify-start"
              >
                Loja Física
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('contact')}
                className="text-[#DF760B] justify-start"
              >
                Contato
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}