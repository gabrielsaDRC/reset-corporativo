import React, { useState, useEffect } from 'react';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { login, isFirstUser, checkFirstUser } = useApp();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Verificar se é o primeiro usuário quando o componente carrega
  useEffect(() => {
    checkFirstUser();
  }, [checkFirstUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(credentials.email, credentials.password);
      
      if (success) {
        onLoginSuccess();
        // Atualizar status de primeiro usuário após login bem-sucedido
        await checkFirstUser();
      } else {
        setError(isFirstUser ? 'Erro ao criar conta de administrador' : 'Email ou senha inválidos');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FEF3E2' }}>
            <Shield className="w-8 h-8" style={{ color: '#EA9504' }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isFirstUser ? 'Criar Conta Administrativa' : 'Acesso Administrativo'}
          </h2>
          <p className="text-gray-600">
            {isFirstUser 
              ? 'Crie a primeira conta de administrador do sistema'
              : 'Faça login para acessar o painel de controle'
            }
          </p>
        </div>

        {isFirstUser && (
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FEF3E2', borderColor: '#F3E8D1', border: '1px solid' }}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4" style={{ color: '#EA9504' }} />
              <p className="font-medium text-sm" style={{ color: '#92400E' }}>Primeira configuração</p>
            </div>
            <p className="text-sm" style={{ color: '#A16207' }}>
              Como não existe nenhuma conta de administrador, você pode criar a primeira conta agora. 
              Use um email e senha seguros que você lembrará.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#EA9504' } as React.CSSProperties}
                placeholder="Digite seu e-mail"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#EA9504' } as React.CSSProperties}
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white py-3 px-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            style={{ background: 'linear-gradient(to right, #EA9504, #F59E0B)' }}
          >
            {isLoading 
              ? (isFirstUser ? 'Criando conta...' : 'Entrando...') 
              : (isFirstUser ? 'Criar Conta Admin' : 'Entrar')
            }
          </button>
        </form>

        {!isFirstUser && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 text-center">
              <strong>Caso tenha dúvidas, contate um administrador</strong>
            </p>
          </div>
        )}

        {isFirstUser && (
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A', border: '1px solid' }}>
          <p className="text-sm text-gray-600 mb-2">
            <strong>⚠️ Importante:</strong>
          </p>
          <p className="text-sm text-gray-600">
            Anote bem o email e senha que você está criando, pois serão necessários para acessos futuros.
          </p>
          </div>
        )}
      </div>
    </div>
  );
};