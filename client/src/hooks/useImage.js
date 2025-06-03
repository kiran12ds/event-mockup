import { useState, useEffect } from 'react';

export default function useImage(url) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => setImage(img);
  }, [url]);

  return [image];
}
