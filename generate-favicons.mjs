import fs from 'fs';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="c-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#cbd5e1" />
    </linearGradient>
    <linearGradient id="p-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="116" fill="url(#bg)" />
  <rect width="508" height="508" x="2" y="2" rx="114" fill="none" stroke="#1e293b" stroke-width="4" />
  
  <g transform="translate(21, 0)">
    <!-- C -->
    <path d="M 230 190 A 76 76 0 1 0 230 322" fill="none" stroke="url(#c-grad)" stroke-width="36" stroke-linecap="round" />
    <!-- P -->
    <path d="M 260 336 L 260 176 L 306 176 A 48 48 0 0 1 306 272 L 260 272" fill="none" stroke="url(#p-grad)" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)" />
  </g>
</svg>`;

async function generateFavicons() {
  const publicDir = './public';
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  // Save SVG
  fs.writeFileSync(`${publicDir}/favicon.svg`, svgContent);

  // Generate PNGs
  const svgBuffer = Buffer.from(svgContent);

  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(`${publicDir}/favicon-16x16.png`);

  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(`${publicDir}/favicon-32x32.png`);

  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(`${publicDir}/apple-touch-icon.png`);

  // Generate ICO
  const icoBuf = await pngToIco([
    `${publicDir}/favicon-16x16.png`,
    `${publicDir}/favicon-32x32.png`
  ]);
  fs.writeFileSync(`${publicDir}/favicon.ico`, icoBuf);

  // Generate webmanifest
  const manifest = {
    name: "Chaithanya Pedhagali",
    short_name: "Chaithanya",
    icons: [
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    theme_color: "#0f172a",
    background_color: "#0f172a",
    display: "standalone"
  };

  fs.writeFileSync(`${publicDir}/site.webmanifest`, JSON.stringify(manifest, null, 2));

  console.log("Favicons generated successfully!");
}

generateFavicons().catch(console.error);
