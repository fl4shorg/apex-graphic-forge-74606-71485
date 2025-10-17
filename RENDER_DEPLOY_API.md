# Deploy da API de Banner no Render

## 🚀 Como fazer deploy no Render

### 1. Preparar o repositório
O código já está pronto! A pasta `api/` contém tudo que você precisa.

### 2. Criar conta no Render
- Acesse: https://render.com
- Crie uma conta (pode usar GitHub)

### 3. Criar novo Web Service
1. Clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub
3. Configure assim:

```
Name: neext-banner-api
Region: escolha a mais próxima
Branch: main (ou seu branch principal)
Root Directory: api
Runtime: Node
Build Command: npm install
Start Command: node banner.js
Instance Type: Free (ou pago se preferir)
```

### 4. Variáveis de Ambiente (opcional)
No Render, adicione se necessário:
```
NODE_ENV=production
```

### 5. Deploy Automático
- Clique em **"Create Web Service"**
- O Render vai fazer deploy automaticamente
- Aguarde 2-5 minutos

### 6. Sua API estará pronta!
URL final será algo como:
```
https://neext-banner-api.onrender.com/api/banner
```

## 📝 Como usar a API

### Exemplo de URL:
```
https://sua-api.onrender.com/api/banner?name=TESTE&speed=999&label=VELOCIDADE&system=WINDOWS%2011&wallpaper=https://i.ibb.co/N2qWPxb7/88dfe41c43186feb6baaf7b8b47cea85.jpg&avatar=https://i.ibb.co/ZbrBcQF/156afca4bf32bfe0135da6ec1529817b.jpg
```

### Parâmetros disponíveis:
- `name` - Nome a exibir (ex: NEEXT)
- `speed` - Velocidade (ex: 999)
- `label` - Rótulo inferior (ex: VELOCIDADE)
- `system` - Nome do sistema (ex: WINDOWS 11)
- `datetime` - Data e hora (ex: 17/10/2025 - 14:30)
- `wallpaper` - URL da imagem de fundo
- `avatar` - URL da foto de perfil

## ✨ Diferenças importantes do Vercel

### ✅ FUNCIONA no Render:
- @napi-rs/canvas (binários nativos)
- Fontes customizadas (Orbitron)
- Geração de imagens complexas
- Visual 100% idêntico ao preview

### ❌ NÃO funciona no Vercel:
- @napi-rs/canvas (limitação serverless)
- Fontes podem não carregar corretamente

## 🔧 Troubleshooting

### Se a fonte não carregar:
1. Verifique se a pasta `api/fonts/` tem o arquivo `Orbitron-Bold.ttf`
2. No Render, veja os logs em **"Logs"** para conferir se aparece "✅ Fonte Orbitron carregada"

### Se der erro de memória:
- Upgrade para um plano pago no Render (Free tem 512MB RAM)

## 🎯 Resultado Final
Sua API vai retornar uma imagem PNG perfeita, **exatamente igual ao preview do site**, com todos os detalhes visuais:
- Wallpaper de fundo
- Avatar circular central e pequeno
- Nome, velocidade e label
- Todos os painéis laterais decorativos
- Sistema operacional (se fornecido)
- Data e hora
- Ícone de robô
- Efeitos visuais (sombras, gradientes, etc.)
