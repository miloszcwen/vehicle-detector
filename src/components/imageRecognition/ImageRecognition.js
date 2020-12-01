import React from 'react';
import './ImageRecognition.css'

const ImageRecognition=({imgUrl, box})=>{
    return (
        <>
        <div className='center ma'>
            <div className='absolute mt2 shadow-2'>
                <img id='inputImage' alt='' src={imgUrl} width='500px' heigh='auto'/>
                <div className='bounding-box'
                style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                </div>
            </div>
        </div>
        </>
    )
}

export default ImageRecognition;