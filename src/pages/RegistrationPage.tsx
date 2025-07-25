import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Check, AlertCircle, Gift, CreditCard, ArrowLeft, Building, DollarSign, Briefcase, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { EventPresentation } from '../components/EventPresentation';
import { EventSchedule } from '../components/EventSchedule';
import { Footer } from '../components/Footer';
import { useColors } from '../hooks/useColors';
import { formatCPF, formatPhone, removeCPFMask, removePhoneMask, validateCPF, validatePhone } from '../utils/inputMasks';

interface RegistrationPageProps {
  type: 'gratuita' | 'paga';
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ type }) => {
  const { addParticipant, eventData, error } = useApp();
  const { getFreeButtonGradient, getPremiumButtonGradient, getColorValue } = useColors();
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    genero: '',
    nomeEmpresa: '',
    faturamento: '',
    areaAtuacao: '',
    cidade: '',
    estado: '',
    tipoInscricao: type
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    cpf?: string;
    telefone?: string;
  }>({});

  const inscricaoData = type === 'gratuita' ? eventData.inscricaoGratuita : eventData.inscricaoPaga;
  const isAvailable = inscricaoData.disponivel;
  
  const buttonGradient = type === 'gratuita' ? getFreeButtonGradient() : getPremiumButtonGradient();
  
  const currentColor = type === 'gratuita' ? eventData.cores.gratuita : eventData.cores.premium;
  const customColor = getColorValue(currentColor);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    setValidationErrors({});

    // Validações
    const errors: { cpf?: string; telefone?: string } = {};
    
    if (!validateCPF(formData.cpf)) {
      errors.cpf = 'CPF inválido';
    }
    
    if (!validatePhone(formData.telefone)) {
      errors.telefone = 'Telefone inválido';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const statusPagamento = type === 'paga' ? 'pendente' : 'aprovado';
      
      await addParticipant({
        ...formData,
        cpf: removeCPFMask(formData.cpf),
        telefone: removePhoneMask(formData.telefone),
        statusPagamento,
        confirmadoEvento: false
      });

      setSuccess(true);
      
      // Se for inscrição paga, redirecionar para o link de pagamento após 2 segundos
      if (type === 'paga' && eventData.linkPagamento) {
        setTimeout(() => {
          window.open(eventData.linkPagamento, '_blank');
        }, 2000);
      }
      
      // Reset form after success (mais tempo para inscrição paga)
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          nome: '',
          cpf: '',
          email: '',
          telefone: '',
          dataNascimento: '',
          genero: '',
          nomeEmpresa: '',
          faturamento: '',
          areaAtuacao: '',
          cidade: '',
          estado: '',
          tipoInscricao: type
        });
      }, type === 'paga' ? 5000 : 3000);
    } catch (err) {
      // Mostrar a mensagem de erro específica do serviço
      const errorMessage = err instanceof Error ? err.message : 'Erro ao realizar inscrição. Tente novamente.';
      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Limpar erros de validação quando o usuário começar a digitar
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    let formattedValue = value;
    
    // Aplicar máscaras
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'telefone') {
      formattedValue = formatPhone(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
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
            
            {type === 'paga' && eventData.linkPagamento && (
              <div 
                className="p-4 rounded-lg mb-6"
                style={{ backgroundColor: `${customColor}10`, borderColor: `${customColor}40`, border: '2px solid' }}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <CreditCard className="w-5 h-5" style={{ color: customColor }} />
                  <h4 className="font-semibold" style={{ color: customColor }}>
                    Redirecionamento para Pagamento
                  </h4>
                </div>
                <p className="text-sm text-center" style={{ color: `${customColor}CC` }}>
                  Você será redirecionado automaticamente para a página de pagamento em alguns segundos...
                </p>
                <div className="mt-3 text-center">
                  <a
                    href={eventData.linkPagamento}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
                    style={{ backgroundColor: customColor }}
                  >
                    Ir para Pagamento Agora
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
            
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                        validationErrors.cpf 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300'
                      }`}
                      style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                      placeholder="000.000.000-00"
                      maxLength={14}
                    />
                    {validationErrors.cpf && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.cpf}</p>
                    )}
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
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                          validationErrors.telefone 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                      />
                    </div>
                    {validationErrors.telefone && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.telefone}</p>
                    )}
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
                      Nome da Empresa
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="nomeEmpresa"
                        value={formData.nomeEmpresa}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Faturamento da Empresa
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <select
                        name="faturamento"
                        value={formData.faturamento}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                      >
                        <option value="">Selecione o faturamento</option>
                        <option value="ate-100k">Até R$ 100 mil</option>
                        <option value="100k-500k">R$ 100 mil - R$ 500 mil</option>
                        <option value="500k-1m">R$ 500 mil - R$ 1 milhão</option>
                        <option value="1m-5m">R$ 1 milhão - R$ 5 milhões</option>
                        <option value="5m-10m">R$ 5 milhões - R$ 10 milhões</option>
                        <option value="acima-10m">Acima de R$ 10 milhões</option>
                        <option value="nao-informar">Prefiro não informar</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Área de Atuação/Negócio
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <select
                        name="areaAtuacao"
                        value={formData.areaAtuacao}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': customColor } as React.CSSProperties}
                      >
                        <option value="">Selecione a área de atuação</option>
                        <option value="tecnologia">Tecnologia</option>
                        <option value="saude">Saúde</option>
                        <option value="educacao">Educação</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="varejo">Varejo</option>
                        <option value="industria">Indústria</option>
                        <option value="servicos">Serviços</option>
                        <option value="consultoria">Consultoria</option>
                        <option value="marketing">Marketing</option>
                        <option value="recursos-humanos">Recursos Humanos</option>
                        <option value="logistica">Logística</option>
                        <option value="agronegocio">Agronegócio</option>
                        <option value="construcao">Construção</option>
                        <option value="alimenticio">Alimentício</option>
                        <option value="turismo">Turismo</option>
                        <option value="imobiliario">Imobiliário</option>
                        <option value="energia">Energia</option>
                        <option value="telecomunicacoes">Telecomunicações</option>
                        <option value="governo">Governo/Público</option>
                        <option value="ong">ONG/Terceiro Setor</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>
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
                      Após confirmar sua inscrição, você será redirecionado para a página de pagamento.
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