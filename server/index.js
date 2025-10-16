import express from 'express';
import cors from 'cors';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Catbox } from 'node-catbox';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 3001;

const isValidImageUrl = (url) => {
  if (!url) return true;
  try {
    const parsed = new URL(url);
    
    // Aceita HTTP e HTTPS para compatibilidade
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    
    // Não exige extensão - muitos CDNs não mostram a extensão na URL
    return true;
  } catch {
    return false;
  }
};

app.post('/api/generate', async (req, res) => {
  try {
    const { name, speed, label, system, datetime, wallpaper, avatar } = req.body;

    if ((wallpaper && !isValidImageUrl(wallpaper)) || (avatar && !isValidImageUrl(avatar))) {
      return res.status(400).json({
        success: false,
        error: 'URL de imagem inválida. Use apenas URLs HTTPS de imagens válidas.',
      });
    }

    const now = new Date();
    const dateText = datetime?.trim() 
      ? datetime.split(' - ')[0] 
      : now.toLocaleDateString('pt-BR');
    const timeText = datetime?.trim() 
      ? datetime.split(' - ')[1] 
      : now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const bannerElements = {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          width: '1365px',
          height: '618px',
          position: 'relative',
          background: wallpaper ? 'transparent' : 'linear-gradient(180deg, #0a1635 0%, #0a1129 100%)',
        },
        children: [
          wallpaper && {
            type: 'img',
            props: {
              src: wallpaper,
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.3,
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: wallpaper ? 'rgba(10, 15, 30, 0.7)' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '30px 30px 20px',
                      alignItems: 'center',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', alignItems: 'center', gap: '12px' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '22px',
                                  height: '24px',
                                  border: '2px solid #00f7ff',
                                  borderRadius: '4px',
                                  position: 'relative',
                                },
                                children: [
                                  {
                                    type: 'div',
                                    props: {
                                      style: {
                                        width: '100%',
                                        height: '6px',
                                        background: '#00f7ff',
                                        borderRadius: '4px 4px 0 0',
                                        position: 'absolute',
                                        top: 0,
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                            { type: 'span', props: { style: { color: '#fff', fontSize: '16px', fontWeight: 700, fontFamily: 'Inter' }, children: dateText } },
                          ],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', alignItems: 'center', gap: '12px' },
                          children: [
                            { type: 'span', props: { style: { color: '#fff', fontSize: '16px', fontWeight: 700, fontFamily: 'Inter' }, children: timeText } },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '24px',
                                  height: '24px',
                                  border: '2px solid #00f7ff',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                },
                                children: [
                                  {
                                    type: 'div',
                                    props: {
                                      style: {
                                        width: '2px',
                                        height: '10px',
                                        background: '#00f7ff',
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      position: 'relative',
                      gap: '25px',
                    },
                    children: [
                      avatar && {
                        type: 'div',
                        props: {
                          style: {
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                          children: [
                            {
                              type: 'img',
                              props: {
                                src: avatar,
                                style: {
                                  width: '260px',
                                  height: '260px',
                                  borderRadius: '50%',
                                  border: '6px solid #00f7ff',
                                  objectFit: 'cover',
                                  boxShadow: '0 0 40px rgba(0, 247, 255, 0.6)',
                                },
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '15px',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '70px',
                                  fontWeight: 900,
                                  color: '#ffffff',
                                  textTransform: 'uppercase',
                                  textShadow: '0 0 30px rgba(0, 247, 255, 0.8)',
                                  fontFamily: 'Inter',
                                  letterSpacing: '4px',
                                },
                                children: name || 'NEEXT',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '35px',
                                  padding: '20px 40px',
                                  background: 'rgba(0, 247, 255, 0.1)',
                                  borderRadius: '15px',
                                  border: '2px solid rgba(0, 247, 255, 0.3)',
                                },
                                children: [
                                  {
                                    type: 'div',
                                    props: {
                                      style: {
                                        fontSize: '110px',
                                        fontWeight: 900,
                                        color: '#00f7ff',
                                        textShadow: '0 0 50px rgba(0, 247, 255, 1)',
                                        fontFamily: 'Inter',
                                      },
                                      children: speed || '999',
                                    },
                                  },
                                  {
                                    type: 'div',
                                    props: {
                                      style: {
                                        fontSize: '38px',
                                        fontWeight: 700,
                                        color: '#fff',
                                        textTransform: 'uppercase',
                                        fontFamily: 'Inter',
                                        letterSpacing: '2px',
                                      },
                                      children: label || 'VELOCIDADE',
                                    },
                                  },
                                ],
                              },
                            },
                            system && {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '22px',
                                  fontWeight: 600,
                                  color: '#00f7ff',
                                  textShadow: '0 0 20px rgba(0, 247, 255, 0.6)',
                                  fontFamily: 'Inter',
                                  letterSpacing: '1px',
                                },
                                children: system.toUpperCase(),
                              },
                            },
                          ].filter(Boolean),
                        },
                      },
                    ].filter(Boolean),
                  },
                },
              ],
            },
          },
        ].filter(Boolean),
      },
    };

    const fontPath = join(__dirname, 'node_modules', '@fontsource', 'inter', 'files', 'inter-latin-700-normal.woff');
    const fontData = readFileSync(fontPath);

    const svg = await satori(bannerElements, {
      width: 1365,
      height: 618,
      fonts: [
        {
          name: 'sans-serif',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    });

    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    const tempPath = join(__dirname, `temp-banner-${uuidv4()}.png`);
    try {
      writeFileSync(tempPath, pngBuffer);
      const catbox = new Catbox();
      const catboxUrl = await catbox.uploadFile({ path: tempPath });
      return res.json({
        success: true,
        url: catboxUrl,
      });
    } finally {
      try {
        unlinkSync(tempPath);
      } catch (e) {
        console.error('Erro ao deletar arquivo temporário:', e);
      }
    }

  } catch (error) {
    console.error('Erro ao gerar banner:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get('/api/banner', async (req, res) => {
  try {
    const { name, speed, label, system, datetime, wallpaper, avatar } = req.query;

    if ((wallpaper && !isValidImageUrl(wallpaper)) || (avatar && !isValidImageUrl(avatar))) {
      return res.status(400).json({
        success: false,
        error: 'URL de imagem inválida. Use apenas URLs HTTPS de imagens válidas.',
      });
    }

    const now = new Date();
    const dateText = datetime?.trim() 
      ? datetime.split(' - ')[0] 
      : now.toLocaleDateString('pt-BR');
    const timeText = datetime?.trim() 
      ? datetime.split(' - ')[1] 
      : now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const bannerElements = {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          width: '1365px',
          height: '618px',
          position: 'relative',
          background: wallpaper ? 'transparent' : 'linear-gradient(180deg, #0a1635 0%, #0a1129 100%)',
        },
        children: [
          wallpaper && {
            type: 'img',
            props: {
              src: wallpaper,
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.3,
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: wallpaper ? 'rgba(10, 15, 30, 0.7)' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '30px 30px 20px',
                      alignItems: 'center',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', alignItems: 'center', gap: '12px' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '22px',
                                  height: '24px',
                                  border: '2px solid #00f7ff',
                                  borderRadius: '4px',
                                  position: 'relative',
                                },
                                children: [
                                  {
                                    type: 'div',
                                    props: {
                                      style: {
                                        width: '100%',
                                        height: '6px',
                                        background: '#00f7ff',
                                        borderRadius: '4px 4px 0 0',
                                        position: 'absolute',
                                        top: 0,
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                            { type: 'span', props: { style: { color: '#fff', fontSize: '16px', fontWeight: 700, fontFamily: 'Inter' }, children: dateText } },
                          ],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', alignItems: 'center', gap: '12px' },
                          children: [
                            { type: 'span', props: { style: { color: '#fff', fontSize: '16px', fontWeight: 700, fontFamily: 'Inter' }, children: timeText } },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '24px',
                                  height: '24px',
                                  border: '2px solid #00f7ff',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                },
                                children: [
                                  {
                                    type: 'div',
                                    props: {
                                      style: {
                                        width: '2px',
                                        height: '10px',
                                        background: '#00f7ff',
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      position: 'relative',
                      gap: '25px',
                    },
                    children: [
                      avatar && {
                        type: 'div',
                        props: {
                          style: {
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                          children: [
                            {
                              type: 'img',
                              props: {
                                src: avatar,
                                style: {
                                  width: '260px',
                                  height: '260px',
                                  borderRadius: '50%',
                                  border: '6px solid #00f7ff',
                                  objectFit: 'cover',
                                  boxShadow: '0 0 40px rgba(0, 247, 255, 0.6)',
                                },
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '15px',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '70px',
                                  fontWeight: 900,
                                  color: '#ffffff',
                                  textTransform: 'uppercase',
                                  textShadow: '0 0 30px rgba(0, 247, 255, 0.8)',
                                  fontFamily: 'Inter',
                                  letterSpacing: '4px',
                                },
                                children: name || 'NEEXT',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '35px',
                                  padding: '20px 40px',
                                  background: 'rgba(0, 247, 255, 0.1)',
                                  borderRadius: '15px',
                                  border: '2px solid rgba(0, 247, 255, 0.3)',
                                },
                                children: [
                                  {
                                    type: 'div',
                                    props: {
                                      style: {
                                        fontSize: '110px',
                                        fontWeight: 900,
                                        color: '#00f7ff',
                                        textShadow: '0 0 50px rgba(0, 247, 255, 1)',
                                        fontFamily: 'Inter',
                                      },
                                      children: speed || '999',
                                    },
                                  },
                                  {
                                    type: 'div',
                                    props: {
                                      style: {
                                        fontSize: '38px',
                                        fontWeight: 700,
                                        color: '#fff',
                                        textTransform: 'uppercase',
                                        fontFamily: 'Inter',
                                        letterSpacing: '2px',
                                      },
                                      children: label || 'VELOCIDADE',
                                    },
                                  },
                                ],
                              },
                            },
                            system && {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '22px',
                                  fontWeight: 600,
                                  color: '#00f7ff',
                                  textShadow: '0 0 20px rgba(0, 247, 255, 0.6)',
                                  fontFamily: 'Inter',
                                  letterSpacing: '1px',
                                },
                                children: system.toUpperCase(),
                              },
                            },
                          ].filter(Boolean),
                        },
                      },
                    ].filter(Boolean),
                  },
                },
              ],
            },
          },
        ].filter(Boolean),
      },
    };

    const fontPath = join(__dirname, 'node_modules', '@fontsource', 'inter', 'files', 'inter-latin-700-normal.woff');
    const fontData = readFileSync(fontPath);

    const svg = await satori(bannerElements, {
      width: 1365,
      height: 618,
      fonts: [
        {
          name: 'sans-serif',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    });

    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    const tempPath = join(__dirname, `temp-banner-${uuidv4()}.png`);
    try {
      writeFileSync(tempPath, pngBuffer);
      const catbox = new Catbox();
      const catboxUrl = await catbox.uploadFile({ path: tempPath });
      return res.json({
        success: true,
        url: catboxUrl,
      });
    } finally {
      try {
        unlinkSync(tempPath);
      } catch (e) {
        console.error('Erro ao deletar arquivo temporário:', e);
      }
    }

  } catch (error) {
    console.error('Erro ao gerar banner:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    name: 'NEEXT Banner API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      health: {
        method: 'GET',
        path: '/health',
        description: 'Verificar status da API'
      },
      generateBanner: {
        method: 'GET',
        path: '/api/banner',
        description: 'Gerar banner e enviar para Catbox',
        parameters: {
          name: 'Nome a exibir (ex: NEEXT)',
          speed: 'Valor numérico (ex: 999)',
          label: 'Texto do rótulo (ex: VELOCIDADE)',
          wallpaper: 'URL HTTPS da imagem de fundo',
          avatar: 'URL HTTPS da foto de perfil',
          datetime: 'Data e hora customizada (ex: 16/10/2025 - 20:30)'
        },
        example: '/api/banner?name=TESTE&speed=100&label=PING'
      }
    },
    documentation: 'Veja API_README.md para documentação completa'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API rodando em http://0.0.0.0:${PORT}`);
});
