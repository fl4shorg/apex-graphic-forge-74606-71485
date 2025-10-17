import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

  // Load images if provided
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

  // Draw background
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

  // Draw diagonal connecting lines
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

  // LEFT TOP: Date with calendar icon
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

  // RIGHT TOP: Time with clock icon
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

  // LEFT PANEL: Small avatar + info
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

  // RIGHT TOP PANELS
  const rightPanelBaseX = W - 280;
  const latPanelY = 90;
  const latPanelW = 250;
  const latPanelH = 80;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(rightPanelBaseX, latPanelY, latPanelW, latPanelH, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(rightPanelBaseX + 15, latPanelY);
  ctx.lineTo(rightPanelBaseX, latPanelY);
  ctx.lineTo(rightPanelBaseX, latPanelY + 15);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(rightPanelBaseX + latPanelW - 15, latPanelY);
  ctx.lineTo(rightPanelBaseX + latPanelW, latPanelY);
  ctx.lineTo(rightPanelBaseX + latPanelW, latPanelY + 15);
  ctx.stroke();
  
  ctx.font = "700 13px Orbitron, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText("▸ LATÊNCIA", rightPanelBaseX + 20, latPanelY + 20);
  ctx.shadowBlur = 0;
  
  ctx.save();
  ctx.translate(rightPanelBaseX + 60, latPanelY + 50);
  
  ctx.beginPath();
  ctx.arc(0, 0, 22, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0, 247, 255, 0.2)";
  ctx.lineWidth = 1;
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 3;
  ctx.stroke();
  
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(0, 0, 20, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * 0.02));
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.font = "700 13px Orbitron, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText("2%", 0, 0);
  ctx.shadowBlur = 0;
  ctx.restore();
  
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  // LAPN10AR panel
  const lapPanelY = latPanelY + latPanelH + 20;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(rightPanelBaseX, lapPanelY, latPanelW, latPanelH, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(rightPanelBaseX + latPanelW - 15, lapPanelY + latPanelH);
  ctx.lineTo(rightPanelBaseX + latPanelW, lapPanelY + latPanelH);
  ctx.lineTo(rightPanelBaseX + latPanelW, lapPanelY + latPanelH - 15);
  ctx.stroke();
  
  ctx.font = "700 13px Orbitron, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText("▸ LAPN10AR", rightPanelBaseX + 20, lapPanelY + 20);
  ctx.shadowBlur = 0;
  
  ctx.font = "400 10px Orbitron, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillText("• PING: 15ms", rightPanelBaseX + 20, lapPanelY + 48);
  ctx.fillText("• LOSS: 0%", rightPanelBaseX + 135, lapPanelY + 48);
  
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(rightPanelBaseX + 20, lapPanelY + 60, 100, 4);
  ctx.fillStyle = "#00ff9d";
  ctx.fillRect(rightPanelBaseX + 20, lapPanelY + 60, 85, 4);
  
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(rightPanelBaseX + 135, lapPanelY + 60, 95, 4);
  ctx.fillStyle = "#00f7ff";
  ctx.fillRect(rightPanelBaseX + 135, lapPanelY + 60, 95, 4);

  // LATÊNCIA graph panel
  const latGraphY = lapPanelY + latPanelH + 20;
  const latGraphH = 90;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(rightPanelBaseX, latGraphY, 120, latGraphH, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.font = "700 11px Orbitron, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText("▸ LATÊNCIA", rightPanelBaseX + 12, latGraphY + 15);
  ctx.shadowBlur = 0;
  
  const latBarHeights = [20, 35, 25, 40, 30, 45];
  for (let i = 0; i < latBarHeights.length; i++) {
    const gradient = ctx.createLinearGradient(0, latGraphY + 65, 0, latGraphY + 65 - latBarHeights[i]);
    gradient.addColorStop(0, "rgba(0, 247, 255, 0.3)");
    gradient.addColorStop(1, "rgba(0, 247, 255, 0.9)");
    ctx.fillStyle = gradient;
    ctx.fillRect(rightPanelBaseX + 12 + i * 16, latGraphY + 65 - latBarHeights[i], 10, latBarHeights[i]);
  }

  // UPLOAD panel
  const uploadPanelX = rightPanelBaseX + 130;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(uploadPanelX, latGraphY, 120, latGraphH, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.font = "700 11px Orbitron, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText("▸ UPLOAD", uploadPanelX + 12, latGraphY + 15);
  ctx.shadowBlur = 0;
  
  ctx.save();
  ctx.translate(uploadPanelX + 60, latGraphY + 48);
  ctx.strokeStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 10;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.lineTo(0, 12);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-6, -6);
  ctx.lineTo(0, -12);
  ctx.lineTo(6, -6);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.font = "700 10px Orbitron, sans-serif";
  ctx.fillStyle = "#00ff9d";
  ctx.textAlign = "center";
  ctx.fillText("850 MB/s", 0, 25);
  ctx.restore();
  ctx.textAlign = "left";

  // DOWNLOAD and ESTADO DO SISTEMA panels
  const bottomRightY = latGraphY + latGraphH + 20;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(rightPanelBaseX, bottomRightY, 120, 90, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.font = "700 11px Orbitron, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText("▸ DOWNLOAD", rightPanelBaseX + 12, bottomRightY + 15);
  ctx.shadowBlur = 0;
  
  const dlBarHeights = [25, 40, 30, 35, 45, 28];
  for (let i = 0; i < dlBarHeights.length; i++) {
    const gradient = ctx.createLinearGradient(0, bottomRightY + 70, 0, bottomRightY + 70 - dlBarHeights[i]);
    gradient.addColorStop(0, "rgba(0, 255, 157, 0.3)");
    gradient.addColorStop(1, "rgba(0, 255, 157, 0.9)");
    ctx.fillStyle = gradient;
    ctx.fillRect(rightPanelBaseX + 12 + i * 16, bottomRightY + 70 - dlBarHeights[i], 10, dlBarHeights[i]);
  }
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(uploadPanelX, bottomRightY, 120, 90, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.font = "700 10px Orbitron, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText("▸ ESTADO DO", uploadPanelX + 12, bottomRightY + 12);
  ctx.fillText("  SISTEMA", uploadPanelX + 12, bottomRightY + 25);
  ctx.shadowBlur = 0;
  
  const sysBarWidths = [85, 92, 75];
  const sysBarLabels = ["CPU", "RAM", "GPU"];
  const sysBarY = bottomRightY + 45;
  
  for (let i = 0; i < sysBarWidths.length; i++) {
    ctx.font = "400 8px Orbitron, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText(sysBarLabels[i], uploadPanelX + 12, sysBarY + i * 13 - 2);
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(uploadPanelX + 12, sysBarY + i * 13 + 3, 90, 5);
    
    const gradient = ctx.createLinearGradient(uploadPanelX + 12, 0, uploadPanelX + 12 + 90, 0);
    gradient.addColorStop(0, "#00f7ff");
    gradient.addColorStop(1, "#00ff9d");
    ctx.fillStyle = gradient;
    ctx.fillRect(uploadPanelX + 12, sysBarY + i * 13 + 3, sysBarWidths[i], 5);
  }
  
  ctx.save();
  ctx.translate(uploadPanelX + 100, bottomRightY + 75);
  ctx.shadowColor = "#00ff9d";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#00ff9d";
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.font = "700 8px Orbitron, sans-serif";
  ctx.fillStyle = "#00ff9d";
  ctx.textAlign = "right";
  ctx.fillText("ONLINE", -8, 1);
  ctx.restore();
  ctx.textAlign = "left";

  // CENTER: Main avatar with decorative ring
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
  
  ctx.strokeStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 8;
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const startR = outerR - 8;
    const endR = outerR - (i % 3 === 0 ? 1 : i % 3 === 1 ? 4 : 7);
    
    ctx.lineWidth = i % 3 === 0 ? 3 : 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * startR, Math.sin(angle) * startR);
    ctx.lineTo(Math.cos(angle) * endR, Math.sin(angle) * endR);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
  
  ctx.font = "700 9px Orbitron, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  const techTexts = ["SYS", "NET", "CPU", "GPU", "RAM", "HDD", "API", "WEB"];
  for (let i = 0; i < techTexts.length; i++) {
    const angle = (i / techTexts.length) * Math.PI * 2 - Math.PI / 2;
    const textR = outerR + 18;
    ctx.save();
    ctx.translate(Math.cos(angle) * textR, Math.sin(angle) * textR);
    ctx.rotate(angle + Math.PI / 2);
    
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 5;
    ctx.fillStyle = "#00f7ff";
    ctx.fillText(techTexts[i], 0, 0);
    ctx.shadowBlur = 0;
    
    ctx.restore();
  }
  
  ctx.restore();
  
  // Draw main avatar
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
    
    ctx.beginPath();
    ctx.arc(centerX, avatarY, avatarR - 3, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0, 247, 255, 0.5)";
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(centerX, avatarY, avatarR, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.stroke();
  }

  // Robot icon
  const name = (config.name || "NEEXT").toUpperCase();
  ctx.font = "900 60px Orbitron, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const nameWidth = ctx.measureText(name).width;
  const robotIconX = centerX - nameWidth / 2 - 45;

  ctx.save();
  ctx.translate(robotIconX, avatarY + avatarR + 60);
  
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.roundRect(0, 0, 30, 38, 4);
  ctx.fillStyle = "#00f7ff";
  ctx.fill();
  ctx.shadowBlur = 0;
  
  ctx.beginPath();
  ctx.roundRect(4, -14, 22, 18, 3);
  ctx.fillStyle = "#00f7ff";
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(11, -7, 2.5, 0, Math.PI * 2);
  ctx.arc(19, -7, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(15, -14);
  ctx.lineTo(15, -22);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(15, -23, 3, 0, Math.PI * 2);
  ctx.fillStyle = "#ff0055";
  ctx.shadowColor = "#ff0055";
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.shadowBlur = 0;
  
  ctx.restore();

  // Name
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 25;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, centerX, avatarY + avatarR + 50);
  ctx.shadowBlur = 0;

  // Speed with decorative frame
  const speed = String(config.speed || "999");
  const speedY = avatarY + avatarR + 120;
  
  const frameGradient = ctx.createLinearGradient(centerX - 160, speedY, centerX + 160, speedY);
  frameGradient.addColorStop(0, "rgba(0, 247, 255, 0.05)");
  frameGradient.addColorStop(0.5, "rgba(0, 247, 255, 0.15)");
  frameGradient.addColorStop(1, "rgba(0, 247, 255, 0.05)");
  ctx.fillStyle = frameGradient;
  ctx.fillRect(centerX - 160, speedY - 15, 320, 85);
  
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 10;
  
  ctx.beginPath();
  ctx.moveTo(centerX - 160, speedY - 15);
  ctx.lineTo(centerX - 130, speedY - 15);
  ctx.moveTo(centerX - 160, speedY - 15);
  ctx.lineTo(centerX - 160, speedY + 5);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(centerX + 130, speedY - 15);
  ctx.lineTo(centerX + 160, speedY - 15);
  ctx.moveTo(centerX + 160, speedY - 15);
  ctx.lineTo(centerX + 160, speedY + 5);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(centerX - 160, speedY + 70);
  ctx.lineTo(centerX - 130, speedY + 70);
  ctx.moveTo(centerX - 160, speedY + 70);
  ctx.lineTo(centerX - 160, speedY + 60);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(centerX + 130, speedY + 70);
  ctx.lineTo(centerX + 160, speedY + 70);
  ctx.moveTo(centerX + 160, speedY + 70);
  ctx.lineTo(centerX + 160, speedY + 60);
  ctx.stroke();
  
  ctx.shadowBlur = 0;
  
  ctx.font = "900 75px Orbitron, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 25;
  ctx.fillText(speed, centerX, speedY);
  ctx.shadowBlur = 0;
  
  ctx.save();
  ctx.translate(centerX - 190, speedY + 35);
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 8;
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgba(0, 247, 255, ${0.8 - i * 0.2})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(i * 12, -12);
    ctx.lineTo(i * 12 + 12, 0);
    ctx.lineTo(i * 12, 12);
    ctx.stroke();
  }
  ctx.restore();
  
  ctx.save();
  ctx.translate(centerX + 190, speedY + 35);
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgba(0, 247, 255, ${0.8 - i * 0.2})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-i * 12, -12);
    ctx.lineTo(-i * 12 - 12, 0);
    ctx.lineTo(-i * 12, 12);
    ctx.stroke();
  }
  ctx.restore();
  ctx.shadowBlur = 0;

  // Label
  const label = (config.label || "VELOCIDADE").toUpperCase();
  ctx.font = "700 38px Orbitron, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
  ctx.shadowBlur = 10;
  ctx.fillText(label, centerX, speedY + 75);
  ctx.shadowBlur = 0;

  // System
  const system = (config.system || "").toUpperCase();
  if (system) {
    const systemY = speedY + 125;
    
    ctx.font = "600 22px Orbitron, sans-serif";
    const systemTextWidth = ctx.measureText(system).width;
    const iconX = centerX - systemTextWidth / 2 - 30;
    
    ctx.save();
    ctx.translate(iconX, systemY);
    ctx.strokeStyle = "#00f7ff";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 8;
    
    ctx.beginPath();
    ctx.roundRect(-8, -6, 16, 12, 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(-3, 6);
    ctx.lineTo(-3, 9);
    ctx.lineTo(3, 9);
    ctx.lineTo(3, 6);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(-5, 9);
    ctx.lineTo(5, 9);
    ctx.lineWidth = 2.5;
    ctx.stroke();
    
    ctx.fillStyle = "rgba(0, 247, 255, 0.3)";
    ctx.fillRect(-6, -4, 12, 8);
    
    ctx.restore();
    ctx.shadowBlur = 0;
    
    ctx.fillStyle = "#00f7ff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 15;
    ctx.fillText(system, centerX, systemY);
    ctx.shadowBlur = 0;
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
    
    // Retorna a imagem diretamente
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Content-Disposition', `inline; filename="banner-${config.name}-${config.speed}.png"`);
    
    return res.status(200).send(imageBuffer);
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
