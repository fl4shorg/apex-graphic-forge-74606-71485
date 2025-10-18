import express from 'express';
import cors from 'cors';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import FormData from 'form-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 3001;

const orbitronFontBase64 = readFileSync(join(__dirname, 'fonts', 'Orbitron-Bold.ttf')).toString('base64');

console.log('✅ Servidor iniciado com sharp para geração de imagens');

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

async function loadImageAsBase64(url) {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    return `data:${contentType};base64,${base64}`;
  } catch (e) {
    console.error('Erro ao carregar imagem:', e.message);
    return null;
  }
}

async function uploadToCatbox(imageBuffer, filename) {
  try {
    const form = new FormData();
    form.append('file', imageBuffer, {
      filename: filename,
      contentType: 'image/png'
    });

    const response = await fetch('https://www.api.neext.online/upload/catbox', {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Catbox upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.url || data.link || data;
  } catch (e) {
    console.error('Erro ao fazer upload para Catbox:', e.message);
    throw e;
  }
}

function generateBannerSVG(config, wallpaperBase64, avatarBase64) {
  const W = 1365;
  const H = 618;

  const now = new Date();
  const dateText = config.datetime?.trim() 
    ? config.datetime.split(" - ")[0] 
    : now.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const timeText = config.datetime?.trim() 
    ? config.datetime.split(" - ")[1] 
    : now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });

  const name = (config.name || "NEEXT").toUpperCase();
  const speed = String(config.speed || "999");

  const leftPanelX = 40;
  const leftPanelY = 90;
  const leftPanelW = 300;
  const leftPanelH = 180;

  const rightPanelBaseX = W - 280;
  const latPanelY = 90;
  const latPanelW = 250;
  const latPanelH = 80;

  const centerX = W / 2;
  const avatarY = H * 0.35;
  const avatarR = 130;
  const outerR = avatarR + 35;

  const smallAvatarX = leftPanelX + 60;
  const smallAvatarY = leftPanelY + 60;
  const smallAvatarR = 40;

  const lapPanelY = latPanelY + latPanelH + 20;
  const latGraphY = lapPanelY + latPanelH + 20;
  const latGraphH = 90;
  const uploadPanelX = rightPanelBaseX + 130;
  const bottomRightY = latGraphY + latGraphH + 20;

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style>
      @font-face {
        font-family: 'Orbitron';
        src: url(data:font/truetype;charset=utf-8;base64,${orbitronFontBase64}) format('truetype');
        font-weight: 400 900;
      }
      text { font-family: 'Orbitron', sans-serif; }
    </style>
    
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0a1635;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a1129;stop-opacity:1" />
    </linearGradient>
    
    <radialGradient id="bgRadial" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:rgba(0,247,255,0.05);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(180,0,255,0.05);stop-opacity:1" />
    </radialGradient>
    
    <filter id="glow">
      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <filter id="strongGlow">
      <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <filter id="textGlow">
      <feGaussianBlur stdDeviation="25" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgba(0,247,255,0.05);stop-opacity:1" />
      <stop offset="50%" style="stop-color:rgba(0,247,255,0.15);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(0,247,255,0.05);stop-opacity:1" />
    </linearGradient>
    
    <linearGradient id="sysGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00f7ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00ff9d;stop-opacity:1" />
    </linearGradient>
    
    <clipPath id="smallAvatarClip">
      <circle cx="${smallAvatarX}" cy="${smallAvatarY}" r="${smallAvatarR}" />
    </clipPath>
    
    <clipPath id="mainAvatarClip">
      <circle cx="${centerX}" cy="${avatarY}" r="${avatarR}" />
    </clipPath>
  </defs>
  
  <!-- Background -->`;

  if (wallpaperBase64) {
    svg += `
  <image href="${wallpaperBase64}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="rgba(10,15,30,0.7)"/>`;
  } else {
    svg += `
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#bgGradient)"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#bgRadial)"/>`;
  }

  svg += `
  
  <!-- Diagonal connecting lines -->
  <line x1="0" y1="100" x2="300" y2="200" stroke="rgba(0,247,255,0.3)" stroke-width="2"/>
  <line x1="0" y1="200" x2="320" y2="300" stroke="rgba(0,247,255,0.3)" stroke-width="2"/>
  <line x1="50" y1="${H}" x2="320" y2="400" stroke="rgba(0,247,255,0.3)" stroke-width="2"/>
  
  <line x1="${W}" y1="100" x2="${W - 300}" y2="200" stroke="rgba(0,247,255,0.3)" stroke-width="2"/>
  <line x1="${W}" y1="200" x2="${W - 320}" y2="300" stroke="rgba(0,247,255,0.3)" stroke-width="2"/>
  <line x1="${W - 50}" y1="${H}" x2="${W - 320}" y2="400" stroke="rgba(0,247,255,0.3)" stroke-width="2"/>
  
  <!-- LEFT TOP: Date icon -->
  <rect x="30" y="30" width="22" height="24" rx="4" stroke="#00f7ff" stroke-width="2" fill="none"/>
  <rect x="30" y="30" width="22" height="6" rx="4" fill="#00f7ff"/>
  <line x1="37" y1="40" x2="37" y2="50" stroke="rgba(0,247,255,0.4)" stroke-width="1"/>
  <line x1="44" y1="40" x2="44" y2="50" stroke="rgba(0,247,255,0.4)" stroke-width="1"/>
  <line x1="33" y1="44" x2="49" y2="44" stroke="rgba(0,247,255,0.4)" stroke-width="1"/>
  
  <text x="62" y="47" font-size="16" font-weight="700" fill="#ffffff" filter="url(#glow)">${dateText}</text>
  
  <!-- RIGHT TOP: Time icon -->
  <circle cx="${W - 30}" cy="42" r="11" stroke="#00f7ff" stroke-width="2" fill="none"/>
  <line x1="${W - 30}" y1="42" x2="${W - 30}" y2="35" stroke="#00f7ff" stroke-width="1.5"/>
  <line x1="${W - 30}" y1="42" x2="${W - 24}" y2="42" stroke="#00f7ff" stroke-width="1.5"/>
  <circle cx="${W - 30}" cy="42" r="2" fill="#00f7ff"/>
  
  <text x="${W - 60}" y="47" font-size="16" font-weight="700" fill="#ffffff" text-anchor="end" filter="url(#glow)">${timeText}</text>
  
  <!-- LEFT PANEL: Small avatar + info -->
  <rect x="${leftPanelX}" y="${leftPanelY}" width="${leftPanelW}" height="${leftPanelH}" rx="15" 
        stroke="#00f7ff" stroke-width="2" fill="none" filter="url(#strongGlow)"/>
  
  <!-- Left panel corner highlights -->
  <path d="M ${leftPanelX + 15} ${leftPanelY} L ${leftPanelX} ${leftPanelY} L ${leftPanelX} ${leftPanelY + 15}" 
        stroke="#00f7ff" stroke-width="3" fill="none"/>
  <path d="M ${leftPanelX + leftPanelW - 15} ${leftPanelY} L ${leftPanelX + leftPanelW} ${leftPanelY} L ${leftPanelX + leftPanelW} ${leftPanelY + 15}" 
        stroke="#00f7ff" stroke-width="3" fill="none"/>
  <path d="M ${leftPanelX + 15} ${leftPanelY + leftPanelH} L ${leftPanelX} ${leftPanelY + leftPanelH} L ${leftPanelX} ${leftPanelY + leftPanelH - 15}" 
        stroke="#00f7ff" stroke-width="3" fill="none"/>
  <path d="M ${leftPanelX + leftPanelW - 15} ${leftPanelY + leftPanelH} L ${leftPanelX + leftPanelW} ${leftPanelY + leftPanelH} L ${leftPanelX + leftPanelW} ${leftPanelY + leftPanelH - 15}" 
        stroke="#00f7ff" stroke-width="3" fill="none"/>
  `;

  if (avatarBase64) {
    svg += `
  <image href="${avatarBase64}" x="${smallAvatarX - smallAvatarR}" y="${smallAvatarY - smallAvatarR}" 
         width="${smallAvatarR * 2}" height="${smallAvatarR * 2}" preserveAspectRatio="xMidYMid slice"
         clip-path="url(#smallAvatarClip)"/>
  <polygon points="${Array.from({length: 6}, (_, i) => {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    const x = smallAvatarX + Math.cos(angle) * (smallAvatarR + 5);
    const y = smallAvatarY + Math.sin(angle) * (smallAvatarR + 5);
    return `${x},${y}`;
  }).join(' ')}" stroke="#00f7ff" stroke-width="2" fill="none" filter="url(#strongGlow)"/>`;
  }

  svg += `
  
  <text x="${leftPanelX + 120}" y="${leftPanelY + 40}" font-size="16" font-weight="700" 
        fill="#00f7ff" filter="url(#glow)">${name}</text>
  
  <text x="${leftPanelX + 120}" y="${leftPanelY + 60}" font-size="10" font-weight="400" 
        fill="rgba(255,255,255,0.7)">▸ ID: 0000000000</text>
  <text x="${leftPanelX + 120}" y="${leftPanelY + 77}" font-size="10" font-weight="400" 
        fill="rgba(255,255,255,0.7)">▸ VIP: PREMIUM</text>
  <text x="${leftPanelX + 120}" y="${leftPanelY + 94}" font-size="10" font-weight="400" 
        fill="rgba(255,255,255,0.7)">▸ RANK: #1</text>
  
  <circle cx="${leftPanelX + 115}" cy="${leftPanelY + 58}" r="3" fill="#00ff9d"/>
  <circle cx="${leftPanelX + 115}" cy="${leftPanelY + 75}" r="3" fill="#00f7ff"/>
  <circle cx="${leftPanelX + 115}" cy="${leftPanelY + 92}" r="3" fill="#ff0055"/>
  `;

  const graphY = leftPanelY + 125;
  const barHeights = [15, 25, 18, 30, 22, 28, 20];
  const barWidth = 8;
  const barGap = 10;
  for (let i = 0; i < barHeights.length; i++) {
    svg += `
  <rect x="${leftPanelX + 20 + i * (barWidth + barGap)}" y="${graphY + 30 - barHeights[i]}" 
        width="${barWidth}" height="${barHeights[i]}" fill="rgba(0,247,255,0.6)"/>`;
  }

  svg += `
  
  <!-- RIGHT TOP PANELS -->
  <!-- LATÊNCIA panel -->
  <rect x="${rightPanelBaseX}" y="${latPanelY}" width="${latPanelW}" height="${latPanelH}" rx="15" 
        stroke="#00f7ff" stroke-width="2" fill="none" filter="url(#strongGlow)"/>
  <path d="M ${rightPanelBaseX + 15} ${latPanelY} L ${rightPanelBaseX} ${latPanelY} L ${rightPanelBaseX} ${latPanelY + 15}" 
        stroke="#00f7ff" stroke-width="3" fill="none"/>
  <path d="M ${rightPanelBaseX + latPanelW - 15} ${latPanelY} L ${rightPanelBaseX + latPanelW} ${latPanelY} L ${rightPanelBaseX + latPanelW} ${latPanelY + 15}" 
        stroke="#00f7ff" stroke-width="3" fill="none"/>
  
  <text x="${rightPanelBaseX + 20}" y="${latPanelY + 25}" font-size="13" font-weight="700" 
        fill="#00f7ff" filter="url(#glow)">▸ LATÊNCIA</text>
  
  <circle cx="${rightPanelBaseX + 60}" cy="${latPanelY + 50}" r="22" stroke="rgba(0,247,255,0.2)" stroke-width="1" fill="none"/>
  <circle cx="${rightPanelBaseX + 60}" cy="${latPanelY + 50}" r="20" stroke="rgba(255,255,255,0.15)" stroke-width="3" fill="none"/>
  <path d="M ${rightPanelBaseX + 60} ${latPanelY + 30} A 20 20 0 0 1 ${rightPanelBaseX + 61.25} ${latPanelY + 30.13}" 
        stroke="#00f7ff" stroke-width="3" fill="none" filter="url(#strongGlow)"/>
  
  <text x="${rightPanelBaseX + 60}" y="${latPanelY + 55}" font-size="13" font-weight="700" 
        fill="#00f7ff" text-anchor="middle" filter="url(#glow)">2%</text>
  
  <!-- LAPN10AR panel -->
  <rect x="${rightPanelBaseX}" y="${lapPanelY}" width="${latPanelW}" height="${latPanelH}" rx="15" 
        stroke="#00f7ff" stroke-width="2" fill="none" filter="url(#strongGlow)"/>
  <path d="M ${rightPanelBaseX + latPanelW - 15} ${lapPanelY + latPanelH} L ${rightPanelBaseX + latPanelW} ${lapPanelY + latPanelH} L ${rightPanelBaseX + latPanelW} ${lapPanelY + latPanelH - 15}" 
        stroke="#00f7ff" stroke-width="3" fill="none"/>
  
  <text x="${rightPanelBaseX + 20}" y="${lapPanelY + 25}" font-size="13" font-weight="700" 
        fill="#00f7ff" filter="url(#glow)">▸ LAPN10AR</text>
  
  <text x="${rightPanelBaseX + 20}" y="${lapPanelY + 53}" font-size="10" font-weight="400" 
        fill="rgba(255,255,255,0.7)">• PING: 15ms</text>
  <text x="${rightPanelBaseX + 135}" y="${lapPanelY + 53}" font-size="10" font-weight="400" 
        fill="rgba(255,255,255,0.7)">• LOSS: 0%</text>
  
  <rect x="${rightPanelBaseX + 20}" y="${lapPanelY + 60}" width="100" height="4" fill="rgba(255,255,255,0.1)"/>
  <rect x="${rightPanelBaseX + 20}" y="${lapPanelY + 60}" width="85" height="4" fill="#00ff9d"/>
  
  <rect x="${rightPanelBaseX + 135}" y="${lapPanelY + 60}" width="95" height="4" fill="rgba(255,255,255,0.1)"/>
  <rect x="${rightPanelBaseX + 135}" y="${lapPanelY + 60}" width="95" height="4" fill="#00f7ff"/>
  
  <!-- LATÊNCIA graph panel -->
  <rect x="${rightPanelBaseX}" y="${latGraphY}" width="120" height="${latGraphH}" rx="15" 
        stroke="#00f7ff" stroke-width="2" fill="none" filter="url(#strongGlow)"/>
  
  <text x="${rightPanelBaseX + 12}" y="${latGraphY + 20}" font-size="11" font-weight="700" 
        fill="#00f7ff" filter="url(#glow)">▸ LATÊNCIA</text>
  `;

  const latBarHeights = [20, 35, 25, 40, 30, 45];
  for (let i = 0; i < latBarHeights.length; i++) {
    svg += `
  <defs>
    <linearGradient id="latBar${i}" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:rgba(0,247,255,0.3);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(0,247,255,0.9);stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect x="${rightPanelBaseX + 12 + i * 16}" y="${latGraphY + 65 - latBarHeights[i]}" 
        width="10" height="${latBarHeights[i]}" fill="url(#latBar${i})"/>`;
  }

  svg += `
  
  <!-- UPLOAD panel -->
  <rect x="${uploadPanelX}" y="${latGraphY}" width="120" height="${latGraphH}" rx="15" 
        stroke="#00f7ff" stroke-width="2" fill="none" filter="url(#strongGlow)"/>
  
  <text x="${uploadPanelX + 12}" y="${latGraphY + 20}" font-size="11" font-weight="700" 
        fill="#00f7ff" filter="url(#glow)">▸ UPLOAD</text>
  
  <g transform="translate(${uploadPanelX + 60}, ${latGraphY + 48})" filter="url(#strongGlow)">
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#00f7ff" stroke-width="2.5"/>
    <polyline points="-6,-6 0,-12 6,-6" stroke="#00f7ff" stroke-width="2.5" fill="none"/>
  </g>
  
  <text x="${uploadPanelX + 60}" y="${latGraphY + 73}" font-size="10" font-weight="700" 
        fill="#00ff9d" text-anchor="middle">850 MB/s</text>
  
  <!-- DOWNLOAD panel -->
  <rect x="${rightPanelBaseX}" y="${bottomRightY}" width="120" height="90" rx="15" 
        stroke="#00f7ff" stroke-width="2" fill="none" filter="url(#strongGlow)"/>
  
  <text x="${rightPanelBaseX + 12}" y="${bottomRightY + 20}" font-size="11" font-weight="700" 
        fill="#00f7ff" filter="url(#glow)">▸ DOWNLOAD</text>
  `;

  const dlBarHeights = [25, 40, 30, 35, 45, 28];
  for (let i = 0; i < dlBarHeights.length; i++) {
    svg += `
  <defs>
    <linearGradient id="dlBar${i}" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:rgba(0,255,157,0.3);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(0,255,157,0.9);stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect x="${rightPanelBaseX + 12 + i * 16}" y="${bottomRightY + 70 - dlBarHeights[i]}" 
        width="10" height="${dlBarHeights[i]}" fill="url(#dlBar${i})"/>`;
  }

  svg += `
  
  <!-- ESTADO DO SISTEMA panel -->
  <rect x="${uploadPanelX}" y="${bottomRightY}" width="120" height="90" rx="15" 
        stroke="#00f7ff" stroke-width="2" fill="none" filter="url(#strongGlow)"/>
  
  <text x="${uploadPanelX + 12}" y="${bottomRightY + 17}" font-size="10" font-weight="700" 
        fill="#00f7ff" filter="url(#glow)">▸ ESTADO DO</text>
  <text x="${uploadPanelX + 12}" y="${bottomRightY + 30}" font-size="10" font-weight="700" 
        fill="#00f7ff" filter="url(#glow)">  SISTEMA</text>
  `;

  const sysBarWidths = [85, 92, 75];
  const sysBarLabels = ["CPU", "RAM", "GPU"];
  const sysBarY = bottomRightY + 45;
  for (let i = 0; i < sysBarWidths.length; i++) {
    svg += `
  <text x="${uploadPanelX + 12}" y="${sysBarY + i * 13 + 1}" font-size="8" font-weight="400" 
        fill="rgba(255,255,255,0.6)">${sysBarLabels[i]}</text>
  <rect x="${uploadPanelX + 12}" y="${sysBarY + i * 13 + 3}" width="90" height="5" fill="rgba(255,255,255,0.1)"/>
  <rect x="${uploadPanelX + 12}" y="${sysBarY + i * 13 + 3}" width="${sysBarWidths[i]}" height="5" fill="url(#sysGradient)"/>`;
  }

  svg += `
  
  <circle cx="${uploadPanelX + 100}" cy="${bottomRightY + 75}" r="4" fill="#00ff9d" filter="url(#strongGlow)"/>
  <text x="${uploadPanelX + 92}" y="${bottomRightY + 76}" font-size="8" font-weight="700" 
        fill="#00ff9d" text-anchor="end">${(config.system || 'ONLINE').toUpperCase()}</text>
  
  <!-- CENTER: Main avatar with decorative ring -->
  <circle cx="${centerX}" cy="${avatarY}" r="${outerR + 5}" stroke="rgba(0,247,255,0.2)" stroke-width="1" fill="none"/>
  <circle cx="${centerX}" cy="${avatarY}" r="${outerR}" stroke="#00f7ff" stroke-width="2" fill="none" filter="url(#strongGlow)"/>
  <circle cx="${centerX}" cy="${avatarY}" r="${outerR - 5}" stroke="rgba(0,247,255,0.3)" stroke-width="1" fill="none"/>
  `;

  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const startR = outerR - 8;
    const endR = outerR - (i % 3 === 0 ? 1 : i % 3 === 1 ? 4 : 7);
    const strokeWidth = i % 3 === 0 ? 3 : 2;
    const x1 = centerX + Math.cos(angle) * startR;
    const y1 = avatarY + Math.sin(angle) * startR;
    const x2 = centerX + Math.cos(angle) * endR;
    const y2 = avatarY + Math.sin(angle) * endR;
    svg += `
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#00f7ff" stroke-width="${strokeWidth}" filter="url(#glow)"/>`;
  }

  const techTexts = ["SYS", "NET", "CPU", "GPU", "RAM", "HDD", "API", "WEB"];
  for (let i = 0; i < techTexts.length; i++) {
    const angle = (i / techTexts.length) * Math.PI * 2 - Math.PI / 2;
    const textR = outerR + 18;
    const x = centerX + Math.cos(angle) * textR;
    const y = avatarY + Math.sin(angle) * textR;
    const rotation = ((angle + Math.PI / 2) * 180 / Math.PI);
    svg += `
  <text x="${x}" y="${y}" font-size="9" font-weight="700" fill="#00f7ff" 
        text-anchor="middle" dominant-baseline="middle" 
        transform="rotate(${rotation}, ${x}, ${y})" 
        filter="url(#glow)">${techTexts[i]}</text>`;
  }

  if (avatarBase64) {
    svg += `
  <image href="${avatarBase64}" x="${centerX - avatarR}" y="${avatarY - avatarR}" 
         width="${avatarR * 2}" height="${avatarR * 2}" preserveAspectRatio="xMidYMid slice"
         clip-path="url(#mainAvatarClip)"/>
  <circle cx="${centerX}" cy="${avatarY}" r="${avatarR}" stroke="rgba(255,255,255,0.9)" stroke-width="6" fill="none"/>
  <circle cx="${centerX}" cy="${avatarY}" r="${avatarR + 6}" stroke="#00f7ff" stroke-width="3" fill="none" filter="url(#strongGlow)"/>
  <circle cx="${centerX}" cy="${avatarY}" r="${avatarR - 3}" stroke="rgba(0,247,255,0.5)" stroke-width="1" fill="none"/>`;
  } else {
    svg += `
  <circle cx="${centerX}" cy="${avatarY}" r="${avatarR}" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" stroke-width="4"/>`;
  }

  const robotIconX = centerX - 15;
  const robotIconY = avatarY + avatarR + 60;

  svg += `
  
  <!-- Robot icon -->
  <g transform="translate(${robotIconX}, ${robotIconY})">
    <rect x="0" y="0" width="30" height="38" rx="4" fill="#00f7ff" filter="url(#strongGlow)"/>
    <rect x="4" y="-14" width="22" height="18" rx="3" fill="#00f7ff"/>
    <circle cx="11" cy="-7" r="2.5" fill="#000"/>
    <circle cx="19" cy="-7" r="2.5" fill="#000"/>
    <line x1="15" y1="-14" x2="15" y2="-22" stroke="#00f7ff" stroke-width="2"/>
    <circle cx="15" cy="-23" r="3" fill="#ff0055" filter="url(#strongGlow)"/>
  </g>
  
  <!-- Name -->
  <text x="${centerX}" y="${avatarY + avatarR + 60}" font-size="60" font-weight="900" 
        fill="#ffffff" text-anchor="middle" filter="url(#textGlow)">${name}</text>
  
  <!-- Speed with decorative frame -->
  <rect x="${centerX - 160}" y="${avatarY + avatarR + 105}" width="320" height="85" fill="url(#frameGradient)"/>
  
  <g transform="translate(${centerX - 150}, ${avatarY + avatarR + 110})">
    <polyline points="0,0 15,0 20,5 20,15" stroke="#00f7ff" stroke-width="2" fill="none"/>
    <polyline points="0,15 0,5 5,0 15,0" stroke="#00f7ff" stroke-width="2" fill="none"/>
  </g>
  <g transform="translate(${centerX + 150}, ${avatarY + avatarR + 110})">
    <polyline points="0,0 -15,0 -20,5 -20,15" stroke="#00f7ff" stroke-width="2" fill="none"/>
    <polyline points="0,15 0,5 -5,0 -15,0" stroke="#00f7ff" stroke-width="2" fill="none"/>
  </g>
  <g transform="translate(${centerX - 150}, ${avatarY + avatarR + 185})">
    <polyline points="0,0 15,0 20,-5 20,-15" stroke="#00f7ff" stroke-width="2" fill="none"/>
    <polyline points="0,-15 0,-5 5,0 15,0" stroke="#00f7ff" stroke-width="2" fill="none"/>
  </g>
  <g transform="translate(${centerX + 150}, ${avatarY + avatarR + 185})">
    <polyline points="0,0 -15,0 -20,-5 -20,-15" stroke="#00f7ff" stroke-width="2" fill="none"/>
    <polyline points="0,-15 0,-5 -5,0 -15,0" stroke="#00f7ff" stroke-width="2" fill="none"/>
  </g>
  
  <text x="${centerX}" y="${avatarY + avatarR + 150}" font-size="80" font-weight="900" 
        fill="#00f7ff" text-anchor="middle" filter="url(#textGlow)">${speed}</text>
  
  <!-- Label below speed -->
  <text x="${centerX}" y="${avatarY + avatarR + 180}" font-size="26" font-weight="700" 
        fill="#ffffff" text-anchor="middle" letter-spacing="2" filter="url(#glow)">${(config.label || 'VELOCIDADE').toUpperCase()}</text>
  
</svg>`;

  return svg;
}

