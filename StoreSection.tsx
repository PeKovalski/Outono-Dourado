import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Clock, Phone, Camera } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import seedInteriorImage from 'figma:asset/013c541049f2237a7f6e0dee25749a15d2f709cb.png';
import seedBuildingImage from 'figma:asset/feceefb3149a55a7899c4461846aab9d4e16fecd.png';
import seedBackImage from 'figma:asset/51ff2de07460fef9dab98bb21b16256ea11eaf53.png';
import newSeedBuildingImage from 'figma:asset/2a90123a48d09a05ced4b1ddf982577ebc66d2cc.png';

export function StoreSection() {
  return (
    <section id="store" className="py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#DF760B] mb-4">Nossas Lojas Físicas</h2>
          <p className="text-xl text-[#DF760B] max-w-2xl mx-auto">
            Venha nos visitar em Araucária ou Curitiba! Nossas lojas físicas oferecem uma experiência única 
            com todos os nossos produtos sustentáveis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Store Information */}
          <div className="space-y-6">
            {/* Address - Loja Ectares */}
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F6B61E] p-3 rounded-full flex-shrink-0">
                    <MapPin className="h-6 w-6 text-[#DF760B]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#DF760B] mb-2">Loja Ectares</h3>
                    <p className="text-gray-700 mb-3">
                      R. Eng. Antônio Claret Karas<br />
                      Araucária - PR<br />
                      CEP: 83702-000
                    </p>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-orange-200 text-[#DF760B] hover:bg-orange-50"
                      onClick={() => window.open('https://www.google.com/maps/place/R.+Eng.+Ant%C3%B4nio+Claret+Karas+-+Arauc%C3%A1ria,+PR/@-25.6848772,-49.4186732,17z/data=!3m1!4b1!4m6!3m5!1s0x94dd008571a186a1:0x24ea509cd0a7da44!8m2!3d-25.6848821!4d-49.4160983!16s%2Fg%2F11krpdcmx7?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D', '_blank')}
                    >
                      Ver no Mapa
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address - Loja Seed */}
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F6B61E] p-3 rounded-full flex-shrink-0">
                    <MapPin className="h-6 w-6 text-[#DF760B]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#DF760B] mb-2">Loja Seed</h3>
                    <p className="text-gray-700 mb-3">
                      1698 Av. João Gualberto<br />
                      Curitiba - PR<br />
                      CEP: 80030-000
                    </p>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-orange-200 text-[#DF760B] hover:bg-orange-50"
                      onClick={() => window.open('https://maps.app.goo.gl/62FrNUfhoJcqwNjGA', '_blank')}
                    >
                      Ver no Mapa
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F6B61E] p-3 rounded-full flex-shrink-0">
                    <Clock className="h-6 w-6 text-[#DF760B]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#DF760B] mb-3">Horário de Funcionamento</h3>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between">
                        <span>Segunda a Sexta:</span>
                        <span className="font-medium">9h às 18h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sábado:</span>
                        <span className="font-medium">9h às 16h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domingo:</span>
                        <span className="font-medium text-red-600">Fechado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F6B61E] p-3 rounded-full flex-shrink-0">
                    <Phone className="h-6 w-6 text-[#DF760B]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#DF760B] mb-2">Contato das Lojas</h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Telefone Geral:</strong> (41) 3642-1234
                    </p>
                    <p className="text-gray-700 mb-3">
                      <strong>WhatsApp:</strong> (41) 99999-1234
                    </p>
                    <Button 
                      size="sm"
                      className="bg-[#DF760B] hover:bg-orange-700 text-white"
                      onClick={() => window.open('https://wa.me/5541999991234', '_blank')}
                    >
                      Chamar no WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Store Images */}
          <div className="space-y-6">
            {/* Main Store Image */}
            <Card className="overflow-hidden border-orange-200">
              <div className="aspect-[4/3] relative">
                <ImageWithFallback
                  src={newSeedBuildingImage}
                  alt="Fachada da SEED - Edifício Sustentável"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4 text-[#DF760B]" />
                      <span className="text-sm font-medium text-[#DF760B]">Fachada da SEED</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="overflow-hidden border-orange-200">
                <div className="aspect-square relative">
                  <ImageWithFallback
                    src={seedInteriorImage}
                    alt="Interior da SEED"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                    Interior da SEED
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden border-orange-200">
                <div className="aspect-square relative">
                  <ImageWithFallback
                    src={seedBackImage}
                    alt="Parte de trás da SEED"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                    Parte de Trás da SEED
                  </div>
                </div>
              </Card>
            </div>

            {/* Features */}
            <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-[#F6B61E]">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#DF760B] mb-4">Por que visitar nossa loja?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#DF760B] rounded-full" />
                    <span>Veja e toque nos produtos antes de comprar</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#DF760B] rounded-full" />
                    <span>Consultoria personalizada com nossa equipe</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#DF760B] rounded-full" />
                    <span>Descontos exclusivos para compras na loja</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#DF760B] rounded-full" />
                    <span>Ambiente sustentável e acolhedor</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}