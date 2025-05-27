import React from 'react';
import { svgMap } from './svgMap';
import projectsSvg from '../../assets/images/sidebar/ProjectsSvg';

const RenderIcon = ({
  type,
  color,
  className = '',
  onClick,
  style,
  ...props
}) => {
  const SvgComponent = svgMap[type] || projectsSvg;

  return (
    <SvgComponent
      className={className}
      onClick={onClick}
      style={{ ...style }}
      color={color}
      {...props}
    />
  );
};

export default RenderIcon;
