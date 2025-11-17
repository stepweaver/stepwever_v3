const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToConvert = [
  'screencapture-lambda-ortho.png',
  'screencapture-soap-stache.png',
  'lambda_stepweaver.png',
  'dice-roller.png',
];

const imagesDir = path.join(__dirname, '..', 'public', 'images');

async function convertToWebP() {
  console.log('Converting images to WebP format...\n');

  for (const imageName of imagesToConvert) {
    const inputPath = path.join(imagesDir, imageName);
    const outputPath = path.join(imagesDir, imageName.replace('.png', '.webp'));

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${imageName} - file not found`);
      continue;
    }

    try {
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

      console.log(`✅ ${imageName}`);
      console.log(`   Original: ${(inputStats.size / 1024).toFixed(1)} KiB`);
      console.log(`   WebP:     ${(outputStats.size / 1024).toFixed(1)} KiB`);
      console.log(`   Savings:  ${savings}%\n`);
    } catch (error) {
      console.error(`❌ Error converting ${imageName}:`, error.message);
    }
  }

  console.log('Conversion complete!');
}

convertToWebP().catch(console.error);

