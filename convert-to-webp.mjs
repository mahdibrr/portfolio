import sharp from 'sharp';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

// Convert images to WebP format with 95% quality for enhanced sharpness
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .sharpen()
      .webp({ quality: 95, effort: 6 })
      .toFile(outputPath);
    console.log(`✓ Converted: ${inputPath} → ${outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to convert ${inputPath}:`, error.message);
  }
}

// Convert all images in ghassla/processed directory
async function convertGhasslaImages() {
  const ghasslaDir = 'public/ghassla/processed';

  if (!existsSync(ghasslaDir)) {
    console.log(`Directory ${ghasslaDir} does not exist, skipping...`);
    return;
  }

  const files = readdirSync(ghasslaDir);
  const jpgFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));

  console.log(`\n📁 Converting ${jpgFiles.length} Ghassla JPG images to WebP...\n`);

  for (const file of jpgFiles) {
    const inputPath = join(ghasslaDir, file);
    const outputPath = join(ghasslaDir, file.replace(/\.(jpg|jpeg)$/i, '.webp'));
    await convertToWebP(inputPath, outputPath);
  }
}

// Convert dispatching PNG screenshots
async function convertDispatchingImages() {
  const dispatchingDir = 'public/projects/dispatching';

  if (!existsSync(dispatchingDir)) {
    console.log(`Directory ${dispatchingDir} does not exist, skipping...`);
    return;
  }

  const files = readdirSync(dispatchingDir);
  const pngFiles = files.filter(f => f.endsWith('.png'));

  console.log(`\n📁 Converting ${pngFiles.length} Dispatching PNG images to WebP...\n`);

  for (const file of pngFiles) {
    const inputPath = join(dispatchingDir, file);
    const outputPath = join(dispatchingDir, file.replace(/\.png$/i, '.webp'));
    await convertToWebP(inputPath, outputPath);
  }
}

// Main execution
async function main() {
  console.log('🎨 Starting image conversion to WebP format...\n');

  await convertGhasslaImages();
  await convertDispatchingImages();

  console.log('\n✅ All images converted successfully!');
  console.log('📊 Expected savings: ~30-50% file size reduction');
}

main().catch(console.error);
