import React from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { cn } from '@/shared/lib/classnames.utils';

export interface LoaderProps {
  size?: number;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className, size = 15 }) => {
  return (
    <LoaderIcon
      className={cn(className)}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default Loader;
