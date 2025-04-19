// Image to PNG Converter
if (document.getElementById('image-upload')) {
    const imageUpload = document.getElementById('image-upload');
    const convertBtn = document.getElementById('convert-btn');
    const downloadBtn = document.getElementById('download-btn');
    
    let convertedImage = null;
    
    imageUpload.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            convertBtn.disabled = false;
        }
    });
    
    convertBtn.addEventListener('click', function() {
        const file = imageUpload.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                // Create canvas to convert to PNG
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                // Convert to PNG
                convertedImage = canvas.toDataURL('image/png');
                
                // Enable download button
                downloadBtn.disabled = false;
                
                // Show success message
                alert('Image converted to PNG successfully!');
            };
            
            img.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    });
    
    downloadBtn.addEventListener('click', function() {
        if (!convertedImage) return;
        
        const link = document.createElement('a');
        link.href = convertedImage;
        link.download = 'converted-image.png';
        link.click();
    });
}