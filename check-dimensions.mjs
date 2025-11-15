import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join } from 'path';

async function checkDimensions() {
  const processedDir = 'public/ghassla/processed';
  const files = readdirSync(processedDir);
  const jpgFiles = files.filter(f => f.endsWith('.jpg') && f.startsWith('ghassla_1'));

  console.log('📐 Verifying processed images:\n');

  for (const file of jpgFiles) {
    const filePath = join(processedDir, file);
    const metadata = await sharp(filePath).metadata();
    console.log(`${file}: ${metadata.width}x${metadata.height}`);
  }
}

checkDimensions().catch(console.error);
