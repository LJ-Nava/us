import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');

async function convertToWebP(inputPath) {
  const outputPath = inputPath.replace(/\.png$/i, '.webp');

  try {
    const inputStats = fs.statSync(inputPath);
    const inputSize = inputStats.size;

    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSize = outputStats.size;
    const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);

    console.log(`+ ${path.basename(inputPath)} -> ${path.basename(outputPath)} (${savings}% smaller)`);
    return { input: inputSize, output: outputSize };
  } catch (error) {
    console.error(`x Error converting ${inputPath}:`, error.message);
    return null;
  }
}

function findPngFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findPngFiles(fullPath));
    } else if (item.toLowerCase().endsWith('.png')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  console.log('Converting PNG images to WebP...\n');

  const pngFiles = findPngFiles(ASSETS_DIR);
  console.log(`Found ${pngFiles.length} PNG files\n`);

  let totalInput = 0;
  let totalOutput = 0;

  for (const file of pngFiles) {
    const result = await convertToWebP(file);
    if (result) {
      totalInput += result.input;
      totalOutput += result.output;
    }
  }

  const totalSavings = ((totalInput - totalOutput) / totalInput * 100).toFixed(1);
  console.log(`\n========================================`);
  console.log(`Total: ${(totalInput / 1024 / 1024).toFixed(2)} MB -> ${(totalOutput / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${((totalInput - totalOutput) / 1024 / 1024).toFixed(2)} MB (${totalSavings}%)`);
  console.log(`========================================`);
}

main().catch(console.error);
