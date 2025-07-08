# 🚀 Guia de Deploy para Domínio Personalizado com GitHub Pages

Este guia te ajudará a configurar o deploy da aplicação no GitHub Pages com domínio personalizado `www.resetcorporativo.com`.

## 📋 Pré-requisitos

1. **Conta no GitHub** - Para hospedar o código e usar GitHub Pages
2. **Projeto Supabase** - Com as tabelas já configuradas
3. **Domínio registrado** - `resetcorporativo.com`
4. **Git instalado** - Para versionamento do código

## 🌐 Configuração do Domínio

### 1. Configurar DNS do Domínio

No painel do seu provedor de domínio, configure os seguintes registros DNS:

```
Tipo: CNAME
Nome: www
Valor: gabrielsadrc.github.io

Tipo: A (para o domínio raiz, opcional)
Nome: @
Valor: 185.199.108.153
Valor: 185.199.109.153
Valor: 185.199.110.153
Valor: 185.199.111.153
```

### 2. Configurar GitHub Pages

1. No seu repositório GitHub, vá em **Settings** → **Pages**
2. Em **Source**, selecione **Deploy from a branch**
3. Selecione a branch **gh-pages**
4. Em **Custom domain**, digite: `www.resetcorporativo.com`
5. Marque **Enforce HTTPS** (recomendado)
6. Clique em **Save**

## 🔧 Configuração do Supabase

### 1. Obter as Credenciais do Supabase

1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Anote as seguintes informações:
   - **Project URL** (algo como: `https://xxxxxxxxxxx.supabase.co`)
   - **Anon/Public Key** (chave pública, segura para usar no frontend)

⚠️ **IMPORTANTE**: Nunca use a `service_role` key no frontend! Use apenas a `anon` key.

### 2. Configurar Secrets no GitHub

1. No seu repositório, vá em **Settings** → **Secrets and variables** → **Actions**
2. Clique em **New repository secret**
3. Adicione os seguintes secrets:

| Nome | Valor | Descrição |
|------|-------|-----------|
| `VITE_SUPABASE_URL` | `https://xxxxxxxxxxx.supabase.co` | URL do seu projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Chave pública do Supabase |

## 📤 Deploy da Aplicação

### Método 1: Deploy Automático via GitHub Actions (Recomendado)

```bash
# Clone o repositório
git clone <url-do-seu-repositorio>
cd reset-corporativo

# Instalar dependências
npm install

# Testar localmente
npm run dev

# Fazer commit e push
git add .
git commit -m "Configure custom domain and deploy settings"
git push origin main
```

### Método 2: Deploy Manual

```bash
# Deploy direto para GitHub Pages
npm run deploy
```

## 🔍 Verificação do Deploy

### 1. Verificar GitHub Actions
1. Vá na aba **Actions** do seu repositório
2. Aguarde o workflow terminar (ícone verde ✅)

### 2. Verificar DNS
```bash
# Verificar se o DNS está propagado
nslookup www.resetcorporativo.com
```

### 3. Testar o Site
- **Domínio personalizado**: `http://www.resetcorporativo.com/`
- **GitHub Pages**: `https://gabrielsadrc.github.io/reset-corporativo/`

## 🎯 URLs Finais

### ✅ **URLs que funcionarão:**
- `http://www.resetcorporativo.com/` (principal)
- `https://www.resetcorporativo.com/` (com HTTPS)
- `https://gabrielsadrc.github.io/reset-corporativo/` (backup)

### 📱 **Páginas disponíveis:**
- `/` - Página principal
- `/inscricao-gratuita` - Inscrição gratuita
- `/inscricao-premium` - Inscrição premium
- `/administrativo` - Painel administrativo

## 🔧 **Solução para Roteamento SPA**

Para resolver o problema de 404 em rotas diretas (como `/administrativo`), implementamos:

1. **Arquivo 404.html**: Redireciona automaticamente para a SPA
2. **Script no main.tsx**: Processa os redirecionamentos
3. **Configuração no Vite**: Copia arquivos necessários

### Como funciona:
- Usuário acessa `www.resetcorporativo.com/administrativo`
- GitHub Pages não encontra o arquivo e serve `404.html`
- Script redireciona para `www.resetcorporativo.com/?/administrativo`
- React Router processa a rota corretamente

## 🔒 Segurança e SEO

### ✅ **Configurações implementadas:**
- **CNAME** configurado para domínio personalizado
- **Meta tags** otimizadas para SEO
- **Open Graph** para redes sociais
- **Robots.txt** para indexação
- **Sitemap.xml** para motores de busca
- **Favicon** personalizado

### 🛡️ **Proteções de segurança:**
- **RLS (Row Level Security)** no Supabase
- **Políticas de acesso** específicas por tabela
- **Autenticação** para área administrativa
- **HTTPS** enforçado (recomendado)

## 🔄 Atualizações Futuras

Para atualizar o site:

```bash
# Fazer suas alterações no código
git add .
git commit -m "Descrição das alterações"
git push origin main
```

O deploy será automático via GitHub Actions!

## 🐛 Solução de Problemas

### DNS não propagou
- Aguarde até 24-48 horas para propagação completa
- Use ferramentas como `dig` ou `nslookup` para verificar

### Site não carrega no domínio personalizado
1. Verifique se o arquivo `CNAME` está na pasta `public/`
2. Confirme a configuração DNS no provedor
3. Verifique se o GitHub Pages está configurado corretamente

### Erro 404 em páginas internas
- O React Router está configurado para funcionar com GitHub Pages
- Certifique-se de que o `base` está configurado como `'/'`

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do GitHub Actions
2. Teste localmente com `npm run dev`
3. Confirme as configurações DNS
4. Verifique se o Supabase está funcionando

## 🎉 Pronto!

Sua landing page estará disponível em:

**🌐 Domínio Principal**: `http://www.resetcorporativo.com/`

### Próximos Passos:
- [ ] Configurar SSL/HTTPS no GitHub Pages
- [ ] Testar todas as funcionalidades no domínio personalizado
- [ ] Configurar Google Analytics (opcional)
- [ ] Configurar Google Search Console (opcional)
- [ ] Monitorar inscrições no painel administrativo