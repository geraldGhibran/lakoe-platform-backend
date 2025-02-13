import { v2 as cloudinary } from 'cloudinary';
import { ImagesDto } from '../dto/images-dto';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:
    process.env.CLOUDINARY_API_SECRET,
});
const uploader = async (files: Express.Multer.File[]) => {
  console.log(files);
  const urls: ImagesDto[] = [];
  await Promise.all(
    files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
      const uploadedFile = await cloudinary.uploader.upload(dataURI, {
        folder: 'lakoe_platform',
      });
      urls.push({
        url: uploadedFile.secure_url,
      });
    }),
  );
  return urls;
};

export const uploaderSingle = async (file: Express.Multer.File) => {
  const b64 = Buffer.from(file.buffer).toString('base64');
  const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
  const uploadedFile = await cloudinary.uploader.upload(dataURI, {
    folder: 'lakoe_platform',
  });
  return uploadedFile.secure_url;
};

export default uploader;
