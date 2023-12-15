import  { FC } from 'react';

interface BlobProps{
    animationKey:number
}

const Rectangle : FC<BlobProps> = ({animationKey}) => {
  return (
    <div key={animationKey} className="rectangle"> </div>
  );
};

export default Rectangle;