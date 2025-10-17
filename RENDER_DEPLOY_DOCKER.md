# 🚀 Guia de Deploy no Render com Docker

## ✅ Configuração Completa (Já Pronta!)

Este projeto está configurado para deploy no Render usando Docker, que garante que todas as dependências do `@napi-rs/canvas` funcionem perfeitamente.

---

## 📋 Como Fazer o Deploy

### **Opção 1: Deploy Automático via render.yaml (Recomendado)**

1. **Conecte seu repositório ao Render**
   - Acesse [render.com](https://render.com)
   - Clique em **"New +"** → **"Blueprint"**
   - Conecte seu repositório Git (GitHub/GitLab)

2. **Render detectará automaticamente o `render.yaml`**
   - Todas as configurações já estão prontas!
   - Clique em **"Apply"**

3. **Aguarde o deploy**
   - O Docker vai instalar todas as dependências
   - Em 2-3 minutos sua API estará no ar! 🎉

---

### **Opção 2: Deploy Manual via Dashboard**

1. **Crie um novo Web Service**
   - Acesse [render.com/dashboard](https://dashboard.render.com)
   - Clique em **"New +"** → **"Web Service"**
   - Conecte seu repositório

2. **Configure o serviço:**
   - **Name**: `neext-banner-api`
   - **Region**: Escolha a mais próxima
   - **Root Directory**: `api`
   - **Environment**: Selecione **Docker**
   - **Dockerfile Path**: `api/Dockerfile` (ou `./Dockerfile` se Root Directory = api)

3. **Variáveis de ambiente:**
   ```
   NODE_ENV=production
   PORT=3000
   ```

4. **Clique em "Create Web Service"**

---

## 🎯 Testando a API

Após o deploy, sua API estará disponível em:
```
https://seu-app.onrender.com
```

### **Endpoints disponíveis:**

**1. Informações da API:**
```
GET https://seu-app.onrender.com/
```

**2. Gerar Banner:**
```
GET https://seu-app.onrender.com/api/banner?name=TESTE&speed=999&label=VELOCIDADE
```

**Parâmetros disponíveis:**
- `name` - Nome do usuário (ex: NEEXT)
- `speed` - Velocidade (ex: 999)
- `label` - Label (ex: VELOCIDADE)
- `system` - Sistema (ex: WINDOWS 11)
- `datetime` - Data e hora (ex: 17/10/2025 - 14:30)
- `wallpaper` - URL da imagem de fundo
- `avatar` - URL do avatar

**Exemplo completo:**
```
https://seu-app.onrender.com/api/banner?name=NEEXT&speed=999&label=VELOCIDADE&system=WINDOWS%2011&datetime=17/10/2025%20-%2016:30
```

---

## 🔧 O que está configurado no Docker?

O Dockerfile instala:
- ✅ Node.js 20
- ✅ Fontconfig (para renderização de texto)
- ✅ Fontes do sistema (Liberation fonts)
- ✅ Todas as dependências npm
- ✅ Cache de fontes otimizado

---

## ⚡ Vantagens do Docker

- **Reproduzível**: Funciona igual em qualquer ambiente
- **Completo**: Todas as dependências incluídas
- **Rápido**: Builds com cache inteligente
- **Confiável**: Sem erros de "missing dependencies"

---

## 🐛 Troubleshooting

### Deploy está lento?
- Primeira build leva 2-3 minutos (instala tudo)
- Builds seguintes são mais rápidas (usa cache)

### API não responde?
- Verifique que a porta está configurada como `3000`
- Confirme que `NODE_ENV=production` está definida

### Erro de fonte/texto?
- O Docker já instala `fontconfig` automaticamente
- As fontes personalizadas estão na pasta `api/fonts/`

---

## 📚 Arquivos de Configuração

- **`api/Dockerfile`** - Configuração do container
- **`render.yaml`** - Deploy automático no Render
- **`api/banner.js`** - Servidor Express + Canvas
- **`api/fonts/`** - Fontes personalizadas (Orbitron)

---

**✅ Tudo pronto! Seu projeto está otimizado para deploy no Render com Docker.** 🎨🚀
