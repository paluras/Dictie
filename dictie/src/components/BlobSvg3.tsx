import  { FC } from 'react';

interface BlobProps{
    animationKey:number
}

const BlobRight : FC<BlobProps> = ({animationKey}) => {
  return (
<svg key={animationKey} className='blob-right' xmlns="http://www.w3.org/2000/svg" width="275" height="236" viewBox="0 0 275 236" fill="none">
  <g filter="url(#filter0_d_39_362)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M195.403 -105.491C257.446 -110.699 329.212 -170.75 371.899 -124.786C414.396 -79.0255 361.593 -7.66543 341.472 51.7948C325.381 99.3458 311.156 147.23 270.245 175.613C219.317 210.947 156.471 244.073 99.7127 219.524C41.2294 194.23 16.3209 125.406 6.75806 61.6515C-1.87915 4.06813 8.8465 -59.6228 52.0945 -97.9413C89.9964 -131.523 145.249 -101.281 195.403 -105.491Z" fill="#B4D2F5"/>
  </g>
  <defs>
    <filter id="filter0_d_39_362" x="0" y="-142" width="392" height="378" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_39_362"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_39_362" result="shape"/>
    </filter>
  </defs>
</svg>
  );
};

export default BlobRight;