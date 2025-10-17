import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { Catbox } from 'node-catbox';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync, unlinkSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Registrar fonte Orbitron
try {
  GlobalFonts.registerFromPath(join(__dirname, '..', 'server', 'fonts', 'Orbitron-Bold.ttf'), 'Orbitron');
} catch (e) {
  console.warn('Fonte Orbitron não encontrada');
}

const isValidImageUrl = (url) => {
  if (!url) return true;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    return true;
  } catch {
    return false;
  }
};

async function drawBanner(config) {
  const W = 1365;
  const H = 618;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  let wallpaperImg = null;
  let avatarImg = null;

  try {
    if (config.wallpaper) {
      wallpaperImg = await loadImage(config.wallpaper);
    }
  } catch (e) {
    console.error('Erro ao carregar wallpaper:', e.message);
  }

  try {
    if (config.avatar) {
      avatarImg = await loadImage(config.avatar);
    }
  } catch (e) {
    console.error('Erro ao carregar avatar:', e.message);
  }

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

  const now = new Date();
  const dateText = config.datetime?.trim() 
    ? config.datetime.split(" - ")[0] 
    : now.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const timeText = config.datetime?.trim() 
    ? config.datetime.split(" - ")[1] 
    : now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });

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

  ctx.font = "700 16px Orbitron, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText(dateText, 62, 42);
  ctx.shadowBlur = 0;

  ctx.textAlign = "right";
  ctx.font = "700 16px Orbitron, sans-serif";
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
  
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const leftPanelX = 40;
  const leftPanelY = 90;
  const leftPanelW = 300;
  const leftPanelH = 180;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(leftPanelX, leftPanelY, leftPanelW, leftPanelH, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(leftPanelX + 15, leftPanelY);
  ctx.lineTo(leftPanelX, leftPanelY);
  ctx.lineTo(leftPanelX, leftPanelY + 15);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(leftPanelX + leftPanelW - 15, leftPanelY);
  ctx.lineTo(leftPanelX + leftPanelW, leftPanelY);
  ctx.lineTo(leftPanelX + leftPanelW, leftPanelY + 15);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(leftPanelX + 15, leftPanelY + leftPanelH);
  ctx.lineTo(leftPanelX, leftPanelY + leftPanelH);
  ctx.lineTo(leftPanelX, leftPanelY + leftPanelH - 15);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(leftPanelX + leftPanelW - 15, leftPanelY + leftPanelH);
  ctx.lineTo(leftPanelX + leftPanelW, leftPanelY + leftPanelH);
  ctx.lineTo(leftPanelX + leftPanelW, leftPanelY + leftPanelH - 15);
  ctx.stroke();
  
  const smallAvatarX = leftPanelX + 60;
  const smallAvatarY = leftPanelY + 60;
  const smallAvatarR = 40;
  
  if (avatarImg) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(smallAvatarX, smallAvatarY, smallAvatarR, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    
    const img = avatarImg;
    const r = Math.max((smallAvatarR * 2) / img.width, (smallAvatarR * 2) / img.height);
    const iw = img.width * r;
    const ih = img.height * r;
    ctx.drawImage(img, smallAvatarX - iw / 2, smallAvatarY - ih / 2, iw, ih);
    ctx.restore();
    
    ctx.strokeStyle = "#00f7ff";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
      const x = smallAvatarX + Math.cos(angle) * (smallAvatarR + 5);
      const y = smallAvatarY + Math.sin(angle) * (smallAvatarR + 5);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  
  ctx.font = "700 16px Orbitron, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText((config.name || "NEEXT").toUpperCase(), leftPanelX + 120, leftPanelY + 35);
  ctx.shadowBlur = 0;
  
  ctx.font = "400 10px Orbitron, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillText("▸ ID: 0000000000", leftPanelX + 120, leftPanelY + 55);
  ctx.fillText("▸ VIP: PREMIUM", leftPanelX + 120, leftPanelY + 72);
  ctx.fillText("▸ RANK: #1", leftPanelX + 120, leftPanelY + 89);
  
  ctx.fillStyle = "#00ff9d";
  ctx.beginPath();
  ctx.arc(leftPanelX + 115, leftPanelY + 58, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#00f7ff";
  ctx.beginPath();
  ctx.arc(leftPanelX + 115, leftPanelY + 75, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ff0055";
  ctx.beginPath();
  ctx.arc(leftPanelX + 115, leftPanelY + 92, 3, 0, Math.PI * 2);
  ctx.fill();

  const graphY = leftPanelY + 125;
  const barHeights = [15, 25, 18, 30, 22, 28, 20];
  const barWidth = 8;
  const barGap = 10;
  
  for (let i = 0; i < barHeights.length; i++) {
    ctx.fillStyle = "rgba(0, 247, 255, 0.6)";
    ctx.fillRect(
      leftPanelX + 20 + i * (barWidth + barGap),
      graphY + 30 - barHeights[i],
      barWidth,
      barHeights[i]
    );
  }

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
  
  ctx.strokeStyle = "rgba(0, 247, 255, 0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, outerR - 5, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.restore();
  
  ctx.save();
  if (avatarImg) {
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

    ctx.beginPath();
    ctx.arc(centerX, avatarY, avatarR, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, avatarY, avatarR + 6, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#00f7ff";
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;
  } else {
    ctx.beginPath();
    ctx.arc(centerX, avatarY, avatarR, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.stroke();
  }

  const name = (config.name || "NEEXT").toUpperCase();
  ctx.font = "900 60px Orbitron, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 25;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, centerX, avatarY + avatarR + 50);
  ctx.shadowBlur = 0;

  const speed = String(config.speed || "999");
  const speedY = avatarY + avatarR + 120;
  
  ctx.font = "900 80px Orbitron, sans-serif";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 30;
  
  const gradient = ctx.createLinearGradient(centerX - 100, speedY, centerX + 100, speedY);
  gradient.addColorStop(0, "#00f7ff");
  gradient.addColorStop(1, "#00ff9d");
  ctx.fillStyle = gradient;
  ctx.fillText(speed, centerX, speedY);
  ctx.shadowBlur = 0;

  const label = (config.label || "VELOCIDADE").toUpperCase();
  const labelY = speedY + 80;
  ctx.font = "700 24px Orbitron, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#ffffff";
  ctx.shadowBlur = 15;
  ctx.fillText(label, centerX, labelY);
  ctx.shadowBlur = 0;

  if (config.system?.trim()) {
    const systemY = H - 40;
    ctx.font = "400 14px Orbitron, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText(`SISTEMA: ${config.system.toUpperCase()}`, centerX, systemY);
  }

  return canvas.toBuffer('image/png');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
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

  try {
    const { name, speed, label, system, datetime, wallpaper, avatar } = req.query;

    if (wallpaper && !isValidImageUrl(wallpaper)) {
      return res.status(400).json({
        success: false,
        error: 'URL do wallpaper inválida. Use HTTPS.'
      });
    }

    if (avatar && !isValidImageUrl(avatar)) {
      return res.status(400).json({
        success: false,
        error: 'URL do avatar inválida. Use HTTPS.'
      });
    }

    const config = {
      name: name || 'NEEXT',
      speed: speed || '999',
      label: label || 'VELOCIDADE',
      system: system || '',
      datetime: datetime || '',
      wallpaper: wallpaper || null,
      avatar: avatar || null
    };

    const imageBuffer = await drawBanner(config);
    
    const tempFile = `/tmp/${uuidv4()}.png`;
    writeFileSync(tempFile, imageBuffer);

    try {
      const catbox = new Catbox();
      const catboxUrl = await catbox.upload(tempFile);
      
      unlinkSync(tempFile);

      return res.status(200).json({
        success: true,
        url: catboxUrl,
        timestamp: new Date().toISOString(),
        config: {
          name: config.name,
          speed: config.speed,
          label: config.label,
          system: config.system,
          datetime: config.datetime
        }
      });
    } catch (uploadError) {
      unlinkSync(tempFile);
      throw uploadError;
    }
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
