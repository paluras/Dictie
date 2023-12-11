
import  { FC } from 'react';

interface HollowTriangleProps{
    animationKey:number
}

const HollowTriangle : FC<HollowTriangleProps> = ({animationKey}) => {
  return (
<svg key={animationKey} className='triangle' xmlns="http://www.w3.org/2000/svg" width="246" height="218" viewBox="0 0 246 218" fill="none">
<path  d="M129.389 21.75L219.456 177.75C224.267 186.083 218.253 196.5 208.631 196.5H28.4975C18.8749 196.5 12.8609 186.083 17.6721 177.75L107.739 21.75C112.55 13.4167 124.578 13.4167 129.389 21.75Z"  strokeWidth="31"/>
</svg>
  );
};

export default HollowTriangle;