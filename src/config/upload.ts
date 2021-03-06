import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  tmpFolder,
  uploadsFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');

      const extension = path.extname(file.originalname);

      const fileName = `${fileHash}${extension}`;

      return callback(null, fileName);
    },
  }),
};
