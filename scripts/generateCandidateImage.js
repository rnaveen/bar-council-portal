const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  // Canvas dimensions - increased height to show full image including bottom right corner
  canvasWidth: 1200,
  canvasHeight: 2000, // Further increased to ensure bottom right corner is visible
  
  // Background color
  backgroundColor: '#E5E5E5', // Light gray
  
  // Candidate information
  serialNumber: '58',
  candidateName: 'KONDA REDDY. B',
  preference: 'ONE',
  
  // Font sizes - further increased from previous version
  headerFontSize: 36, // Increased from 32
  serialNumberFontSize: 160, // Increased from 140
  nameFontSize: 64, // Increased from 56
  preferenceFontSize: 64, // Increased from 56
  
  // Image paths
  candidatePhotoPath: path.join(__dirname, '../data/KondaReddy1.jpeg'),
  outputPath: path.join(__dirname, '../data/Image-Contestant.png'),
  floaterOutputPath: path.join(__dirname, '../public/candidate-floater.png'), // Floater image for bottom-right corner
  // Reference image (user-provided)
  referenceImagePath: path.join(__dirname, '../../.cursor/projects/Users-genesis-Downloads-Projects-General/assets/Image-Contestant2-7d70aae8-1918-4281-a377-4566aa1e7558.png'),
  // Also save to assets folder
      assetsOutputPath: path.join(__dirname, '../../.cursor/projects/Users-genesis-Downloads-Projects-General/assets/Image-Contestant-a9f956df-da0b-4dbb-94ab-597b6bf668cb.png'),
      // Also save to the new asset file
      newAssetOutputPath: path.join(__dirname, '../../.cursor/projects/Users-genesis-Downloads-Projects-General/assets/74a64dec-3652-4d06-b4b6-d8d23d7811de-2744b312-9b71-4ed8-b138-ef4dc1e627b7.png'),
  
  // Floater image dimensions (smaller version for floating component)
  floaterWidth: 400,
  floaterHeight: 667, // Maintains aspect ratio
  
  // Bar dimensions
  barHeight: 240, // Increased for better proportions with larger fonts
  barY: 600, // Position where the bar starts (moved up to show more image below)
};

