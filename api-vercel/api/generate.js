export default async function handler(req, res) {
  // Habilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Método não permitido. Use GET.' 
    });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: 'Parâmetro "url" é obrigatório',
      exemplo: '/api/generate?url=https://seusite.com/#/?name=TESTE&speed=1000&label=VELOCIDADE&json=true'
    });
  }

  try {
    // Redireciona para a URL do site com os parâmetros
    return res.json({
      success: true,
      message: 'Acesse a URL abaixo para gerar o banner',
      generator_url: url,
      instrucoes: 'Adicione json=true nos parâmetros da URL para obter resposta JSON',
      exemplo_url: url.includes('json=') ? url : `${url}${url.includes('?') ? '&' : '?'}json=true`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
