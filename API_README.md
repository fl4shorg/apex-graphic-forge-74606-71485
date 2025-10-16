# API de Geração de Banner Neext

API para gerar banners personalizados e fazer upload automático para o Catbox.

## 🚀 Endpoint Principal

### GET `/api/banner`

Gera um banner personalizado e retorna o link do Catbox.

#### Parâmetros da URL (Query String)

| Parâmetro | Tipo | Obrigatório | Descrição | Exemplo |
|-----------|------|-------------|-----------|---------|
| `name` | string | Não | Nome a ser exibido no banner | `NEEXT` |
| `speed` | string | Não | Valor numérico principal | `999` |
| `label` | string | Não | Texto do rótulo | `VELOCIDADE` |
| `wallpaper` | string (URL) | Não | URL da imagem de fundo | `https://files.catbox.moe/abc123.jpg` |
| `avatar` | string (URL) | Não | URL da imagem do perfil | `https://i.imgur.com/xyz.png` |
| `datetime` | string | Não | Data e hora personalizada | `16/10/2025 - 20:31` |

#### URLs de Imagem Aceitas

Por segurança, apenas URLs HTTPS dos seguintes domínios são aceitos:

- `i.imgur.com`
- `imgur.com`
- `files.catbox.moe`
- `catbox.moe`
- `i.ibb.co`
- `cdn.discordapp.com`
- `media.discordapp.net`

Formatos aceitos: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

#### Exemplos de Uso

**1. Banner simples com nome e velocidade:**
```
GET /api/banner?name=NEEXT&speed=999&label=VELOCIDADE
```

**2. Banner com imagens:**
```
GET /api/banner?name=PLAYER&speed=150&label=PING&avatar=https://i.imgur.com/abc.png&wallpaper=https://files.catbox.moe/bg.jpg
```

**3. Banner completo:**
```
GET /api/banner?name=NEEXT&speed=250&label=MS&datetime=16/10/2025 - 20:30&avatar=https://i.imgur.com/perfil.png&wallpaper=https://files.catbox.moe/fundo.jpg
```

#### Resposta de Sucesso

```json
{
  "success": true,
  "url": "https://files.catbox.moe/abc123.png"
}
```

#### Resposta de Erro

```json
{
  "success": false,
  "error": "URL de imagem inválida. Use apenas URLs HTTPS de imagens válidas."
}
```

## 🔧 Deploy no Render

### Opção 1: Deploy via Dashboard

1. Faça login no [Render](https://render.com)
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node index.js`
   - **Environment**: Node

**Nota**: O servidor usa automaticamente a variável de ambiente `PORT` fornecida pelo Render (ou porta 3001 localmente).

### Opção 2: Deploy via render.yaml

O arquivo `render.yaml` já está configurado. Basta conectar o repositório ao Render.

```yaml
services:
  - type: web
    name: neext-banner-api
    runtime: node
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
```

## 📦 Dependências

- **satori**: Geração de SVG a partir de JSX
- **@resvg/resvg-js**: Conversão de SVG para PNG
- **node-catbox**: Upload automático para Catbox
- **express**: Framework web
- **cors**: Permite requisições cross-origin

## 🎨 Design do Banner

O banner tem as seguintes características:
- Dimensões: 1365x618px
- Fundo: Gradiente azul escuro ou imagem personalizada com overlay
- Elementos visuais: Ícones de calendário e relógio
- Avatar: Imagem circular centralizada (260x260px)
- Texto principal: Nome em ciano com brilho neon
- Valor e label: Exibidos com fonte grande e estilizada

## 🔒 Segurança

- Validação de URLs de imagem
- Apenas HTTPS aceito
- Lista de domínios permitidos (whitelist)
- Validação de extensões de arquivo

## 💡 Exemplo de Uso em Bot Discord

```javascript
const axios = require('axios');

// Gerar banner
const response = await axios.get('https://sua-api.onrender.com/api/banner', {
  params: {
    name: 'PLAYER123',
    speed: '45',
    label: 'PING',
    avatar: 'https://i.imgur.com/avatar.png'
  }
});

// Usar URL do banner
const bannerUrl = response.data.url;
await interaction.reply(`Seu banner: ${bannerUrl}`);
```

## 🌐 Testando Localmente

```bash
# Instalar dependências
cd server
npm install

# Iniciar servidor
npm start

# Servidor rodará em http://localhost:3001
```

## 📝 Notas

- O upload para Catbox é automático
- Arquivos temporários são deletados após upload
- Valores padrão são usados quando parâmetros não são fornecidos
- Data e hora são geradas automaticamente se não especificadas
