import { Button } from './ui/button';
import { Leaf, Recycle, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import autumnBackground from 'figma:asset/89b65eee7864fc25ec5e4714c4df5796dbb4d802.png';

export function HeroBanner() {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={autumnBackground}
          alt="Paisagem de outono dourado com árvores"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-orange-900/30 bg-[rgba(154,77,33,0.3)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-600/20 backdrop-blur-sm p-4 rounded-full border border-white/20 bg-[rgba(223,118,11,0.2)]">
            <Leaf className="h-16 w-16 text-[#F6B61E]" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-orange-50">
          Outono Dourado
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-2xl mx-auto leading-relaxed">
          Produtos sustentáveis para um futuro mais verde. 
          Transformando sua casa e vida com soluções ecológicas de qualidade.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Recycle className="h-5 w-5 text-[#F6B61E]" />
            <span className="text-orange-100">100% Sustentável</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Heart className="h-5 w-5 text-[#F6B61E]" />
            <span className="text-orange-100">Feito com Amor</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Leaf className="h-5 w-5 text-[#F6B61E]" />
            <span className="text-orange-100">Araucária, PR</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={scrollToProducts}
            size="lg"
            className="bg-[#DF760B] hover:bg-orange-700 text-white border-none px-8 py-3 text-lg"
          >
            Ver Produtos
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-[rgba(0,0,0,1)] hover:bg-white/10 backdrop-blur-sm px-8 py-3 text-lg"
            onClick={() => {
              const element = document.getElementById('about');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Conheça Nossa História
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}