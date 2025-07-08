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
2. Em **Source**, selecione **Deploy from a branch**
3. Selecione a branch **gh-pages** 
4. Selecione a pasta **/ (root)**
3. Salve as configurações

**Importante**: Se a opção **gh-pages** não aparecer, execute o workflow uma vez primeiro indo em **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

## 📤 Deploy da Aplicação

### Método 1: Deploy Automático via GitHub Actions (Recomendado)

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
# Primeiro, certifique-se de que o repositório está atualizado
git pull origin main

# Adicionar arquivos ao Git
git add .

# Fazer commit
git commit -m "Fix: Configuração correta para GitHub Pages"

# Enviar para o GitHub
git push origin main
```

### 4. Verificar o Deploy

1. Vá na aba **Actions** do seu repositório
2. Aguarde o workflow terminar (ícone verde ✅)
3. Após o workflow terminar, vá em **Settings** → **Pages**
4. Configure **Source** como **Deploy from a branch** e selecione **gh-pages**
5. Sua aplicação estará disponível em: `https://gabrielsadrc.github.io/reset-corporativo`

**Nota**: Pode levar alguns minutos para o site ficar disponível após o primeiro deploy.

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

### Método 2: Deploy Manual via npm (Alternativo)

Se preferir fazer deploy diretamente do seu ambiente local:

```bash
# Fazer deploy direto para GitHub Pages
npm run deploy
```

Este comando irá:
1. Fazer o build da aplicação
2. Criar/atualizar a branch gh-pages
3. Fazer push dos arquivos compilados
4. Atualizar automaticamente o GitHub Pages

**Vantagens do deploy manual:**
- Mais rápido (não precisa esperar o GitHub Actions)
- Controle total sobre quando fazer deploy
- Útil para testes rápidos

**Desvantagens:**
- Precisa rodar localmente
- Não mantém histórico no GitHub Actions
- Requer que você tenha o ambiente configurado

## 🐛 Solução de Problemas

### Erro: "Failed to fetch"
- Verifique se as URLs do Supabase estão corretas
- Confirme se o RLS está configurado corretamente
- Teste as credenciais no dashboard do Supabase

### Erro: "404 Page Not Found"
- Verifique se o GitHub Pages está configurado para usar a branch **gh-pages**
- Confirme se o workflow do GitHub Actions executou com sucesso (ícone verde)
- Aguarde alguns minutos para propagação (pode levar até 10 minutos)
- Verifique se a URL está correta: `https://gabrielsadrc.github.io/reset-corporativo`

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
**URL do seu site**: `https://gabrielsadrc.github.io/reset-corporativo`

### Como usar:

**Para desenvolvimento:**
```bash
npm run dev  # Servidor local
```

**Para deploy:**
```bash
npm run deploy  # Deploy direto para GitHub Pages
```

**Para build apenas:**
```bash
npm run build  # Gera arquivos na pasta dist/
```

### Próximos Passos:
- [ ] Testar todas as funcionalidades online
- [ ] Configurar domínio personalizado (opcional)
- [ ] Monitorar inscrições no painel administrativo
- [ ] Fazer backup regular dos dados