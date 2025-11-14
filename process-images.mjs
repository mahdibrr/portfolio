import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, 'public', 'ghassla');
const outputDir = join(__dirname, 'public', 'ghassla', 'processed');

// Target dimensions - 16:9 aspect ratio
const TARGET_WIDTH = 1920;
const TARGET_HEIGHT = 1080;

// Create output directory
await mkdir(outputDir, { recursive: true });

// Images to process
const images = [
  "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_01_PM.png",
  "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_01_PM (1).png",
  "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_01_PM (2).png",
  "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_01_PM (3).png",
  "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_02_PM.png",
  "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_02_PM (1).png",
  "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_02_PM (2).png",
  "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_03_PM.png",
  "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_03_PM (1).png",
  "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_03_PM (2).png",
];

async function splitLongImage(inputPath, baseName, maxHeight = 1500) {
  const metadata = await sharp(inputPath).metadata();
  const { width, height } = metadata;

  if (height <= maxHeight) {
    return [inputPath];
  }

  const numSplits = Math.ceil(height / maxHeight);
  const splitHeight = Math.floor(height / numSplits);
  const parts = [];

  for (let i = 0; i < numSplits; i++) {
    const top = i * splitHeight;
    const extractHeight = Math.min(splitHeight, height - top);

    const tempPath = join(outputDir, `temp_${baseName}_part${i}.png`);

    await sharp(inputPath)
      .extract({
        left: 0,
        top: top,
        width: width,
        height: extractHeight
      })
      .toFile(tempPath);

    parts.push(tempPath);
  }

  return parts;
}

async function resizeAndPad(inputPath, outputPath) {
  const metadata = await sharp(inputPath).metadata();
  const { width, height } = metadata;

  // Calculate aspect ratios
  const imgAspect = width / height;
  const targetAspect = TARGET_WIDTH / TARGET_HEIGHT;

  let resizeWidth, resizeHeight;

  if (imgAspect > targetAspect) {
    // Image is wider - fit to width
    resizeWidth = TARGET_WIDTH;
    resizeHeight = Math.round(TARGET_WIDTH / imgAspect);
  } else {
    // Image is taller - fit to height
    resizeHeight = TARGET_HEIGHT;
    resizeWidth = Math.round(TARGET_HEIGHT * imgAspect);
  }

  // Resize and add padding
  await sharp(inputPath)
    .resize(resizeWidth, resizeHeight, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .extend({
      top: Math.floor((TARGET_HEIGHT - resizeHeight) / 2),
      bottom: Math.ceil((TARGET_HEIGHT - resizeHeight) / 2),
      left: Math.floor((TARGET_WIDTH - resizeWidth) / 2),
      right: Math.ceil((TARGET_WIDTH - resizeWidth) / 2),
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outputPath);
}

// Process each image
console.log('Starting image processing...\n');

for (let idx = 0; idx < images.length; idx++) {
  const imgName = images[idx];
  const inputPath = join(inputDir, imgName);

  console.log(`Processing ${imgName}...`);

  try {
    const metadata = await sharp(inputPath).metadata();
    const { width, height } = metadata;

    console.log(`  Original size: ${width}x${height}`);

    // Check if image is very long (height > 2x width)
    if (height > width * 2) {
      console.log(`  Long image detected, splitting...`);
      const parts = await splitLongImage(inputPath, `img${idx}`, 1500);

      for (let partIdx = 0; partIdx < parts.length; partIdx++) {
        const outputName = `ghassla_${String(idx + 1).padStart(2, '0')}_${String.fromCharCode(97 + partIdx)}.jpg`;
        const outputPath = join(outputDir, outputName);

        await resizeAndPad(parts[partIdx], outputPath);
        console.log(`  Saved: ${outputName}`);
      }
    } else {
      // Regular image - just resize and pad
      const outputName = `ghassla_${String(idx + 1).padStart(2, '0')}.jpg`;
      const outputPath = join(outputDir, outputName);

      await resizeAndPad(inputPath, outputPath);
      console.log(`  Saved: ${outputName}`);
    }
  } catch (error) {
    console.error(`  Error: ${error.message}`);
  }
}

console.log('\nProcessing complete!');
console.log(`Processed images saved to: ${outputDir}`);
