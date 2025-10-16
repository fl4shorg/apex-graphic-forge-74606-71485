# 🚀 API do NEEXT Banner Generator

## 📋 Visão Geral

Esta API foi criada para gerar banners e retornar o link do Catbox em formato JSON, permitindo que outras APIs consumam facilmente essa informação.

## 🔌 Endpoints

### 1. Upload de Banner

**Endpoint:** `POST /api/upload-banner`

**Descrição:** Recebe uma imagem de banner, faz upload para o Catbox e retorna o link em formato JSON.

**Request:**
- **Method:** POST
- **Content-Type:** multipart/form-data
- **Body:** 
  - `banner` (file): Arquivo de imagem PNG do banner

**Response (Sucesso - 200):**
```json
{
  "success": true,
  "url": "https://files.catbox.moe/xxxxx.png",
  "timestamp": "2025-10-16T16:47:00.000Z"
}
```

**Response (Erro - 400):**
```json
{
  "success": false,
  "error": "Nenhuma imagem enviada"
}
```

**Response (Erro - 500):**
```json
{
  "success": false,
  "error": "Mensagem de erro"
}
```

### 2. Health Check

**Endpoint:** `GET /api/health`

**Descrição:** Verifica se a API está funcionando.

**Response:**
```json
{
  "status": "ok",
  "message": "API funcionando"
}
```

## 💡 Como Usar

### Exemplo com cURL:

```bash
curl -X POST http://localhost:5000/api/upload-banner \
  -F "banner=@caminho/para/imagem.png"
```

### Exemplo com JavaScript/Fetch:

```javascript
const formData = new FormData();
formData.append('banner', imageBlob, 'banner.png');

const response = await fetch('/api/upload-banner', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result.url); // URL do Catbox
```

### Exemplo com Python:

```python
import requests

files = {'banner': open('imagem.png', 'rb')}
response = requests.post('http://localhost:5000/api/upload-banner', files=files)
data = response.json()
print(data['url'])
```

## 🔧 Configuração

A API roda na porta **3000** e o Vite (frontend) roda na porta **5000**.

O Vite está configurado com um proxy que redireciona todas as requisições `/api/*` para `http://localhost:3000`.

## 📝 Estrutura do Projeto

```
.
├── server/
│   └── index.js          # API backend (Express)
├── src/
│   └── components/
│       └── banner/
│           └── PreviewPanel.tsx  # Componente que usa a API
├── package.json          # Dependências e scripts
└── vite.config.ts        # Configuração do Vite com proxy
```

## 🚀 Como Rodar

```bash
npm run start  # Inicia API (porta 3000) e Frontend (porta 5000)
```

Ou separadamente:

```bash
npm run api    # Apenas API
npm run dev    # Apenas Frontend
```

## 📦 Dependências

- **express** - Framework web
- **cors** - CORS middleware
- **multer** - Upload de arquivos
- **form-data** - Manipulação de FormData
- **node-fetch** - Requisições HTTP

## 🔄 Fluxo de Funcionamento

1. Usuário gera o banner no frontend
2. Frontend envia a imagem para `/api/upload-banner`
3. API backend recebe a imagem
4. API faz upload para `https://www.api.neext.online/upload/catbox`
5. API retorna o link do Catbox em formato JSON
6. Frontend exibe o link para o usuário
7. Outras APIs podem consumir o mesmo endpoint para obter o link

## 🎯 Benefícios

✅ **Formato JSON padronizado** - Fácil de consumir por outras APIs  
✅ **Separação de responsabilidades** - Backend isolado do frontend  
✅ **Reutilizável** - Outras aplicações podem usar a mesma API  
✅ **Timestamp incluído** - Rastreabilidade dos uploads  
✅ **Error handling** - Tratamento adequado de erros
