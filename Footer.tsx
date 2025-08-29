import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  MessageCircle,
  Heart
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#DF760B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-[#F6B61E] p-2 rounded-full">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-semibold">Outono Dourado</span>
            </div>
            <p className="text-orange-100 leading-relaxed">
              Produtos sustentáveis para um futuro mais verde. 
              Transformando sua casa e vida com soluções ecológicas de qualidade.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-orange-100 hover:text-white hover:bg-orange-700 p-2"
                onClick={() => window.open('https://facebook.com/outonodourado', '_blank')}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-orange-100 hover:text-white hover:bg-orange-700 p-2"
                onClick={() => window.open('https://instagram.com/outonodourado', '_blank')}
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-orange-100 hover:text-white hover:bg-orange-700 p-2"
                onClick={() => window.open('https://wa.me/5541999991234', '_blank')}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Links Rápidos</h3>
            <ul className="space-y-2 text-orange-100">
              <li>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto font-normal text-orange-100 hover:text-white justify-start"
                  onClick={() => {
                    const element = document.getElementById('home');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Início
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto font-normal text-orange-100 hover:text-white justify-start"
                  onClick={() => {
                    const element = document.getElementById('about');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Sobre Nós
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto font-normal text-orange-100 hover:text-white justify-start"
                  onClick={() => {
                    const element = document.getElementById('products');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Produtos
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto font-normal text-orange-100 hover:text-white justify-start"
                  onClick={() => {
                    const element = document.getElementById('store');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Loja Física
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto font-normal text-orange-100 hover:text-white justify-start"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Contato
                </Button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Categorias</h3>
            <ul className="space-y-2 text-orange-100">
              <li>Produtos de Limpeza</li>
              <li>Decoração Sustentável</li>
              <li>Cuidados Pessoais</li>
              <li>Utensílios de Cozinha</li>
              <li>Acessórios Ecológicos</li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contato</h3>
            <div className="space-y-2 text-orange-100">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(41) 3642-1234</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@outonodourado.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Araucária, PR</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Newsletter</h4>
              <p className="text-sm text-orange-200">
                Receba dicas de sustentabilidade e promoções!
              </p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Seu e-mail"
                  className="bg-orange-700 border-orange-600 text-white placeholder:text-orange-200 focus:border-orange-400"
                />
                <Button 
                  size="sm"
                  className="bg-[#DF760B] hover:bg-orange-500 text-white"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-orange-700" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-orange-200 text-sm">
            © 2024 Outono Dourado. Todos os direitos reservados.
          </div>
          
          <div className="flex items-center space-x-1 text-orange-200 text-sm">
            <span>Feito com</span>
            <Heart className="h-4 w-4 text-red-400 fill-current" />
            <span>em Araucária, Paraná</span>
          </div>
        </div>
      </div>
    </footer>
  );
}