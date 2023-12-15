import React from 'react';
import BlobOneLeft from './animations/BlobSvg1';
import BlobRight from './animations/BlobSvg3';
import BlobTwoLeft from './animations/BlobSvg2';
// import CircleSVG from './animations/CircleSVG';
import HollowTriangle from './animations/HollowTriangle';
import Rectangle from './animations/Rectangle';
// ... import other animation components

interface BlobProps{
    animationKey:number
}

const Animations: React.FC<BlobProps> = ({animationKey}) => {
    return (
        <div className='absolute-animations'>
            
            <BlobOneLeft animationKey={animationKey} />
            <BlobTwoLeft animationKey={animationKey} />
            <BlobRight animationKey={animationKey} />
            <Rectangle animationKey={animationKey} />
            <HollowTriangle animationKey={animationKey} />
            {/* Render other animation components */}
        </div>
    );
};

export default Animations;
