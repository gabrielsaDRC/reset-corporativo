import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Check, AlertCircle, Gift, CreditCard, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { EventPresentation } from '../components/EventPresentation';
import { EventSchedule } from '../components/EventSchedule';
import { Footer } from '../components/Footer';
import { useColors } from '../hooks/useColors';

interface RegistrationPageProps {
  type: 'gratuita' | 'paga';
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ type }) => {
  const { addParticipant, eventData, error } = useApp();
  const { getFreeButtonGradient, getPremiumButtonGradient } = useColors();
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    genero: '',
    cidade: '',
    estado: '',
    tipoInscricao: type
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const inscricaoData = type === 'gratuita' ? eventData.inscricaoGratuita : eventData.inscricaoPaga;
  const isAvailable = inscricaoData.disponivel;
  
  const buttonGradient = type === 'gratuita' ? getFreeButtonGradient() : getPremiumButtonGradient();
  
  // Obter cores personalizadas
  const colorMap: Record<string, string> = {
    purple: '#9333ea',
    blue: '#2563eb',
    orange: '#ea580c',
    green: '#16a34a',
    red: '#dc2626',
    yellow: '#ca8a04',
    indigo: '#4f46e5',
    pink: '#db2777',
    teal: '#0d9488'
  };
  
  const currentColor = type === 'gratuita' ? eventData.cores.gratuita : eventData.cores.premium;
  const customColor = currentColor.startsWith('#') ? currentColor : (colorMap[currentColor] || colorMap.purple);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      const statusPagamento = type === 'paga' ? 'pendente' : 'aprovado';
      
      await addParticipant({
        ...formData,
        statusPagamento,
        confirmadoEvento: false
      });

      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          nome: '',
          cpf: '',
          email: '',
          telefone: '',
          dataNascimento: '',
          genero: '',
          cidade: '',
          estado: '',
          tipoInscricao: type
        });
      }, 3000);
    } catch (err) {
      setFormError('Erro ao realizar inscrição. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isAvailable) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Inscrições Indisponíveis
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              As inscrições do tipo "{inscricaoData.titulo}" não estão disponíveis no momento.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors hover:opacity-90"
              style={{ backgroundColor: customColor }}
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Evento
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: `${customColor}20` }}
            >
              <Check className="w-10 h-10" style={{ color: customColor }} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Inscrição Realizada!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Sua inscrição foi confirmada com sucesso. Você receberá um e-mail de confirmação em breve.
            </p>
            <div className="p-6 bg-white rounded-lg shadow-sm mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                {type === 'gratuita' ? (
                  <Gift className="w-6 h-6" style={{ color: customColor }} />
                ) : (
                  <CreditCard className="w-6 h-6" style={{ color: customColor }} />
                )}
                <h3 className="text-xl font-semibold text-gray-800">
                  {inscricaoData.titulo}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{inscricaoData.descricao}</p>
              {type === 'paga' && (
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${customColor}10` }}
                >
                  <p className="font-semibold" style={{ color: customColor }}>
                    Valor: R$ {eventData.inscricaoPaga.preco.toFixed(2)}
                  </p>
                  <p className="text-sm" style={{ color: `${customColor}CC` }}>
                    Aguarde as instruções de pagamento por e-mail.
                  </p>
                </div>
              )}
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors hover:opacity-90"
              style={{ backgroundColor: customColor }}
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Evento
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Apresentação do Evento */}
      <EventPresentation />

      {/* Programação do Evento */}
      <EventSchedule />

      {/* Seção de Inscrição Específica */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header da Inscrição */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                {type === 'gratuita' ? (
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: customColor }}
                  >
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                ) : (
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: customColor }}
                  >
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="text-left">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                    {inscricaoData.titulo}
                  </h2>
                  {type === 'paga' && (
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: customColor }}
                    >
                      R$ {eventData.inscricaoPaga.preco.toFixed(2)}
                    </p>
                  )}
                  {type === 'gratuita' && (
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: customColor }}
                    >
                      Gratuito
                    </p>
                  )}
                </div>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {inscricaoData.descricao}
              </p>
            </div>

            {/* Benefícios */}
            <div 
              className="p-8 rounded-xl mb-12"
              style={{
                background: `linear-gradient(to bottom right, ${customColor}10, ${customColor}20)`,
                border: `2px solid ${customColor}40`
              }}
            >
              <h3 
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: `${customColor}DD` }}
              >
                O que está incluído na sua inscrição:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inscricaoData.beneficios.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
                    style={{ borderLeft: `4px solid ${customColor}` }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: customColor }}
                    ></div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulário de Inscrição */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Complete sua Inscrição
                </h3>
                <p className="text-gray-600">
                  Preencha os dados abaixo para garantir sua vaga no evento
                </p>
              </div>

              {(error || formError) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-600">{error || formError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                        placeholder="Digite seu nome completo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CPF *
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                      placeholder="000.000.000-00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone/WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Nascimento
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gênero
                    </label>
                    <select
                      name="genero"
                      value={formData.genero}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                    >
                      <option value="">Selecione</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                      <option value="outro">Outro</option>
                      <option value="nao-informar">Prefiro não informar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cidade *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                        placeholder="Sua cidade"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado *
                    </label>
                    <select
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                    >
                      <option value="">Selecione o estado</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white hover:opacity-90"
                    style={buttonGradient.style}
                  >
                    {isSubmitting ? 'Processando...' : `Confirmar Inscrição ${type === 'paga' ? `- R$ ${eventData.inscricaoPaga.preco.toFixed(2)}` : 'Gratuita'}`}
                  </button>
                </div>

                {type === 'paga' && (
                  <div 
                    className="mt-4 p-4 rounded-lg"
                    style={{ backgroundColor: `${customColor}10` }}
                  >
                    <p 
                      className="text-sm text-center"
                      style={{ color: `${customColor}DD` }}
                    >
                      <strong>Importante:</strong> Após confirmar a inscrição, você receberá as instruções de pagamento por e-mail.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};