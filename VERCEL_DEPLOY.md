# 🚀 Deploy na Vercel - NEEXT Banner Generator

## Pré-requisitos
- Conta na [Vercel](https://vercel.com)
- Repositório GitHub/GitLab conectado (ou CLI da Vercel)

## 📦 Método 1: Deploy via Dashboard (Recomendado)

### Passo 1: Importar Projeto
1. Acesse [vercel.com/new](https://vercel.com/new)
2. Conecte seu repositório GitHub/GitLab
3. Selecione este repositório

### Passo 2: Configurar Build
A Vercel detecta automaticamente as configurações do `vercel.json`, mas confirme:

- **Framework Preset**: Vite
- **Build Command**: `bun run build` (ou `npm run build`)
- **Output Directory**: `dist`
- **Install Command**: `bun install` (ou `npm install`)

### Passo 3: Deploy
1. Clique em **"Deploy"**
2. Aguarde o build terminar (2-3 minutos)
3. Pronto! Sua aplicação está no ar 🎉

## 📋 Método 2: Deploy via CLI

### Instalar Vercel CLI
```bash
npm install -g vercel
```

### Fazer Login
```bash
vercel login
```

### Deploy
```bash
# Deploy de desenvolvimento
vercel

# Deploy de produção
vercel --prod
```

## 🔧 Estrutura do Projeto

```
projeto/
├── api/
│   ├── banner.js          # Serverless function para gerar banners
│   ├── fonts/             # Fontes (copiadas de server/fonts)
│   └── package.json       # Dependências da API
├── dist/                  # Build do frontend (gerado automaticamente)
├── src/                   # Código fonte React
├── vercel.json            # Configuração da Vercel
└── package.json           # Dependências do projeto
```

## 🌐 Endpoints Disponíveis

Após o deploy, você terá acesso a:

### Frontend
```
https://seu-projeto.vercel.app/
```

### API
```
https://seu-projeto.vercel.app/api/banner?name=TESTE&speed=999&label=VELOCIDADE
```

## 🎯 Exemplos de Uso da API

### Exemplo Básico
```
GET https://seu-projeto.vercel.app/api/banner?name=NEEXT&speed=999&label=VELOCIDADE
```

### Com Parâmetros Completos
```
GET https://seu-projeto.vercel.app/api/banner?name=TESTE&speed=850&label=DOWNLOAD&system=WINDOWS 11&wallpaper=https://exemplo.com/bg.jpg&avatar=https://exemplo.com/avatar.png
```

### Resposta JSON
```json
{
  "success": true,
  "url": "https://files.catbox.moe/xxxxx.png",
  "timestamp": "2025-10-17T16:30:00.000Z",
  "config": {
    "name": "TESTE",
    "speed": "999",
    "label": "VELOCIDADE",
    "system": "WINDOWS 11",
    "datetime": ""
  }
}
```

## ⚙️ Variáveis de Ambiente (Opcional)

Se precisar de variáveis de ambiente:

1. No Dashboard da Vercel, vá em **Settings > Environment Variables**
2. Adicione as variáveis necessárias
3. Faça um novo deploy

## 🔍 Troubleshooting

### Erro: "Module not found"
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se a pasta `api/fonts` existe

### Erro: "Function timeout"
- Aumente o timeout nas configurações do projeto (plano Pro)
- Otimize as imagens (wallpaper/avatar) para URLs mais rápidas

### Erro: "Cannot load font"
- Verifique se a pasta `api/fonts/` tem o arquivo `Orbitron-Bold.ttf`
- Execute: `cp -r server/fonts api/` localmente antes do commit

## 📱 Custom Domain

Para adicionar um domínio personalizado:

1. Vá em **Settings > Domains**
2. Adicione seu domínio
3. Configure os DNS records conforme instruído
4. Aguarde a propagação (até 48h)

## 🎉 Pronto!

Seu NEEXT Banner Generator está no ar! 🚀

### Links Úteis
- [Documentação Vercel](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Troubleshooting](https://vercel.com/docs/troubleshooting)
