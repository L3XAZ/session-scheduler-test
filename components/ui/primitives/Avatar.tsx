'use client';

import Image from 'next/image';

import CircleAccent from './CircleAccent';

type Props = {
  size?: number;
  src: string;
  alt?: string;
};

export default function Avatar({ size = 120, src, alt = 'Avatar' }: Props) {
  const px = `${size}px`;

  return (
    <div
      style={{ width: px, height: px }}
      className="relative overflow-hidden rounded-full bg-brand-primary"
    >
      <CircleAccent size={size * 1.6} className="absolute -left-1/2 bottom-[-15%]" />

      <Image src={src} alt={alt} fill sizes={`${px}`} className="relative z-10 object-cover" />
    </div>
  );
}
