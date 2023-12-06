
import  { FC } from 'react';

interface CircleSVGProps{
    animationKey:number
}

const CircleSVG : FC<CircleSVGProps> = ({animationKey}) => {
  return (
<svg className="container-half-ring" key={animationKey}
          viewBox="0 0 100 100"
          width="100"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path className="half-ring" d="M50 10 A 40 40 0 1 1 50 90" />
        </svg>
  );
};

export default CircleSVG;