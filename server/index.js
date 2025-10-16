import express from 'express';
import cors from 'cors';
import multer from 'multer';
import FormData from 'form-data';
import fetch from 'node-fetch';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.post('/api/upload-banner', upload.single('banner'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'Nenhuma imagem enviada' 
      });
    }

    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: 'neext-banner.png',
      contentType: 'image/png'
    });

    const response = await fetch('https://www.api.neext.online/upload/catbox', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });

    if (response.ok) {
      const result = await response.json();
      
      return res.json({
        success: true,
        url: result.url,
        timestamp: new Date().toISOString()
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Erro ao enviar para o Catbox'
      });
    }
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
