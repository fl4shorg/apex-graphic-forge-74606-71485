# NEEXT Banner API - Vercel

API simples para uso com Vercel que redireciona para o gerador de banner.

## Deploy na Vercel

1. Faça upload desta pasta `api-vercel` para um repositório Git
2. Conecte o repositório na Vercel
3. A Vercel vai detectar automaticamente a configuração

## Como Usar

### Endpoint Principal
```
GET /api/generate?url=<URL_DO_SITE>
```

### Exemplo de Uso no Site Principal

**URL do site com parâmetros:**
```
https://seusite.com/#/?name=NEEXT&speed=999&label=VELOCIDADE&wallpaper=https://exemplo.com/bg.jpg&avatar=https://exemplo.com/avatar.jpg&json=true
```

**Parâmetros disponíveis:**
- `name` - Nome a exibir (ex: NEEXT)
- `speed` - Velocidade (ex: 999)
- `label` - Rótulo (ex: VELOCIDADE)
- `system` - Sistema (ex: WINDOWS 11)
- `datetime` - Data e hora customizada (ex: 16/10/2025 - 16:47)
- `wallpaper` - URL da imagem de fundo
- `avatar` - URL da foto de perfil
- `json=true` - Retorna resultado em JSON

### Exemplo de Resposta JSON

Quando você adiciona `json=true` na URL, após gerar o banner, a página mostra:

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

## Como Funciona

1. O site detecta os parâmetros na URL
2. Gera o banner automaticamente no canvas do navegador
3. Faz upload para o Catbox
4. Se `json=true`, exibe o resultado em formato JSON
5. Se `json=false` ou ausente, mostra a interface normal

## Testando Localmente

Não é necessário testar localmente, pois esta API apenas redireciona/informa URLs.
O processamento real acontece no site frontend.
