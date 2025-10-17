# 🚀 Deploy da API NEEXT Banner no Render

## ✅ STATUS: Código pronto para deploy!

A API está **100% funcional** com visual idêntico ao preview usando @napi-rs/canvas.

---

## 📋 CONFIGURAÇÃO DO RENDER (PASSO A PASSO)

### 1. Criar conta no Render
- Acesse: **https://render.com**
- Crie conta com GitHub (recomendado)

### 2. Criar Web Service
1. Clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub
3. Configure **EXATAMENTE** assim:

```
✅ Name: neext-banner-api
✅ Region: Oregon (US West) ou Frankfurt (EU)
✅ Branch: main
✅ Root Directory: api
✅ Runtime: Node
✅ Build Command: npm install
✅ Start Command: node banner.js
✅ Instance Type: Free (ou Starter $7/mês para produção)
✅ Auto-Deploy: Yes
```

### 3. Environment Variables (Opcional)
Adicione se quiser:
```
NODE_ENV = production
```

### 4. Deploy!
- Clique em **"Create Web Service"**
- Aguarde 3-5 minutos

---

## 🎯 COMO USAR A API

### URL Base:
```
https://neext-banner-api.onrender.com
```

### Endpoint da API:
```
GET /api/banner
```

### Exemplo completo:
```
https://neext-banner-api.onrender.com/api/banner?name=NEEXT&speed=999&label=VELOCIDADE&system=WINDOWS%2011&wallpaper=https://i.ibb.co/N2qWPxb7/88dfe41c43186feb6baaf7b8b47cea85.jpg&avatar=https://i.ibb.co/ZbrBcQF/156afca4bf32bfe0135da6ec1529817b.jpg
```

### Parâmetros disponíveis:

| Parâmetro | Descrição | Exemplo |
|-----------|-----------|---------|
| `name` | Nome do usuário | `NEEXT` |
| `speed` | Velocidade | `999` |
| `label` | Rótulo inferior | `VELOCIDADE` |
| `system` | Sistema operacional | `WINDOWS 11` |
| `datetime` | Data e hora | `17/10/2025 - 14:30` |
| `wallpaper` | URL da imagem de fundo | `https://...` |
| `avatar` | URL do avatar | `https://...` |

---

## ⚠️ IMPORTANTE - Plano Free do Render

### Características do Free Tier:
- ✅ **Grátis para sempre**
- ⚠️ **Dorme após 15 minutos de inatividade**
- ⏱️ **Primeira requisição demora 30-60 segundos** (para acordar)
- ✅ Depois funciona normalmente

### Quando usar Plano Pago ($7/mês):
- ✅ API sempre ativa (sem delay)
- ✅ Mais memória RAM
- ✅ Melhor para produção

---

## 🔧 TROUBLESHOOTING

### ❌ Erro: "Cannot find module"
**Solução:** Verifique se `Root Directory` está com valor `api`

### ❌ Erro: "Application exited early"
**Solução:** Certifique-se que `Start Command` é `node banner.js`

### ❌ API demora muito
**Solução:** Plano Free dorme. Primeira requisição é lenta (normal)

### ❌ Fonte não carrega
**Solução:** Verifique nos logs do Render:
- Deve aparecer: `✅ Fonte Orbitron carregada com sucesso`
- Se não aparecer, verifique se a pasta `api/fonts/` tem `Orbitron-Bold.ttf`

---

## ✨ RESULTADO FINAL

A API vai retornar uma **imagem PNG perfeita**, 100% idêntica ao preview:

✅ Wallpaper de fundo com overlay  
✅ Avatar circular central + pequeno no painel  
✅ Nome, velocidade e label com fonte Orbitron  
✅ Painéis decorativos (latência, upload, download, sistema)  
✅ Data e hora com ícones  
✅ Ícone de robô  
✅ Sistema operacional com ícone de monitor  
✅ Gradientes, sombras e efeitos visuais  

---

## 📝 COMMIT E PUSH

Para fazer deploy, execute:

```bash
git add api/banner.js api/package.json render.yaml
git commit -m "feat: API completa com servidor Express para Render"
git push
```

O Render vai detectar o push e fazer deploy automaticamente!

---

## 🎉 PRONTO!

Após o deploy, você terá uma API profissional rodando em:
```
https://sua-api.onrender.com/api/banner
```

Use em Discord bots, sites, aplicativos e muito mais!
