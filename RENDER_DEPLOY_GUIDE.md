# 🚀 Guia de Deploy no Render - ATUALIZADO

## ⚠️ IMPORTANTE: Use o Docker!

Este projeto agora usa **Docker** para deploy no Render, o que garante que todas as dependências do `@napi-rs/canvas` funcionem perfeitamente.

👉 **Veja o guia completo em: [RENDER_DEPLOY_DOCKER.md](./RENDER_DEPLOY_DOCKER.md)**

---

## 🔄 Mudança Importante

**ANTES (Não funciona):**
- Tentávamos instalar bibliotecas do sistema com `apt-get`
- Causava erro "Permission denied" no Render

**AGORA (Funciona perfeitamente!):**
- Usamos Docker com todas as dependências incluídas
- Deploy automático via `render.yaml`
- Configuração completa e pronta para usar

---

## 📋 Resumo Rápido

1. **Conecte seu repositório ao Render**
2. **Selecione "Blueprint" e escolha o `render.yaml`**
3. **Clique em "Apply"**
4. **Aguarde 2-3 minutos e sua API estará online!** 🎉

---

Para instruções detalhadas, consulte: **[RENDER_DEPLOY_DOCKER.md](./RENDER_DEPLOY_DOCKER.md)**