async function generateCandidateImage() {
  try {
    // Create canvas
    const canvas = createCanvas(config.canvasWidth, config.canvasHeight);
    const ctx = canvas.getContext('2d');
    
    // Fill background
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);
    
    // Load and draw candidate photo
    let candidateImage;
    try {
      candidateImage = await loadImage(config.candidatePhotoPath);
    } catch (error) {
      // Try alternative image path
      const altPath = path.join(__dirname, '../data/KondaReddy2.jpeg');
      try {
        candidateImage = await loadImage(altPath);
      } catch (altError) {
        const publicPath = path.join(__dirname, '../public/candidate-photo.png');
        candidateImage = await loadImage(publicPath);
      }
    }
    
    // Calculate image dimensions to fit canvas while maintaining aspect ratio
    // Ensure full image is visible, especially bottom right corner
    const imageAspectRatio = candidateImage.width / candidateImage.height;
    const canvasAspectRatio = config.canvasWidth / config.canvasHeight;
    
    let imgWidth, imgHeight, imgX, imgY;
    
    // Always ensure the full image height is visible
    // Fit image to canvas width to ensure bottom right corner is visible
    imgWidth = config.canvasWidth;
    imgHeight = imgWidth / imageAspectRatio;
    imgX = 0;
    imgY = 0; // Start from top to ensure bottom is visible
    
    // If image is taller than canvas, we need to adjust
    // But we want to show the full image, so we'll let it extend
    if (imgHeight > config.canvasHeight) {
      // Scale down to fit height while maintaining aspect ratio
      imgHeight = config.canvasHeight;
      imgWidth = imgHeight * imageAspectRatio;
      imgX = (config.canvasWidth - imgWidth) / 2;
      imgY = 0;
    }
    
    // Draw the full candidate image - this ensures bottom right corner is visible
    ctx.drawImage(candidateImage, imgX, imgY, imgWidth, imgHeight);
    
    // Draw black information bar overlay
    const barY = config.barY;
    const barWidth = config.canvasWidth;
    const barHeight = config.barHeight;
    
    // Draw black bar
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, barY, barWidth, barHeight);
    
    // Calculate column widths
    const col1Width = barWidth * 0.2; // Serial number column
    const col2Width = barWidth * 0.5; // Name column
    const col3Width = barWidth * 0.3; // Preference column
    
    const headerRowHeight = barHeight * 0.4;
    const dataRowHeight = barHeight * 0.6;
    
    // Draw header row
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${config.headerFontSize}px Arial`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    
    // Header: Sl. no
    ctx.fillText('Sl. no', col1Width * 0.1, barY + headerRowHeight / 2);
    
    // Header: Candidate name
    ctx.fillText('Candidate name', col1Width + col2Width * 0.1, barY + headerRowHeight / 2);
    
    // Header: Preference
    ctx.fillText('Preference', col1Width + col2Width + col3Width * 0.1, barY + headerRowHeight / 2);
    
    // Draw data row
    const dataRowY = barY + headerRowHeight;
    
    // Serial number - large and gold/yellow
    ctx.fillStyle = '#FFD700'; // Gold color
    ctx.font = `bold ${config.serialNumberFontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(config.serialNumber, col1Width / 2, dataRowY + dataRowHeight / 2);
    
    // Candidate name - white and bold
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${config.nameFontSize}px Arial`;
    ctx.textAlign = 'left';
    ctx.fillText(config.candidateName, col1Width + col2Width * 0.1, dataRowY + dataRowHeight / 2);
    
    // Preference - white and bold with icon
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${config.preferenceFontSize}px Arial`;
    ctx.textAlign = 'left';
    
    // Draw preference text
    const prefX = col1Width + col2Width + col3Width * 0.1;
    const prefY = dataRowY + dataRowHeight / 2;
    
    // Draw pen icon (simple SVG-like drawing) - larger to match increased font size
    const iconSize = 32; // Increased from 24
    const iconY = prefY - iconSize - 8;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3; // Slightly thicker
    ctx.beginPath();
    // Draw a simple pen icon
    ctx.moveTo(prefX, iconY);
    ctx.lineTo(prefX + iconSize * 0.3, iconY + iconSize * 0.2);
    ctx.lineTo(prefX + iconSize * 0.6, iconY - iconSize * 0.1);
    ctx.lineTo(prefX + iconSize * 0.4, iconY - iconSize * 0.3);
    ctx.closePath();
    ctx.stroke();
    
    // Draw preference text
    ctx.fillText(config.preference, prefX, prefY);
    
    // Save the main image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(config.outputPath, buffer);
    
    // Generate floater image (smaller version) - scale down the main canvas
    const floaterCanvas = createCanvas(config.floaterWidth, config.floaterHeight);
    const floaterCtx = floaterCanvas.getContext('2d');
    
    // Use high-quality image scaling
    floaterCtx.imageSmoothingEnabled = true;
    floaterCtx.imageSmoothingQuality = 'high';
    
    // Draw the main canvas scaled down to floater size
    floaterCtx.drawImage(canvas, 0, 0, config.canvasWidth, config.canvasHeight, 0, 0, config.floaterWidth, config.floaterHeight);
    
    // Save floater image
    const floaterBuffer = floaterCanvas.toBuffer('image/png');
    fs.writeFileSync(config.floaterOutputPath, floaterBuffer);
    
    // Also save to assets folder if it exists
    try {
      const assetsDir = path.dirname(config.assetsOutputPath);
      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }
      fs.writeFileSync(config.assetsOutputPath, buffer);
      console.log(`📁 Also saved to: ${config.assetsOutputPath}`);
      
      // Save to new asset file as well
      fs.writeFileSync(config.newAssetOutputPath, buffer);
      console.log(`📁 Also saved to: ${config.newAssetOutputPath}`);
    } catch (assetsError) {
      console.log('⚠️  Could not save to assets folder (this is optional)');
    }
    
    console.log('✅ Candidate image generated successfully!');
    console.log(`📁 Main image saved to: ${config.outputPath}`);
    console.log(`📁 Floater image saved to: ${config.floaterOutputPath}`);
    console.log(`📐 Main dimensions: ${config.canvasWidth}x${config.canvasHeight}`);
    console.log(`📐 Floater dimensions: ${config.floaterWidth}x${config.floaterHeight}`);
    console.log(`📝 Font sizes: Header=${config.headerFontSize}px, Serial=${config.serialNumberFontSize}px, Name=${config.nameFontSize}px, Preference=${config.preferenceFontSize}px`);
    
  } catch (error) {
    console.error('❌ Error generating image:', error);
    process.exit(1);
  }
}

// Run the script
generateCandidateImage();
