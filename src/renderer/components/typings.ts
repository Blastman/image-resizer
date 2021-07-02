export interface DisplayState {}

export enum ThumbnailSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

export const ThumbnailSizes: Record<ThumbnailSize, ImageSize> = {
  [ThumbnailSize.SMALL]: {
    height: 100,
    width: 100
  },
  [ThumbnailSize.MEDIUM]: {
    height: 200,
    width: 200
  },
  [ThumbnailSize.LARGE]: {
    height: 400,
    width: 400
  }
};

export interface ImageSize {
  height: number;
  width: number;
}

export enum ImageType {
  JPEG = 'jpg',
  PNG = 'png'
}

export interface ImageState {
  fileLocation: string;
  fileName: string;
  imageType: ImageType;
  fileTs: Date;
  smallThumbnailData?: string;
  mediumThumbnailData?: string;
  largeThumbnailData?: string;
  rotation: number;
  metadata?: SharpMetadata;
}

export interface Thumbnail {
  base64Data: string;
}

export interface ImageBatch {
  convertToType?: ImageType;
  keepFileType: boolean;
  /** User field name of batch. */
  name: string;
  /** Max file size. Keep retrying */
  maxFileSize?: number;
  maxHeight?: number;
  maxWidth?: number;
  shrinkPercent?: number;
}

export interface FileOptions {
  overwriteExistingFile: boolean;
  exportToDirectory?: string;
  /** "Image.jpg" + "_small" suffix -> Image_small.jpg" */
  exportWithSuffix?: string;
}

export interface SharpMetadata {
  height: number;
  width: number;
}
