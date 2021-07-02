import { Icon } from 'react-feather';
import React, { createElement, useState } from 'react';

interface HoverIconProps {
  icon: Icon;
  color?: string;
  onClick?: () => void;
  size?: string | number;
}

const HoverIcon = ({ icon, color, onClick, size }: HoverIconProps) => {
  const [hovering, setHovering] = useState(false);
  const iconElement = createElement(icon, {
    strokeWidth: hovering ? 3 : 2,
    color,
    size,
    onClick,
    onMouseOver: () => setHovering(true),
    onMouseOut: () => setHovering(false)
  });

  return (
    <>{iconElement}</>

    // <div
    //
    // >
    //   {iconElement}
    // </div>
  );
};

export default HoverIcon;
