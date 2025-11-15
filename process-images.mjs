import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Standard dimensions for all images (16:9 ratio for consistent carousel display)
const TARGET_WIDTH = 1920;
const TARGET_HEIGHT = 1080;

async function processImage(inputPath, outputPath, filename) {
  try {
    await sharp(inputPath)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: 'cover', // Crop to fill the exact dimensions
        position: 'top' // Start cropping from the top (preserve header)
      })
      .sharpen({ sigma: 1.5 }) // Enhanced sharpening
      .jpeg({
        quality: 98,
        chromaSubsampling: '4:4:4',
        mozjpeg: true
      })
      .toFile(outputPath);

    console.log();
  } catch (error) {
    console.error(, error.message);
  }
}

async function processAllImages() {
  const sourceDir = 'public/ghassla';
  const outputDir = 'public/ghassla/processed';

  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const files = readdirSync(sourceDir);
  const pngFiles = files.filter(f => f.endsWith('.png') && !f.includes('Vidéo'));

  console.log();
  console.log();

  // Process images with sequential numbering
  for (let i = 0; i < pngFiles.length; i++) {
    const file = pngFiles[i];
    const inputPath = join(sourceDir, file);
    const outputFilename = ;
    const outputPath = join(outputDir, outputFilename);

    await processImage(inputPath, outputPath, file);
  }

  console.log('
✅ All images processed successfully!');
  console.log();
  console.log();
}

processAllImages().catch(console.error);
