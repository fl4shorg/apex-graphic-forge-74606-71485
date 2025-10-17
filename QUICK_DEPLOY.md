# 🚀 Deploy Rápido na Vercel

## 3 Passos para Deploy

### 1️⃣ Push para GitHub
```bash
git add .
git commit -m "Preparado para deploy na Vercel"
git push origin main
```

### 2️⃣ Importar na Vercel
1. Acesse: https://vercel.com/new
2. Conecte seu repositório GitHub
3. Configure:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Clique em **"Deploy"**

### 3️⃣ Pronto! ✅
Sua URL: `https://seu-projeto.vercel.app`

## 📌 Teste a API

A API agora retorna a **imagem PNG diretamente**:

```html
<img src="https://seu-projeto.vercel.app/api/banner?name=TESTE&speed=999&label=VELOCIDADE&system=WINDOWS 11" />
```

Ou abra direto no navegador:
```
https://seu-projeto.vercel.app/api/banner?name=TESTE&speed=999&label=VELOCIDADE
```

## 🎯 Vantagens
✅ Retorna imagem diretamente (sem Catbox)  
✅ Use como `<img src="..."/>`  
✅ Cache automático  
✅ Mais rápido e confiável  

## 📚 Documentação Completa
Veja [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) para instruções detalhadas.
