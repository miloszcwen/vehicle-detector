import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm=()=>{
    return (
        <div>
            <p className='f3'>
                {'This app will detect cars in your pictures'}
            </p>
            <div className='form center pa3 br2 shadow-2'>
                <input className='br2 f4 pa2 w-70 center' type='text' placeholder='url to image'/>
                <button className='button br2 w-30 grow f4 link ph3 pv2 dib'>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;