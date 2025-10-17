# 🚀 Guia de Deploy no Render com Canvas

Este projeto usa o pacote `canvas` que precisa de bibliotecas do sistema instaladas no servidor. Siga este guia para fazer o deploy no Render.

## ✅ Solução para o Erro "Cannot find package 'canvas'"

O erro acontece porque o `canvas` precisa de dependências nativas (Cairo, Pango, etc) que não vêm instaladas por padrão no Render.

### 📝 Instruções de Deploy

Existem **2 formas** de configurar:

---

### **Opção 1: Usando render.yaml (Recomendado)**

O arquivo `render.yaml` já está configurado corretamente neste projeto! Ao fazer deploy no Render, ele vai:

1. Atualizar os pacotes do sistema
2. Instalar as bibliotecas necessárias (Cairo, Pango, libjpeg, etc)
3. Instalar os pacotes npm

✅ **Nada precisa ser feito manualmente!** Apenas faça o deploy normalmente.

---

### **Opção 2: Configuração Manual no Dashboard do Render**

Se preferir configurar manualmente:

1. **Acesse seu serviço no Dashboard do Render**
2. **Vá em Settings → Build & Deploy**
3. **No campo "Build Command", adicione:**

```bash
apt-get update && apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev && npm install
```

4. **No campo "Start Command", use:**

```bash
node server/index.js
```

5. **Clique em "Save Changes"**
6. **Faça um novo deploy manual**

---

## 🔧 O que cada biblioteca faz?

- `build-essential` - Ferramentas de compilação necessárias
- `libcairo2-dev` - Cairo graphics library (núcleo do canvas)
- `libpango1.0-dev` - Biblioteca para renderização de texto
- `libjpeg-dev` - Suporte para imagens JPEG
- `libgif-dev` - Suporte para imagens GIF  
- `librsvg2-dev` - Suporte para imagens SVG

---

## 🎯 Testando após o Deploy

Após o deploy bem-sucedido, teste a API:

```bash
https://seu-app.onrender.com/api/banner?name=TESTE&speed=999&label=VELOCIDADE
```

Deve retornar um JSON com a URL do banner gerado:

```json
{
  "success": true,
  "url": "https://files.catbox.moe/xxxxx.png"
}
```

---

## ⚠️ Problemas Comuns

### Erro: "apt-get: command not found"
- Certifique-se de estar usando o **ambiente Node**, não Docker

### Erro: "Permission denied"
- O Render já tem permissões corretas, este erro não deve acontecer

### Build muito lento
- A primeira build demora mais (2-3 minutos) porque instala as bibliotecas do sistema
- Builds subsequentes são mais rápidas (cache)

---

## 📚 Links Úteis

- [Documentação do Canvas no Node.js](https://github.com/Automattic/node-canvas)
- [Render - Custom Build Commands](https://render.com/docs/build-command)

---

**✅ Pronto!** Seu projeto agora funciona perfeitamente no Render com todas as funcionalidades de geração de banners! 🎨
