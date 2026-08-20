
const multer = require('multer');
const cloudinary = require('../Config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // 🚀 FIXED HERE!

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bokkusupermarket',
        allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'tiff', 'bmp', 'heic', 'heif', 'avif'],
        transformation: [{ width: 500, height: 500, crop: "limit" }]
    }
});

const upload = multer({ storage: storage });
module.exports = upload;

   