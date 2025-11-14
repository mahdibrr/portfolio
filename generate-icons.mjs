import sharp from 'sharp';
import { readFileSync } from 'fs';

// Read the SVG icon
const svgBuffer = readFileSync('public/icon.svg');

// Generate icon-light-32x32.png (for light mode)
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile('public/icon-light-32x32.png');

console.log('✓ Created icon-light-32x32.png');

// Generate icon-dark-32x32.png (for dark mode)
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile('public/icon-dark-32x32.png');

console.log('✓ Created icon-dark-32x32.png');

// Generate apple-icon.png (180x180 for Apple devices)
await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile('public/apple-icon.png');

console.log('✓ Created apple-icon.png');

// Generate larger sizes for better quality
await sharp(svgBuffer)
  .resize(192, 192)
  .png()
  .toFile('public/icon-192.png');

console.log('✓ Created icon-192.png');

await sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile('public/icon-512.png');

console.log('✓ Created icon-512.png');

console.log('\n✅ All icon files generated successfully!');
