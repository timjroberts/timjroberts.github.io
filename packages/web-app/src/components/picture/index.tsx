import React from "react";
import { useParams } from "react-router-dom";

export type PictureProps = {
  src: string;
  small?: boolean;
  alt: string;
}

export const Picture: React.FC<PictureProps> = ({ src, small, alt }: PictureProps) => {
  const { slug } = useParams();
  
  return (
    <picture>
      <source media="(min-width: 800px)" srcSet={`/c/post/${slug}-600w-${src}`} />
      {small && <source media="(max-width: 800px)" srcSet={`/c/post/${slug}-300w-${src}`} />}
      <img src={`/c/post/${slug}-600w-${src}`} alt={alt} />
    </picture>
  );
}