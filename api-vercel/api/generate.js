import { createCanvas, loadImage } from '@napi-rs/canvas';

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name = 'NEEXT',
      speed = '999',
      label = 'VELOCIDADE',
      system = '',
      datetime = '',
      wallpaper = null,
      avatar = null,
    } = req.query;

    // Criar canvas
    const W = 1365;
    const H = 618;
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext('2d');

    // Carregar imagens se fornecidas
    let wallpaperImg = null;
    let avatarImg = null;

    if (wallpaper) {
      try {
        wallpaperImg = await loadImage(wallpaper);
      } catch (err) {
        console.error('Erro ao carregar wallpaper:', err);
      }
    }

    if (avatar) {
      try {
        avatarImg = await loadImage(avatar);
      } catch (err) {
        console.error('Erro ao carregar avatar:', err);
      }
    }

    // Desenhar fundo
    if (wallpaperImg) {
      const img = wallpaperImg;
      const r = Math.max(W / img.width, H / img.height);
      const iw = img.width * r;
      const ih = img.height * r;
      const ox = (W - iw) / 2;
      const oy = (H - ih) / 2;
      ctx.drawImage(img, ox, oy, iw, ih);
      
      ctx.fillStyle = "rgba(10, 15, 30, 0.7)";
      ctx.fillRect(0, 0, W, H);
    } else {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#0a1635");
      g.addColorStop(1, "#0a1129");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, H);
      g2.addColorStop(0, "rgba(0, 247, 255, 0.05)");
      g2.addColorStop(1, "rgba(180, 0, 255, 0.05)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);
    }

    // Linhas diagonais
    ctx.strokeStyle = "rgba(0, 247, 255, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(300, 200);
    ctx.moveTo(0, 200);
    ctx.lineTo(320, 300);
    ctx.moveTo(50, H);
    ctx.lineTo(320, 400);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(W, 100);
    ctx.lineTo(W - 300, 200);
    ctx.moveTo(W, 200);
    ctx.lineTo(W - 320, 300);
    ctx.moveTo(W - 50, H);
    ctx.lineTo(W - 320, 400);
    ctx.stroke();

    // Data e hora
    const now = new Date();
    const dateText = datetime.trim()
      ? datetime.split(" - ")[0]
      : now.toLocaleDateString("pt-BR");
    const timeText = datetime.trim()
      ? datetime.split(" - ")[1]
      : now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    // Calendário (esquerda superior)
    ctx.save();
    ctx.translate(30, 30);
    ctx.beginPath();
    ctx.roundRect(0, 0, 22, 24, 4);
    ctx.strokeStyle = "#00f7ff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(0, 0, 22, 6, 4);
    ctx.fillStyle = "#00f7ff";
    ctx.fill();
    ctx.strokeStyle = "rgba(0, 247, 255, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(7, 10);
    ctx.lineTo(7, 20);
    ctx.moveTo(14, 10);
    ctx.lineTo(14, 20);
    ctx.moveTo(3, 14);
    ctx.lineTo(19, 14);
    ctx.stroke();
    ctx.restore();

    ctx.font = "700 16px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 5;
    ctx.fillText(dateText, 62, 42);
    ctx.shadowBlur = 0;

    // Relógio (direita superior)
    ctx.textAlign = "right";
    ctx.font = "700 16px sans-serif";
    ctx.fillText(timeText, W - 60, 42);
    
    ctx.save();
    ctx.translate(W - 30, 30);
    ctx.beginPath();
    ctx.arc(0, 12, 11, 0, Math.PI * 2);
    ctx.strokeStyle = "#00f7ff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = "#00f7ff";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.lineTo(0, 5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.lineTo(6, 12);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 12, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#00f7ff";
    ctx.fill();
    ctx.restore();

    // Avatar central
    const centerX = W / 2;
    const avatarY = H * 0.35;
    const avatarR = 130;

    ctx.save();
    ctx.translate(centerX, avatarY);
    
    const outerR = avatarR + 35;
    ctx.strokeStyle = "rgba(0, 247, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, outerR + 5, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 10;
    ctx.strokeStyle = "#00f7ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, outerR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    ctx.restore();

    // Avatar
    if (avatarImg) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, avatarY, avatarR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      
      const img = avatarImg;
      const r = Math.max((avatarR * 2) / img.width, (avatarR * 2) / img.height);
      const iw = img.width * r;
      const ih = img.height * r;
      ctx.drawImage(img, centerX - iw / 2, avatarY - ih / 2, iw, ih);
      ctx.restore();
      
      ctx.strokeStyle = "#00f7ff";
      ctx.lineWidth = 4;
      ctx.shadowColor = "#00f7ff";
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(centerX, avatarY, avatarR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Nome
    ctx.font = "900 60px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 25;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(name.toUpperCase(), centerX, avatarY + avatarR + 50);
    ctx.shadowBlur = 0;

    // Velocidade
    const speedY = avatarY + avatarR + 120;
    ctx.font = "900 75px sans-serif";
    ctx.fillStyle = "#00f7ff";
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 25;
    ctx.fillText(speed, centerX, speedY);
    ctx.shadowBlur = 0;
    
    // Label
    ctx.font = "700 38px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
    ctx.shadowBlur = 10;
    ctx.fillText(label.toUpperCase(), centerX, speedY + 75);
    ctx.shadowBlur = 0;

    // Sistema
    if (system) {
      const systemY = speedY + 125;
      ctx.font = "600 22px sans-serif";
      ctx.fillStyle = "#00f7ff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "#00f7ff";
      ctx.shadowBlur = 15;
      ctx.fillText(system.toUpperCase(), centerX, systemY);
      ctx.shadowBlur = 0;
    }

    // Gerar PNG
    const buffer = canvas.toBuffer('image/png');

    // Upload para Catbox
    const formData = new FormData();
    const blob = new Blob([buffer], { type: 'image/png' });
    formData.append('file', blob, 'neext-banner.png');

    const uploadResponse = await fetch('https://www.api.neext.online/upload/catbox', {
      method: 'POST',
      body: formData,
    });

    if (uploadResponse.ok) {
      const result = await uploadResponse.json();
      return res.status(200).json({
        success: true,
        url: result.url,
        message: 'Banner gerado e enviado com sucesso!'
      });
    } else {
      // Se o upload falhar, retornar a imagem diretamente
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
      return res.send(buffer);
    }

  } catch (error) {
    console.error('Erro ao gerar banner:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao gerar banner',
      details: error.message
    });
  }
}
