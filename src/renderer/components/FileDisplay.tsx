import React, { useState } from 'react';
import ChangeImageControls from './ChangeImageControls';
import { ThumbnailSize } from './typings';

interface Props {
  filePath: string;
  base64Image?: string;
  rotation: number;
  onRemove: (filePath: string) => void;
  onRotateCw: (filePath: string) => void;
  onRotateCcw: (filePath: string) => void;
  thumbnailSize: ThumbnailSize;
}

const FileDisplay = ({
  base64Image,
  filePath,
  onRotateCw,
  onRotateCcw,
  onRemove,
  rotation,
  thumbnailSize
}: Props) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const onMouseHover = () => {
    setShowOverlay(true);
  };

  const onMouseOut = () => {
    setShowOverlay(false);
  };

  //
  return (
    <div
      className={`image-thumbnail-container m-1 ${thumbnailSize.toLowerCase()}`}
      onMouseOver={onMouseHover}
    >
      <img
        className={`image-thumbnail px1-2 ${showOverlay ? 'controls-shown' : ''} }`}
        // style={{ transform: `rotate(${rotation}deg)` }}
        alt={filePath}
        src={`data:image/jpeg;base64, ${base64Image}`}
      />
      {showOverlay && (
        <ChangeImageControls
          onMouseOut={onMouseOut}
          onRemove={() => onRemove(filePath)}
          onRotateCcw={() => onRotateCcw(filePath)}
          onRotateCw={() => onRotateCw(filePath)}
        />
      )}
    </div>
  );
};

export default FileDisplay;
