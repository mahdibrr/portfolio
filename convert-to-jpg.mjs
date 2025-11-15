import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Standard dimensions for all images (16:9 ratio for consistent carousel display)
const TARGET_WIDTH = 1920;
const TARGET_HEIGHT = 1080;

// Process PNG images: resize, enhance, convert to JPG
async function processImage(inputPath, outputPath, filename) {
  try {
    await sharp(inputPath)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: 'cover',
        position: 'top'
      })
      .sharpen({ sigma: 1.5 })
      .jpeg({
        quality: 98,
        chromaSubsampling: '4:4:4',
        mozjpeg: true
      })
      .toFile(outputPath);

    console.log(`✓ Processed: ${filename}`);
  } catch (error) {
    console.error(`✗ Failed to process ${filename}:`, error.message);
  }
}

// Process all PNG images in ghassla directory
async function processNewImages() {
  const sourceDir = 'public/ghassla';
  const outputDir = 'public/ghassla/processed';

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const files = readdirSync(sourceDir);
  const pngFiles = files.filter(f => f.endsWith('.png') && !f.includes('Vid'));

  console.log(`\n📁 Processing ${pngFiles.length} PNG images...\n`);
  console.log(`📐 Target: ${TARGET_WIDTH}x${TARGET_HEIGHT} (16:9)\n`);

  for (let i = 0; i < pngFiles.length; i++) {
    const file = pngFiles[i];
    const inputPath = join(sourceDir, file);
    const num = String(i + 11).padStart(2, '0');
    const outputFilename = `ghassla_${num}.jpg`;
    const outputPath = join(outputDir, outputFilename);

    await processImage(inputPath, outputPath, file);
  }
}

// Main execution
async function main() {
  console.log('🎨 Starting image processing...\n');

  await processNewImages();

  console.log('\n✅ All images processed!');
  console.log(`📊 ${TARGET_WIDTH}x${TARGET_HEIGHT}, 98% quality, 4:4:4 chroma, enhanced sharpening`);
}

main().catch(console.error);
