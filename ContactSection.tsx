import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, MessageCircle, Navigation, Plus, Minus, Sprout, Leaf } from 'lucide-react';
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success("Mensagem enviada com sucesso! Retornaremos em breve.");
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 bg-[#D9C4B0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#DF760B] mb-4">Entre em Contato</h2>
          <p className="text-xl text-[#DF760B] max-w-2xl mx-auto">
            Estamos aqui para ajudar! Entre em contato conosco para dúvidas, 
            sugestões ou para saber mais sobre nossos produtos sustentáveis
          </p>
        </div>

        {/* Contact Info Cards - Similar to the image style */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Entre em Contato */}
          <Card className="border-orange-200 bg-[#DF760B] text-white text-center">
            <CardContent className="p-8">
              <div className="mb-4">
                <Mail className="h-12 w-12 mx-auto text-[#F6B61E]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Entre em Contato</h3>
              <p className="text-orange-100 mb-4 leading-relaxed">
                Tem perguntas sobre nossos produtos? Quer saber mais sobre sustentabilidade? Entre em contato conosco! 
                Estamos aqui para te ajudar a encontrar os produtos ideais para suas necessidades.
              </p>
            </CardContent>
          </Card>

          {/* Envie-nos um E-mail */}
          <Card className="border-orange-200 bg-[#DF760B] text-white text-center">
            <CardContent className="p-8">
              <div className="mb-4">
                <Send className="h-12 w-12 mx-auto text-[#F6B61E]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Envie-nos um E-mail</h3>
              <p className="text-orange-100 mb-4 leading-relaxed">
                Nos envie um e-mail para contato@outonodourado.com.br ou preencha nosso formulário. Nosso time irá 
                responder prontamente a todas as mensagens.
              </p>
            </CardContent>
          </Card>

          {/* Ligue-nos */}
          <Card className="border-orange-200 bg-[#DF760B] text-white text-center">
            <CardContent className="p-8">
              <div className="mb-4">
                <Phone className="h-12 w-12 mx-auto text-[#F6B61E]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Ligue-nos</h3>
              <p className="text-orange-100 mb-4 leading-relaxed">
                Prefere falar diretamente? Ligue para +55 (41) 3642-1234 ou mande uma mensagem no WhatsApp durante 
                o horário de expediente para te ajudar.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="border-orange-200 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-[#DF760B] mb-6">Envie sua Mensagem</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-orange-200 focus:border-orange-400"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-orange-200 focus:border-orange-400"
                      placeholder="(41) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-orange-200 focus:border-orange-400"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Assunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="border-orange-200 focus:border-orange-400"
                    placeholder="Como podemos ajudar?"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="border-orange-200 focus:border-orange-400"
                    placeholder="Digite sua mensagem aqui..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#DF760B] hover:bg-orange-700 text-white"
                  size="lg"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F6B61E] p-3 rounded-full">
                    <Phone className="h-6 w-6 text-[#DF760B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#DF760B] mb-2">Telefone e WhatsApp</h3>
                    <p className="text-gray-700 mb-2">(41) 3642-1234</p>
                    <p className="text-gray-700 mb-3">(41) 99999-1234</p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-orange-200 text-[#DF760B] hover:bg-orange-50"
                      onClick={() => window.open('https://wa.me/5541999991234', '_blank')}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F6B61E] p-3 rounded-full">
                    <Mail className="h-6 w-6 text-[#DF760B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#DF760B] mb-2">E-mail</h3>
                    <p className="text-gray-700 mb-3">contato@outonodourado.com.br</p>
                    <p className="text-gray-700 mb-3">vendas@outonodourado.com.br</p>
                    <p className="text-sm text-gray-500">
                      Respondemos em até 24h úteis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F6B61E] p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-[#DF760B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#DF760B] mb-2">Endereço</h3>
                    <p className="text-gray-700 mb-3">
                      1698 Av. João Gualberto<br />
                      Curitiba - PR<br />
                      CEP: 80030-000
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-orange-200 text-[#DF760B] hover:bg-orange-50"
                      onClick={() => window.open('https://maps.app.goo.gl/62FrNUfhoJcqwNjGA', '_blank')}
                    >
                      Ver no Mapa
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-[#F6B61E]">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#DF760B] mb-4">Redes Sociais</h3>
                <p className="text-gray-700 mb-4">
                  Siga-nos nas redes sociais para dicas de sustentabilidade, 
                  promoções especiais e novidades!
                </p>
                <div className="flex space-x-4">
                  <Button 
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.open('https://facebook.com/outonodourado', '_blank')}
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-pink-600 hover:bg-pink-700 text-white"
                    onClick={() => window.open('https://instagram.com/outonodourado', '_blank')}
                  >
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#DF760B] mb-3">Newsletter</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  Receba dicas de sustentabilidade e promoções exclusivas!
                </p>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Seu e-mail"
                    className="border-orange-200 focus:border-orange-400"
                  />
                  <Button 
                    size="sm"
                    className="bg-[#DF760B] hover:bg-orange-700 text-white"
                  >
                    Inscrever
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="relative">
        <div className="bg-white py-4 border-t border-orange-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600">📍 Venha nos visitar em Curitiba, Paraná</p>
          </div>
        </div>
        
        {/* Google Maps Interactive Container */}
        <div className="relative h-[500px] bg-gray-100 overflow-hidden">
          {/* Google Maps Iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.8914847892453!2d-49.2662851!3d-25.4344312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce35351cdb3dd%3A0x6d2f6b23b6b5a8c7!2sAv.%20Jo%C3%A3o%20Gualberto%2C%201698%20-%20Alto%20da%20Gl%C3%B3ria%2C%20Curitiba%20-%20PR!5e0!3m2!1spt-BR!2sbr!4v1675123456789!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Outono Dourado - 1698 Av. João Gualberto, Curitiba, PR"
            className="w-full h-full"
          />

          {/* Custom Overlay with Store Info */}
          <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4 border border-orange-200 max-w-xs">
            <div className="flex items-start space-x-3">
              <div className="bg-[#F6B61E] p-2 rounded-full flex-shrink-0">
                <MapPin className="h-5 w-5 text-[#DF760B]" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-[#DF760B] mb-1">Outono Dourado</h4>
                <p className="text-sm text-gray-600">1698 Av. João Gualberto</p>
                <p className="text-sm text-gray-600">Curitiba - PR</p>
                <p className="text-xs text-gray-500 mt-2">📞 (41) 3642-1234</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-4 left-4 z-10 flex space-x-2">
            <Button 
              className="bg-[#DF760B] hover:bg-orange-700 text-white shadow-lg"
              onClick={() => window.open('https://maps.app.goo.gl/62FrNUfhoJcqwNjGA', '_blank')}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Como Chegar
            </Button>
            <Button 
              variant="outline"
              className="bg-white shadow-lg border-gray-200 hover:bg-gray-50"
              onClick={() => window.open('https://wa.me/5541999991234', '_blank')}
            >
              <Phone className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Full Screen Map Button */}
          <div className="absolute top-4 right-4 z-10">
            <Button 
              variant="outline"
              size="sm"
              className="bg-white shadow-lg border-gray-200 hover:bg-gray-50"
              onClick={() => window.open('https://maps.app.goo.gl/62FrNUfhoJcqwNjGA', '_blank')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Expandir
            </Button>
          </div>
        </div>
      </div>

      {/* Seeds and Plantation Gallery Section */}
      <div className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sprout className="h-8 w-8 text-[#DF760B]" />
              <h2 className="text-4xl font-bold text-[#DF760B]">Do Plantio à Colheita</h2>
              <Leaf className="h-8 w-8 text-[#DF760B]" />
            </div>
            <p className="text-xl text-[#DF760B] max-w-3xl mx-auto">
              Conheça nossa jornada sustentável: desde as sementes orgânicas até as plantações que 
              geram os produtos que chegam até você
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Seed Image 1 */}
            <Card className="border-orange-200 overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1559660499-41de8b38a6b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc2VlZHMlMjBzdXN0YWluYWJsZSUyMGZhcm1pbmd8ZW58MXx8fHwxNzU1Nzc2Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Sementes orgânicas sustentáveis"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="bg-[#F6B61E] p-2 rounded-full">
                    <Sprout className="h-5 w-5 text-[#DF760B]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#DF760B]">Sementes Orgânicas</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Selecionamos cuidadosamente sementes orgânicas de alta qualidade para garantir 
                  produtos sustentáveis e livres de agrotóxicos.
                </p>
              </CardContent>
            </Card>

            {/* Seed Image 2 */}
            <Card className="border-orange-200 overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1681313409698-dbe22c68cfce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMHNlZWRzJTIwc3Byb3V0aW5nJTIwZ3Jvd3RofGVufDF8fHx8MTc1NTc3NjY5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Sementes germinando e crescendo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="bg-[#F6B61E] p-2 rounded-full">
                    <Sprout className="h-5 w-5 text-[#DF760B]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#DF760B]">Germinação Natural</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Acompanhamos cada etapa do crescimento, desde a germinação até o desenvolvimento 
                  das mudas, sempre respeitando o tempo natural das plantas.
                </p>
              </CardContent>
            </Card>

            {/* Plantation Image */}
            <Card className="border-orange-200 overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1649620537042-77f0f361d773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGZhcm0lMjBwbGFudGF0aW9uJTIwc3VzdGFpbmFibGUlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTU3NzY2OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Plantação sustentável verde"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="bg-[#F6B61E] p-2 rounded-full">
                    <Leaf className="h-5 w-5 text-[#DF760B]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#DF760B]">Agricultura Sustentável</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Nossas plantações seguem práticas sustentáveis de agricultura, preservando o 
                  meio ambiente e garantindo produtos de qualidade superior.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-200">
              <h3 className="text-2xl font-semibold text-[#DF760B] mb-4">
                Sustentabilidade em Cada Produto
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Cada produto Outono Dourado carrega consigo nossa paixão pela sustentabilidade e 
                cuidado com o meio ambiente. Do plantio ao seu lar, mantemos nosso compromisso 
                com a qualidade e responsabilidade ambiental.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-[#DF760B] hover:bg-orange-700 text-white"
                  onClick={() => {
                    const element = document.getElementById('products');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Leaf className="h-5 w-5 mr-2" />
                  Ver Nossos Produtos
                </Button>
                <Button 
                  variant="outline"
                  className="border-orange-200 text-[#DF760B] hover:bg-orange-50"
                  onClick={() => {
                    const element = document.getElementById('about');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Sprout className="h-5 w-5 mr-2" />
                  Conheça Nossa História
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}