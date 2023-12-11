import  { FC } from 'react';

interface BlobProps{
    animationKey:number
}

const BlobOneLeft : FC<BlobProps> = ({animationKey}) => {
  return (
<svg key={animationKey} className='blob-one' xmlns="http://www.w3.org/2000/svg" width="363" height="237" viewBox="0 0 363 237" fill="none">
  <g filter="url(#filter0_d_39_359)">
    <path fillRule="evenodd" clipRule="evenodd" d="M173.344 0.877776C130.79 -0.38395 89.7258 5.45004 53.1015 29.9396C4.02969 62.7525 -63.8218 96.0479 -64.1707 159.696C-64.5195 223.349 9.60151 246.695 51.6796 289.373C88.0382 326.25 113.846 376.899 161.87 388.962C219.738 403.498 290.089 407.529 331.428 359.64C372.204 312.405 357.212 236.62 349.232 171.918C342.896 120.537 326.601 71.0104 291.64 37.0124C259.65 5.90467 215.892 2.13936 173.344 0.877776Z" fill="#DCE6FF"/>
  </g>
  <defs>
    <filter id="filter0_d_39_359" x="-68.1719" y="0.716797" width="430.801" height="406.002" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_39_359"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_39_359" result="shape"/>
    </filter>
  </defs>
</svg>
  );
};

export default BlobOneLeft;