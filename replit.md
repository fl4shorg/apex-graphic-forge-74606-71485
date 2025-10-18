# NEEXT Banner Generator

## Visão Geral
Aplicação web para gerar banners personalizados com design futurista e tech. O site permite criar banners com informações customizadas e fazer upload automático para o Catbox.

## Funcionalidades Principais

### 1. Interface Web (Normal)
- Gerar banners personalizados com nome, velocidade, rótulo, sistema
- Upload de wallpaper e avatar customizados
- Download do banner em PNG
- Upload automático para Catbox

### 2. API REST (GET /api/banner)
**Nova funcionalidade para deploy no Render!**
- Endpoint GET que aceita parâmetros pela URL
- Gera banner automaticamente usando Satori
- Faz upload para Catbox
- Retorna link da imagem em JSON
- Pronto para rodar em produção no Render

## Como Usar

### URL Normal (Interface Visual)
```
https://seusite.com/#/
```

### URL com Parâmetros (Geração Automática + JSON)
```
https://seusite.com/#/?name=NEEXT&speed=999&label=VELOCIDADE
```

**IMPORTANTE:** Quando você passa qualquer parâmetro na URL, o site automaticamente:
1. Carrega os valores
2. Gera o banner
3. Faz upload para Catbox
4. Retorna o resultado em JSON

### Parâmetros Disponíveis
- `name` - Nome a exibir (ex: NEEXT)
- `speed` - Velocidade (ex: 999)
- `label` - Rótulo inferior (ex: VELOCIDADE)
- `system` - Nome do sistema (ex: WINDOWS 11)
- `datetime` - Data e hora customizada (ex: 16/10/2025 - 16:47)
- `wallpaper` - URL da imagem de fundo (com fallback CORS automático)
- `avatar` - URL da foto de perfil (com fallback CORS automático)

### Exemplo de Resposta JSON
```json
{
  "success": true,
  "url": "https://files.catbox.moe/xxxxx.png",
  "timestamp": "2025-10-16T16:47:00.000Z",
  "config": {
    "name": "NEEXT",
    "speed": "999",
    "label": "VELOCIDADE",
    "system": "",
    "datetime": ""
  }
}
```

## Arquitetura

### Frontend (React + Vite)
- **Tecnologias**: React, TypeScript, Tailwind CSS, Shadcn/ui
- **Canvas**: Geração de banner usando HTML5 Canvas
- **Upload**: Fetch API para enviar para Catbox via API NEEXT

### Estrutura de Arquivos
```
src/
├── components/
│   ├── banner/
│   │   ├── ControlPanel.tsx    # Controles do banner
│   │   ├── PreviewPanel.tsx    # Preview e geração
│   │   ├── Header.tsx          # Cabeçalho
│   │   └── TechBackground.tsx  # Fundo animado
│   └── ui/                     # Componentes Shadcn/ui
├── pages/
│   └── Index.tsx               # Página principal
└── main.tsx                    # Entry point

api-vercel/                     # Deploy Vercel (opcional)
├── api/
│   └── generate.js             # Endpoint de informação
├── vercel.json                 # Config Vercel
└── README.md                   # Documentação Vercel
```

## Deploy na Vercel

### Opção 1: Site Principal
1. Conecte este repositório na Vercel
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Framework Preset: Vite

### Opção 2: API Vercel (pasta api-vercel)
1. Crie um novo projeto na Vercel
2. Aponte para a pasta `api-vercel`
3. A Vercel detecta automaticamente a configuração

## Desenvolvimento

### Instalar Dependências
```bash
npm install
```

### Rodar Localmente
```bash
npm run start
```

### Build para Produção
```bash
npm run build
```

## Tecnologias Utilizadas
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- Radix UI
- React Router DOM
- Zod (validação)
- Sonner (toasts)
- Lucide React (ícones)

## Configurações Importantes

### Vite Config
- Host: 0.0.0.0 (permite acesso externo)
- Port: 5000
- AllowedHosts: true (necessário para Replit)

### Upload para Catbox
- Endpoint: `https://www.api.neext.online/upload/catbox`
- Método: POST
- FormData: campo "file" com a imagem PNG

## Mudanças Recentes

### 18/10/2025 - Migração para Sharp
- **Removido**: @napi-rs/canvas, Satori, @resvg/resvg-js
- **Adicionado**: Sharp (biblioteca de processamento de imagens de alta performance)
- **Método de geração**: SVG programático → PNG via Sharp
- **Fontes**: Orbitron incorporada como base64 no SVG (não requer fontes externas)
- **Performance**: 4-5x mais rápido que canvas/ImageMagick
- **Compatibilidade**: Mantém 100% de compatibilidade com API existente
- **Campos dinâmicos**: label e system agora totalmente customizáveis via API

### 16/10/2025 - API REST para Deploy
- Implementada API backend com Express na porta 3001
- Criado endpoint GET /api/banner com parâmetros via query string
- Servidor usa process.env.PORT para compatibilidade com Render
- Arquivo render.yaml configurado para deploy automático
- API_README.md com documentação completa e exemplos de uso
- Comando de start otimizado: `node server/index.js & bunx --bun vite`

### Segurança
- **HTTPS obrigatório**: Apenas URLs HTTPS são aceitas
- **Formatos válidos**: .jpg, .jpeg, .png, .gif, .webp
- **Imagens incorporadas**: Wallpaper e avatar convertidos para base64 no SVG
