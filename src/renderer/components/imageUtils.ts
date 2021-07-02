import { ImageState, ImageType, SharpMetadata, ThumbnailSize, ThumbnailSizes } from './typings';
import * as fs from 'fs';
import * as path from 'path';
import { bytesToBase64 } from 'byte-base64';

const sharp = require('sharp');

interface SupportedImages {
  type: ImageType;
  // name: string;
  extensions: string[];
  // defaultOutputExtension: string;
}

const supportedTypes: SupportedImages[] = [
  { type: ImageType.JPEG, extensions: ['.jpg', '.jpeg'] },
  { type: ImageType.PNG, extensions: ['.png'] }
];

const validExtensions: string[] = (supportedTypes.map(item => item.extensions) as [
  string[]
]).flat();

export function filterValues(fileList: string[]): string[] {
  return fileList.filter(item => {
    const extension = path.extname(item) || '';
    return validExtensions.includes(extension.toLowerCase());
  });
}

function getImageTypeForFile(imageFileName: string): ImageType {
  const extension = path.extname(imageFileName) || '';

  // @ts-ignore
  return supportedTypes.find(supportedType =>
    supportedType.extensions.includes(extension.toLowerCase())
  ).type;
}

export async function getImageInfo(fileLocation: string): Promise<ImageState> {
  const stats = fs.statSync(fileLocation);
  const fileName = path.basename(fileLocation);

  const newVar = {
    fileLocation,
    fileName,
    fileTs: stats.mtime,
    imageType: getImageTypeForFile(fileName),
    rotation: 0
  };

  const thumbnailData = await getMetadataAndThumbnailInfo(newVar);

  console.log('new state: ', thumbnailData);

  return {
    ...newVar,
    ...thumbnailData
  };
}

export function generateThumbnail(image: ImageState): string {
  return 'TODO base64 data...';
}

async function getMetadataAndThumbnailInfo(
  image: ImageState
): Promise<{
  metadata: SharpMetadata;
  smallThumbnailData: string;
  mediumThumbnailData: string;
  largeThumbnailData: string;
}> {
  const metadata = await sharp(image.fileLocation)
    .metadata()
    .then((info: any) => {
      return info;
    })
    .catch((err: Error) => {
      console.log(err);
    });

  // if (metadata.height > metadata.width) {
  //   // 200x100
  //   newWidth = Math.floor((metadata.width / metadata.height) * 100);
  // } else {
  //   newHeight = Math.floor((metadata.height / metadata.width) * 100);
  // }

  // const thumbnailData: string = await sharp(image.fileLocation)
  //   .toFormat('jpeg')
  //   .resize({
  //     fit: sharp.fit.inside,
  //     withoutEnlargement: true,
  //     width: ThumbnailSizes.SMALL.width,
  //     height: ThumbnailSizes.SMALL.height
  //   })
  //   .toBuffer({ resolveWithObject: true })
  //   // @ts-ignore
  //   .then(({ data, info }) => {
  //     // console.log('data: ', data);
  //     // console.log('info: ', info);
  //
  //     return bytesToBase64(data);
  //   });

  return {
    metadata,
    // smallThumbnailData: thumbnailData
    smallThumbnailData: await getBase64ResizedImage(image, ThumbnailSize.SMALL),
    mediumThumbnailData: await getBase64ResizedImage(image, ThumbnailSize.MEDIUM),
    largeThumbnailData: await getBase64ResizedImage(image, ThumbnailSize.LARGE)
  };
}

export async function recalcThumbnails(image: ImageState): Promise<ImageState> {
  console.log('creating thumbnails for rotation of: ', image.rotation);
  return {
    ...image,
    smallThumbnailData: await getBase64ResizedImage(image, ThumbnailSize.SMALL),
    mediumThumbnailData: await getBase64ResizedImage(image, ThumbnailSize.MEDIUM),
    largeThumbnailData: await getBase64ResizedImage(image, ThumbnailSize.LARGE)
  };
}

async function getBase64ResizedImage(image: ImageState, size: ThumbnailSize) {
  return sharp(image.fileLocation)
    .toFormat('jpeg')
    .rotate(image.rotation)
    .resize({
      fit: sharp.fit.inside,
      withoutEnlargement: true,
      width: ThumbnailSizes[size].width,
      height: ThumbnailSizes[size].height
    })
    .toBuffer({ resolveWithObject: true })
    .then(({ data }: { data: Uint8Array }) => {
      return bytesToBase64(data);
    });
}
