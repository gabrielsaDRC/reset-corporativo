# 🚀 Guia de Deploy para GitHub Pages com Supabase

Este guia te ajudará a fazer o deploy seguro da sua aplicação no GitHub Pages, mantendo as credenciais do Supabase protegidas.

## 📋 Pré-requisitos

1. **Conta no GitHub** - Para hospedar o código e usar GitHub Pages
2. **Projeto Supabase** - Com as tabelas já configuradas
3. **Git instalado** - Para versionamento do código

## 🔧 Configuração do Supabase

### 1. Obter as Credenciais do Supabase

1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Anote as seguintes informações:
   - **Project URL** (algo como: `https://xxxxxxxxxxx.supabase.co`)
   - **Anon/Public Key** (chave pública, segura para usar no frontend)

⚠️ **IMPORTANTE**: Nunca use a `service_role` key no frontend! Use apenas a `anon` key.

### 2. Configurar RLS (Row Level Security)

Certifique-se de que o RLS está habilitado e as políticas estão corretas:

```sql
-- Verificar se RLS está habilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Se necessário, habilitar RLS
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

## 🐙 Configuração do GitHub

### 1. Criar Repositório

1. Acesse [GitHub](https://github.com)
2. Clique em **New repository**
3. Nomeie seu repositório (ex: `evento-landing-page`)
4. Marque como **Public** (necessário para GitHub Pages gratuito)
5. Clique em **Create repository**

### 2. Configurar Secrets

1. No seu repositório, vá em **Settings** → **Secrets and variables** → **Actions**
2. Clique em **New repository secret**
3. Adicione os seguintes secrets:

| Nome | Valor | Descrição |
|------|-------|-----------|
| `VITE_SUPABASE_URL` | `https://xxxxxxxxxxx.supabase.co` | URL do seu projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Chave pública do Supabase |

### 3. Habilitar GitHub Pages

1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Salve as configurações

## 📤 Deploy da Aplicação

### 1. Preparar o Código Local

```bash
# Clone este projeto (se ainda não fez)
git clone <url-do-seu-repositorio>
cd evento-landing-page

# Instalar dependências
npm install

# Testar localmente (opcional)
npm run dev
```

### 2. Configurar Variáveis Locais (Desenvolvimento)

Crie um arquivo `.env.local` para desenvolvimento:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **NUNCA** commite este arquivo! Ele já está no `.gitignore`.

### 3. Fazer o Deploy

```bash
# Adicionar arquivos ao Git
git add .

# Fazer commit
git commit -m "Initial commit - Landing page do evento"

# Enviar para o GitHub
git push origin main
```

### 4. Verificar o Deploy

1. Vá na aba **Actions** do seu repositório
2. Aguarde o workflow terminar (ícone verde ✅)
3. Acesse **Settings** → **Pages** para ver a URL do site
4. Sua aplicação estará disponível em: `https://seuusuario.github.io/nome-do-repositorio`

## 🔒 Segurança e Boas Práticas

### ✅ O que PODE ser exposto no frontend:
- URL do Supabase (`VITE_SUPABASE_URL`)
- Chave anônima (`VITE_SUPABASE_ANON_KEY`)
- Configurações públicas do evento

### ❌ O que NUNCA deve ser exposto:
- `service_role` key do Supabase
- Senhas de administrador
- Chaves de API de terceiros
- Dados sensíveis dos usuários

### 🛡️ Proteções Implementadas:
- **RLS (Row Level Security)** no Supabase
- **Políticas de acesso** específicas por tabela
- **Autenticação** para área administrativa
- **Validação** de dados no frontend e backend

## 🔄 Atualizações Futuras

Para atualizar o site:

```bash
# Fazer suas alterações no código
# ...

# Commit e push
git add .
git commit -m "Descrição das alterações"
git push origin main
```

O GitHub Actions automaticamente fará o rebuild e deploy!

## 🐛 Solução de Problemas

### Erro: "Failed to fetch"
- Verifique se as URLs do Supabase estão corretas
- Confirme se o RLS está configurado corretamente
- Teste as credenciais no dashboard do Supabase

### Erro: "404 Page Not Found"
- Verifique se o GitHub Pages está habilitado
- Confirme se o workflow do GitHub Actions executou com sucesso
- Aguarde alguns minutos para propagação

### Erro: "Environment variables not found"
- Verifique se os Secrets estão configurados corretamente no GitHub
- Confirme se os nomes dos secrets estão exatos (case-sensitive)

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do GitHub Actions
2. Teste localmente com `npm run dev`
3. Confirme as configurações do Supabase
4. Verifique se todas as migrações foram aplicadas

## 🎉 Pronto!

Sua landing page de evento está agora online e segura! 

**URL do seu site**: `https://seuusuario.github.io/nome-do-repositorio`

### Próximos Passos:
- [ ] Testar todas as funcionalidades online
- [ ] Configurar domínio personalizado (opcional)
- [ ] Monitorar inscrições no painel administrativo
- [ ] Fazer backup regular dos dados