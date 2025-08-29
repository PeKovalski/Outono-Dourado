import React, { useState } from 'react';
import { ProductCard, Product } from './ProductCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import cornImage from 'figma:asset/c85717725cf6258c55f68120d7a2b42f135d81c9.png';
import pumpkinImage from 'figma:asset/ceba15dc9db799b2e19afbd2186a8a113a2aff1c.png';
import appleImage from 'figma:asset/e2ab41f2bf641c7b8b08d4a43d8c5eb1fd0a9e4c.png';
import walnutsImage from 'figma:asset/d99ef165eed78da57eb38399811e1451aace8896.png';
import orangeImage from 'figma:asset/abd36cfedf1e061b7d501a47652a15e6fc28622e.png';
import grapesImage from 'figma:asset/696551ff187580ff370f9324c0a1c1ec16fbee6f.png';
import carrotsImage from 'figma:asset/db256cef80c4c1552aabdb5b7bd2c9f89bd9cbfb.png';
import lettuceImage from 'figma:asset/b38d7a41e650d8014af994b96f6f405bf4be8362.png';
import broccoliImage from 'figma:asset/12fae0b8f1ca55b2061b763a7dbe7403c0474c2d.png';
import tomatoImage from 'figma:asset/48c83263f9b999112ef39ef17513d3538edaf959.png';
import sweetPotatoImage from 'figma:asset/657d80121eaa2610ac72fdb40234441c9d072849.png';
import potatoImage from 'figma:asset/019510e81250078f7cb29d01772618c3db7cb9ff.png';

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void;
}

export function ProductsSection({ onAddToCart }: ProductsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Mock products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Milho Orgânico Fresco',
      description: 'Milho orgânico cultivado de forma sustentável, sem pesticidas, colhido fresquinho',
      price: 12.90,
      originalPrice: 15.90,
      image: cornImage,
      category: 'Alimentos',
      rating: 5,
      reviews: 32,
      inStock: true,
      isEco: true
    },
    {
      id: '2',
      name: 'Abóbora Orgânica Premium',
      description: 'Abóboras orgânicas selecionadas, cultivadas sem agrotóxicos, ideais para receitas saudáveis',
      price: 18.50,
      originalPrice: 22.90,
      image: pumpkinImage,
      category: 'Alimentos',
      rating: 5,
      reviews: 28,
      inStock: true,
      isEco: true
    },
    {
      id: '3',
      name: 'Maçã Orgânica Premium',
      description: 'Maçãs vermelhas selecionadas, cultivadas organicamente, doces e crocantes',
      price: 14.90,
      originalPrice: 18.50,
      image: appleImage,
      category: 'Alimentos',
      rating: 5,
      reviews: 45,
      inStock: true,
      isEco: true
    },
    {
      id: '4',
      name: 'Castanhas Orgânicas Premium',
      description: 'Castanhas doces e saborosas, colhidas no outono, ricas em nutrientes e energia',
      price: 32.90,
      originalPrice: 39.90,
      image: walnutsImage,
      category: 'Alimentos',
      rating: 5,
      reviews: 18,
      inStock: true,
      isEco: true
    },
    {
      id: '5',
      name: 'Laranjas Orgânicas Premium',
      description: 'Laranjas suculentas e doces, cultivadas organicamente, ricas em vitamina C',
      price: 16.90,
      originalPrice: 21.90,
      image: orangeImage,
      category: 'Alimentos',
      rating: 5,
      reviews: 42,
      inStock: true,
      isEco: true
    },
    {
      id: '6',
      name: 'Uvas Orgânicas Premium',
      description: 'Uvas selecionadas de vinhedos orgânicos, doces e suculentas, ricas em antioxidantes',
      price: 24.90,
      originalPrice: 29.90,
      image: grapesImage,
      category: 'Alimentos',
      rating: 5,
      reviews: 38,
      inStock: true,
      isEco: true
    },
    // Verduras Orgânicas
    {
      id: '7',
      name: 'Cenouras Orgânicas Frescas',
      description: 'Cenouras orgânicas cultivadas de forma sustentável, doces e crocantes, ricas em betacaroteno',
      price: 8.90,
      originalPrice: 12.90,
      image: carrotsImage,
      category: 'Verduras',
      rating: 5,
      reviews: 24,
      inStock: true,
      isEco: true
    },
    {
      id: '8',
      name: 'Alface Orgânica Premium',
      description: 'Alface fresca e crocante, cultivada organicamente sem pesticidas, perfeita para saladas saudáveis',
      price: 6.90,
      originalPrice: 9.90,
      image: lettuceImage,
      category: 'Verduras',
      rating: 5,
      reviews: 16,
      inStock: true,
      isEco: true
    },
    {
      id: '9',
      name: 'Brócolis Orgânico Fresco',
      description: 'Brócolis orgânico fresco, rico em vitaminas e minerais, cultivado sem agrotóxicos',
      price: 12.90,
      originalPrice: 16.90,
      image: broccoliImage,
      category: 'Verduras',
      rating: 5,
      reviews: 31,
      inStock: true,
      isEco: true
    },
    // Legumes Orgânicos
    {
      id: '10',
      name: 'Batatas Orgânicas Premium',
      description: 'Batatas orgânicas frescas, cultivadas naturalmente sem agrotóxicos, ideais para diversos pratos',
      price: 7.90,
      originalPrice: 10.90,
      image: potatoImage,
      category: 'Legumes',
      rating: 5,
      reviews: 19,
      inStock: true,
      isEco: true
    },
    {
      id: '11',
      name: 'Tomates Orgânicos Frescos',
      description: 'Tomates orgânicos suculentos e saborosos, cultivados de forma sustentável, ricos em licopeno',
      price: 11.90,
      originalPrice: 15.90,
      image: tomatoImage,
      category: 'Legumes',
      rating: 5,
      reviews: 14,
      inStock: true,
      isEco: true
    },
    {
      id: '12',
      name: 'Batata Doce Orgânica Premium',
      description: 'Batata doce orgânica naturalmente doce, rica em vitaminas e fibras, cultivada sem pesticidas',
      price: 9.90,
      originalPrice: 13.90,
      image: sweetPotatoImage,
      category: 'Legumes',
      rating: 5,
      reviews: 27,
      inStock: true,
      isEco: true
    }
  ];

  const categories = ['Todos', 'Alimentos', 'Verduras', 'Legumes'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="products" className="py-20" style={{backgroundColor: '#D9C4B0'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[rgba(246,182,30,1)] mb-4">Nossos Produtos</h2>
          <p className="text-xl text-[#DF760B] max-w-2xl mx-auto mb-8">
            Descobra nossa seleção cuidadosa de produtos sustentáveis para sua casa e família
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      selectedCategory === category
                        ? 'bg-[#DF760B] text-white hover:bg-orange-700'
                        : 'border-orange-200 text-[#DF760B] hover:bg-orange-50'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
            <Button
              variant="outline"
              className="mt-4 border-orange-200 text-[#DF760B] hover:bg-orange-50"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todos');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-[#DF760B] mb-4">Não encontrou o que procura?</p>
          <Button 
            variant="outline"
            className="border-orange-200 text-[#DF760B] hover:bg-orange-50"
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Entre em Contato
          </Button>
        </div>
      </div>
    </section>
  );
}