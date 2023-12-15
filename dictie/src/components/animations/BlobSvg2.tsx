import  { FC } from 'react';

interface BlobProps{
    animationKey:number
}

const BlobTwoLeft : FC<BlobProps> = ({animationKey}) => {
  return (
<svg key={animationKey} className='blob-two' xmlns="http://www.w3.org/2000/svg" width="571" height="368" viewBox="0 0 571 368" fill="none">
  <g filter="url(#filter0_d_39_372)">
    <path fillRule="evenodd" clipRule="evenodd" d="M168.168 2.22834e-06C241.12 -0.0056546 311.162 10.7574 372.655 49.8092C455.047 102.133 569.581 156.043 566.956 253.257C564.33 350.477 436.188 382.782 361.953 446.057C297.808 500.731 251.039 576.913 168.168 593.166C68.3119 612.75 -52.393 615.731 -120.777 540.733C-188.229 466.758 -158.712 351.703 -141.768 253.257C-128.312 175.079 -97.8937 100.181 -36.2872 49.8409C20.0819 3.78018 95.224 0.00565843 168.168 2.22834e-06Z" fill="#D0DEFF"/>
  </g>
  <defs>
    <filter id="filter0_d_39_372" x="-167" y="0" width="738" height="613" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_39_372"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_39_372" result="shape"/>
    </filter>
  </defs>
</svg>
  );
};

export default BlobTwoLeft;