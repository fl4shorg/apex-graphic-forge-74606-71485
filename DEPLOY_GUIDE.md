# 🚀 Guia Completo de Deploy no Render

## Passo 1: Preparar o Repositório

Certifique-se de que seu código está no GitHub:

```bash
git add .
git commit -m "API pronta para deploy"
git push origin main
```

## Passo 2: Criar Web Service no Render

1. Acesse [https://render.com](https://render.com)
2. Faça login (ou crie uma conta gratuita)
3. Clique no botão **"New +"** no canto superior direito
4. Selecione **"Web Service"**

## Passo 3: Conectar o Repositório

1. Clique em **"Connect a repository"**
2. Autorize o Render a acessar sua conta do GitHub
3. Selecione o repositório do seu projeto
4. Clique em **"Connect"**

## Passo 4: Configurar o Serviço

Preencha os campos:

### Informações Básicas
- **Name**: `neext-banner-api` (ou qualquer nome que preferir)
- **Region**: Escolha a região mais próxima (ex: `Ohio (US East)`)
- **Branch**: `main` (ou a branch que está usando)
- **Root Directory**: Deixe em branco (ou `.`)

### Build & Deploy
- **Runtime**: `Node`
- **Build Command**: 
  ```
  cd server && npm install
  ```
- **Start Command**: 
  ```
  cd server && node index.js
  ```

### Plano
- Selecione **"Free"** (gratuito, mas dorme após 15 min de inatividade)
- Ou **"Starter"** ($7/mês, sempre ativo)

### Variáveis de Ambiente (opcional)
Você pode deixar vazio, o Render injeta automaticamente a variável `PORT`

## Passo 5: Deploy

1. Clique em **"Create Web Service"** no final da página
2. O Render começará a fazer o deploy automaticamente
3. Aguarde 2-5 minutos (você verá os logs em tempo real)
4. Quando aparecer "Live" em verde, seu serviço está no ar! 🎉

## Passo 6: Copiar a URL

Após o deploy, você verá a URL do seu serviço no topo da página:
```
https://neext-banner-api.onrender.com
```

## 🧪 Como Testar com cURL

### Teste 1: Página Inicial (Informações da API)
```bash
curl https://neext-banner-api.onrender.com/
```

**Resposta esperada:**
```json
{
  "name": "NEEXT Banner API",
  "version": "1.0.0",
  "status": "online",
  "endpoints": {
    "health": {...},
    "generateBanner": {...}
  }
}
```

### Teste 2: Health Check
```bash
curl https://neext-banner-api.onrender.com/health
```

**Resposta esperada:**
```json
{"status":"ok"}
```

### Teste 3: Gerar Banner Simples
```bash
curl "https://neext-banner-api.onrender.com/api/banner?name=TESTE&speed=100&label=PING"
```

**Resposta esperada:**
```json
{
  "success": true,
  "url": "https://files.catbox.moe/abc123.png"
}
```

### Teste 4: Banner com Imagens
```bash
curl "https://neext-banner-api.onrender.com/api/banner?name=PLAYER&speed=50&label=MS&avatar=https://i.imgur.com/exemplo.png&wallpaper=https://i.imgur.com/fundo.jpg"
```

### Teste 5: Banner Completo
```bash
curl "https://neext-banner-api.onrender.com/api/banner?name=NEEXT&speed=999&label=VELOCIDADE&datetime=16/10/2025%20-%2020:30&avatar=https://i.imgur.com/perfil.png"
```

**Nota:** Use `%20` para espaços e `%2F` para barras na URL.

## 🔧 Testando Localmente Antes do Deploy

```bash
# Entre na pasta do servidor
cd server

# Instale as dependências
npm install

# Rode o servidor
node index.js
```

Agora teste localmente:
```bash
curl "http://localhost:3001/health"
curl "http://localhost:3001/api/banner?name=LOCAL&speed=OK"
```

## 📊 Monitoramento no Render

Após o deploy, você pode:

1. **Ver Logs**: Aba "Logs" - veja todas as requisições e erros
2. **Métricas**: Aba "Metrics" - uso de CPU e memória
3. **Eventos**: Aba "Events" - histórico de deploys

## 🔄 Fazer Update/Redeploy

Sempre que você fizer um `git push` para a branch `main`, o Render automaticamente:
1. Detecta as mudanças
2. Faz rebuild
3. Redeploy automático

Ou você pode fazer deploy manual:
1. Vá na aba "Manual Deploy"
2. Clique em "Deploy latest commit"

## ⚠️ Troubleshooting

### "Service Unavailable" ou "Failed to deploy"
- Verifique os logs na aba "Logs"
- Certifique-se que `cd server && npm install` rodou com sucesso
- Verifique se as dependências estão no `server/package.json`

### "Port already in use"
- Não deve acontecer no Render (eles gerenciam as portas)
- Se testar localmente, mude: `PORT=4000 node index.js`

### Imagem não carrega
- Verifique se a URL da imagem é HTTPS
- Verifique se a extensão é válida (.jpg, .png, .gif, .webp)
- Teste a URL da imagem direto no navegador

## 💰 Custos

### Plano Free (Gratuito)
- ✅ Perfeito para testes
- ⚠️ Dorme após 15 minutos de inatividade
- ⚠️ Primeira requisição após dormir demora ~30s para acordar
- ✅ 750 horas/mês grátis

### Plano Starter ($7/mês)
- ✅ Sempre ativo
- ✅ Resposta instantânea
- ✅ Melhor para produção

## 🎯 Exemplo Completo: Do Zero ao Deploy

```bash
# 1. Teste localmente
cd server
npm install
node index.js

# Em outro terminal, teste
curl "http://localhost:3001/health"

# 2. Commit e push
git add .
git commit -m "API pronta"
git push origin main

# 3. Acesse render.com e configure como descrito acima

# 4. Aguarde deploy finalizar

# 5. Teste em produção
curl "https://seu-servico.onrender.com/health"
curl "https://seu-servico.onrender.com/api/banner?name=PROD&speed=LIVE"
```

## 🌐 Usando em Bot Discord

```javascript
const axios = require('axios');

// Gerar banner
const response = await axios.get('https://seu-servico.onrender.com/api/banner', {
  params: {
    name: interaction.user.username,
    speed: '45',
    label: 'PING MS'
  }
});

// Enviar banner
await interaction.reply({
  content: 'Seu banner:',
  files: [response.data.url]
});
```

## 📝 Dicas

1. **Primeira requisição é lenta no plano Free**: Aguarde ~30s se o serviço estava dormindo
2. **Use HTTPS**: URLs HTTP não funcionam
3. **Encode URL**: Espaços e caracteres especiais precisam ser codificados na URL
4. **Monitore os logs**: Aba "Logs" no Render mostra tudo em tempo real
5. **Custom Domain**: No plano pago você pode adicionar seu próprio domínio

Pronto! Sua API está no ar! 🚀
