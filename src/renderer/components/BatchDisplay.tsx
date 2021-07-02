import React, { useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { filterValues, getImageInfo, recalcThumbnails } from './imageUtils';
import FileDisplay from './FileDisplay';
import RunControls from './RunControls';
import { ImageState, ThumbnailSize } from './typings';

function dropped(e: React.DragEvent<HTMLDivElement>, addImages: { (paths: string[]): void }) {
  if (e.dataTransfer.files) {
    const paths: string[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const item = e.dataTransfer.files.item(i);
      if (item) {
        paths.push(item.path);
      }
    }

    const filteredFiles = filterValues(paths);
    console.log('file: ', filteredFiles);
    addImages(filteredFiles);
  }
}

//
// function dropCapture(e: React.DragEvent<HTMLDivElement>) {
//   e.preventDefault();
//   console.log('DropCapture', e);
// }
//
// function dragEnter(e: React.DragEvent<HTMLDivElement>) {
//   e.preventDefault();
//   console.log('Drag Enter', e);
// }
//
// function dragEnd(e: React.DragEvent<HTMLDivElement>) {
//   e.preventDefault();
//   console.log('Drag End', e);
// }
// function dragExit(e: React.DragEvent<HTMLDivElement>) {
//   e.preventDefault();
//   console.log('Drag Exist', e);
// }
function dragOver(e: React.DragEvent<HTMLDivElement>) {
  // Needed for drop event to work for some reason
  e.preventDefault();
  // console.log('Drag Over', e);
}

// function dragOverCapture(e: React.DragEvent<HTMLDivElement>) {
//   e.preventDefault();
//   console.log('Drag Over Capture', e);
// }

const BatchDisplay = () => {
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [imageStates, setImageStates] = useState<ImageState[]>([]);
  const [thumbnailSize, setThumbnailSize] = useState<ThumbnailSize>(ThumbnailSize.MEDIUM);

  const addImages = async (paths: string[]) => {
    const copy = new Set(imagePaths);
    const newPaths = paths.filter(path => !copy.has(path));

    if (newPaths.length > 0) {
      newPaths.forEach(imagePath => copy.add(imagePath));
      setImagePaths(Array.from(copy));

      // Add file info
      const newImageStates = await Promise.all([
        ...imageStates,
        ...newPaths.map(path => getImageInfo(path))
      ]);
      setImageStates(newImageStates);

      // console.log('image states: ', newImageStates);
    }
  };

  const removeImage = (filePath: string) => {
    setImagePaths(imagePaths.filter(path => path !== filePath));
    setImageStates(imageStates.filter(imageState => imageState.fileLocation !== filePath));
  };
  const rotateImageCw = (filePath: string) => {
    rotateImage(filePath, 90);
  };
  const rotateImageCcw = (filePath: string) => {
    rotateImage(filePath, -90);
  };

  const rotateImage = async (filePath: string, numDegrees: number) => {
    const relatedImage = imageStates.find(imageState => imageState.fileLocation === filePath);
    if (relatedImage) {
      const newStates = [...imageStates];
      const foundImageState = newStates.find(imageState => imageState.fileLocation === filePath);
      if (foundImageState) {
        foundImageState.rotation = (foundImageState.rotation + numDegrees) % 360;

        const newThumbnails = await recalcThumbnails(foundImageState);
        foundImageState.smallThumbnailData = newThumbnails.smallThumbnailData;
        foundImageState.mediumThumbnailData = newThumbnails.mediumThumbnailData;
        foundImageState.largeThumbnailData = newThumbnails.largeThumbnailData;

        setImageStates(newStates);
      }
    }
  };

  const thumbnailGetter = (imageState: ImageState) => {
    switch (thumbnailSize) {
      case ThumbnailSize.SMALL:
        return imageState.smallThumbnailData;
      case ThumbnailSize.MEDIUM:
        return imageState.mediumThumbnailData;
      case ThumbnailSize.LARGE:
        return imageState.largeThumbnailData;
      default:
        return imageState.smallThumbnailData;
    }
  };

  return (
    <div
      className="batch-display h-100 w-100 d-flex flex-wrap align-content-start"
      onDrop={e => dropped(e, addImages)}
      onDragOver={dragOver}
    >
      {imageStates.length > 0 ? (
        imageStates.map(imageState => (
          <FileDisplay
            key={imageState.fileLocation}
            filePath={imageState.fileLocation}
            base64Image={thumbnailGetter(imageState)}
            onRemove={removeImage}
            onRotateCcw={rotateImageCcw}
            onRotateCw={rotateImageCw}
            rotation={imageState.rotation}
            thumbnailSize={thumbnailSize}
          />
        ))
      ) : (
        <Jumbotron>
          Add files/folders here by dragging and dropping them or you can add them from the file
          menu.
        </Jumbotron>
      )}

      <RunControls filesSelected={imagePaths.length > 0} />
    </div>
  );
};

export default BatchDisplay;
