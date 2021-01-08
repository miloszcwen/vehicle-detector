import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import car from './car.png'


class Logo extends React.Component {

    render(){
        return (
            <>
            <div className='ma4 mt0'>
            <React.StrictMode>
                <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner pa3">
                        <img src={car} alt='car' />
                    </div>
                </Tilt>
            </React.StrictMode>
            </div>
            </>
        )
    }
}

export default Logo;
