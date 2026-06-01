'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

/**
 * Loader for backend images.
 */

export type ImageLoaderProps = Omit<
  ImageProps,
  'src' | 'alt' | 'width' | 'height'
> & {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

const getBackendImageSrc = (src: string) => {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? '';

  return `${baseUrl.replace(/\/$/, '')}/${src.replace(/^\//, '')}`;
};

const ImageLoader = ({
  src,
  alt = 'Image',
  width = 250,
  height = 250,
  ...props
}: ImageLoaderProps) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc = getBackendImageSrc(src);

  if (failedSrc === imageSrc) {
    return null;
  }

  return (
    <Image
      {...props}
      width={width}
      height={height}
      alt={alt}
      src={imageSrc}
      unoptimized
      onError={() => setFailedSrc(imageSrc)}
    />
  );
};

export default ImageLoader;
