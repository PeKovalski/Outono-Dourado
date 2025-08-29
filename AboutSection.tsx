import { Card, CardContent } from './ui/card';
import { MapPin, Target, Heart, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import historicImage from 'figma:asset/cbe39019fe1fb8af557cb8f1c81ae89ab926a487.png';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[rgba(246,182,30,1)] mb-4">Sobre Nós</h2>
          <p className="text-xl text-[rgba(246,182,30,1)] max-w-2xl mx-auto">
            Uma empresa familiar dedicada à sustentabilidade e qualidade de vida
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* História */}
            <div>
              <h3 className="text-2xl font-semibold text-[rgba(246,182,30,1)] mb-4">Nossa História</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Fundada em 2000 em Araucária, Paraná, a Outono Dourado nasceu do sonho de uma família 
                apaixonada pela natureza e comprometida com o meio ambiente. Logo a empresa foi passada 
                para seus descendentes que atualizaram e modernizaram a estrutura. Começamos pequenos, 
                com a visão de oferecer produtos sustentáveis que fazem a diferença na vida das 
                pessoas e do planeta.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Hoje, somos referência em produtos ecológicos na região metropolitana de Curitiba, 
                atendendo famílias que compartilham dos nossos valores de sustentabilidade e 
                responsabilidade ambiental.
              </p>
            </div>

            {/* Valores */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-[#F6B61E] p-2 rounded-full">
                      <Target className="h-6 w-6 text-[#DF760B]" />
                    </div>
                    <h4 className="font-semibold text-[rgba(246,182,30,1)]">Missão</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Promover um estilo de vida sustentável através de produtos ecológicos de qualidade
                  </p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-[#F6B61E] p-2 rounded-full">
                      <Heart className="h-6 w-6 text-[#DF760B]" />
                    </div>
                    <h4 className="font-semibold text-[rgba(246,182,30,1)]">Valores</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Sustentabilidade, qualidade, transparência e respeito ao meio ambiente
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Localização */}
            <Card className="border-orange-200 bg-orange-50/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-[#F6B61E] p-2 rounded-full">
                    <MapPin className="h-6 w-6 text-[#DF760B]" />
                  </div>
                  <h4 className="font-semibold text-[rgba(246,182,30,1)]">Localização</h4>
                </div>
                <p className="text-gray-700">
                  <strong>Araucária, Paraná</strong> - No coração da região metropolitana de Curitiba, 
                  atendemos toda a região com produtos que respeitam o meio ambiente paranaense.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={historicImage}
                alt="Casa histórica de madeira com comunidade reunida - origem da Outono Dourado"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <Card className="absolute -bottom-6 -left-6 bg-white shadow-xl border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#DF760B] p-3 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[rgba(246,182,30,1)]">500+</p>
                    <p className="text-sm text-gray-600">Famílias Atendidas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}