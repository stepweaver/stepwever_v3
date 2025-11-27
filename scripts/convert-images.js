const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToConvert = [
  'screely-lambda.png',
  'screely-stache.png',
  'screely-dice.png',
  'screely-profilcard.png',
  'lambda_stepweaver.png',
];

const imagesDir = path.join(__dirname, '..', 'public', 'images');

async function optimizeImages() {
  console.log('Optimizing images (compressing PNGs and converting to WebP)...\n');

  for (const imageName of imagesToConvert) {
    const inputPath = path.join(imagesDir, imageName);
    const webpPath = path.join(imagesDir, imageName.replace('.png', '.webp'));
    const compressedPngPath = path.join(imagesDir, imageName.replace('.png', '.png.compressed'));

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${imageName} - file not found`);
      continue;
    }

    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;

    try {
      // Step 1: Compress PNG (lossless compression with optimization)
      console.log(`📦 Compressing ${imageName}...`);
      await sharp(inputPath)
        .png({ 
          compressionLevel: 9, // Maximum compression
          quality: 100, // Lossless
          effort: 10, // Maximum effort for optimization
          palette: true, // Use palette if beneficial
        })
        .toFile(compressedPngPath);

      const compressedStats = fs.statSync(compressedPngPath);
      const compressedSize = compressedStats.size;

      // Only replace original if compressed version is smaller
      if (compressedSize < originalSize) {
        fs.renameSync(compressedPngPath, inputPath);
        console.log(`   ✅ PNG compressed: ${(originalSize / 1024).toFixed(1)} KiB → ${(compressedSize / 1024).toFixed(1)} KiB (${((1 - compressedSize / originalSize) * 100).toFixed(1)}% reduction)`);
      } else {
        // Keep original, remove compressed version
        fs.unlinkSync(compressedPngPath);
        console.log(`   ℹ️  PNG already optimized (${(originalSize / 1024).toFixed(1)} KiB)`);
      }

      // Step 2: Convert to WebP with optimized settings
      console.log(`🖼️  Converting ${imageName} to WebP...`);
      await sharp(inputPath)
        .webp({ 
          quality: 80, // Slightly lower quality for better compression (still looks great)
          effort: 6, // Good balance between compression and speed
          lossless: false, // Use lossy for better compression
          nearLossless: false,
        })
        .toFile(webpPath);

      const webpStats = fs.statSync(webpPath);
      const webpSize = webpStats.size;
      const finalPngSize = fs.statSync(inputPath).size;
      const webpSavings = ((1 - webpSize / finalPngSize) * 100).toFixed(1);

      console.log(`   ✅ WebP created: ${(webpSize / 1024).toFixed(1)} KiB (${webpSavings}% smaller than PNG)`);
      console.log(`   📊 Total reduction from original: ${((1 - webpSize / originalSize) * 100).toFixed(1)}%\n`);
    } catch (error) {
      console.error(`❌ Error processing ${imageName}:`, error.message);
      // Clean up compressed file if it exists
      if (fs.existsSync(compressedPngPath)) {
        fs.unlinkSync(compressedPngPath);
      }
    }
  }

  console.log('✅ Image optimization complete!');
}

optimizeImages().catch(console.error);

