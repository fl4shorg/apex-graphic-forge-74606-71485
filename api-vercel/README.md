# API de Banner NEEXT para Vercel

API serverless que gera banners personalizados e faz upload para Catbox.

## 🚀 Deploy na Vercel

1. Faça login na Vercel: https://vercel.com
2. Importe este projeto
3. A Vercel vai fazer o deploy automaticamente

## 📝 Como usar a API

### Endpoint:
```
GET /api/generate
```

### Parâmetros (query string):

- `name` - Nome a ser exibido (padrão: "NEEXT")
- `speed` - Velocidade (padrão: "999")
- `label` - Rótulo inferior (padrão: "VELOCIDADE")
- `system` - Tipo de sistema (opcional)
- `datetime` - Data e hora customizada no formato "DD/MM/AAAA - HH:MM" (opcional)
- `wallpaper` - URL da imagem de fundo (opcional)
- `avatar` - URL da foto de perfil (opcional)

### Exemplo de uso:

```
https://seu-projeto.vercel.app/api/generate?name=Goddard&speed=999&system=Windows%2011&wallpaper=https://i.ibb.co/LwNskrW/44467c30731c3b2cbab054229075b840.jpg&avatar=https://i.ibb.co/4gYzmDL1/346ee41dde4401bf4218e7102632ede0.jpg
```

### Resposta (JSON):

```json
{
  "success": true,
  "url": "https://files.catbox.moe/xxxxx.png",
  "message": "Banner gerado e enviado com sucesso!"
}
```

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar localmente
vercel dev
```

## 📦 Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## ⚙️ Tecnologias

- **@napi-rs/canvas** - Geração de imagens (compatível com Vercel)
- **Vercel Serverless Functions** - Backend serverless
- **Catbox API** - Upload de imagens