async function drawBanner(config) {
  let wallpaperBase64 = null;
  let avatarBase64 = null;

  if (config.wallpaper) {
    wallpaperBase64 = await loadImageAsBase64(config.wallpaper);
  }

  if (config.avatar) {
    avatarBase64 = await loadImageAsBase64(config.avatar);
  }

  const svgString = generateBannerSVG(config, wallpaperBase64, avatarBase64);
  
  const imageBuffer = await sharp(Buffer.from(svgString))
    .png()
    .toBuffer();

  return imageBuffer;
}

app.post('/api/generate', async (req, res) => {
  try {
    const { name, speed, label, system, datetime, wallpaper, avatar } = req.body;

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
      system: system || 'ONLINE',
      datetime: datetime,
      wallpaper: wallpaper,
      avatar: avatar
    };

    console.log('🎨 Gerando banner com Sharp...');
    const imageBuffer = await drawBanner(config);
    
    console.log('📤 Fazendo upload para Catbox...');
    const catboxUrl = await uploadToCatbox(imageBuffer, `banner-${config.name}-${config.speed}.png`);
    
    console.log('✅ Banner gerado e enviado:', catboxUrl);

    return res.status(200).json({
      success: true,
      url: catboxUrl,
      timestamp: new Date().toISOString(),
      config: {
        name: config.name,
        speed: config.speed,
        label: config.label,
        system: config.system,
        datetime: config.datetime || ''
      }
    });
  } catch (error) {
    console.error('❌ Erro ao gerar banner:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/banner', async (req, res) => {
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
      system: system || 'ONLINE',
      datetime: datetime,
      wallpaper: wallpaper,
      avatar: avatar
    };

    const imageBuffer = await drawBanner(config);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Content-Disposition', `inline; filename="banner-${config.name}-${config.speed}.png"`);
    
    return res.status(200).send(imageBuffer);
  } catch (error) {
    console.error('Erro ao gerar banner:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'NEEXT Banner API com Sharp',
    endpoint: '/api/banner',
    method: 'GET ou POST',
    params: {
      name: 'Nome do usuário',
      speed: 'Velocidade',
      label: 'Rótulo inferior',
      system: 'Status do sistema',
      datetime: 'Data e hora customizados',
      wallpaper: 'URL do wallpaper',
      avatar: 'URL do avatar'
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API rodando em http://0.0.0.0:${PORT}`);
});
