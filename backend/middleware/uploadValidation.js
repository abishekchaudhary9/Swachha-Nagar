const fs = require('fs');
const path = require('path');

const ALLOWED_TYPES = {
  '.jpg': ['image/jpeg'], '.jpeg': ['image/jpeg'], '.png': ['image/png'],
  '.webp': ['image/webp'], '.heic': ['image/heic', 'image/heif'],
};

function isAllowedImage(buffer, extension) {
  if (extension === '.jpg' || extension === '.jpeg') return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (extension === '.png') return buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (extension === '.webp') return buffer.length >= 12 && buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP';
  if (extension === '.heic') {
    const brand = buffer.length >= 12 ? buffer.subarray(8, 12).toString() : '';
    return buffer.subarray(4, 8).toString() === 'ftyp' && ['heic', 'heix', 'hevc', 'hevx', 'mif1'].includes(brand);
  }
  return false;
}

function removeUploadedFile(file) {
  if (file?.path) fs.unlink(file.path, () => {});
}

function validateImageUpload(req, res, next) {
  if (!req.file) return next();
  const extension = path.extname(req.file.originalname).toLowerCase();
  if (!ALLOWED_TYPES[extension] || !ALLOWED_TYPES[extension].includes(req.file.mimetype)) {
    removeUploadedFile(req.file);
    return res.status(400).json({ error: 'Photo must be a JPEG, PNG, WEBP, or HEIC image' });
  }
  fs.readFile(req.file.path, (err, buffer) => {
    if (err || !isAllowedImage(buffer, extension)) {
      removeUploadedFile(req.file);
      return res.status(400).json({ error: 'Uploaded file content is not a valid image' });
    }
    return next();
  });
}

module.exports = { validateImageUpload, removeUploadedFile };
