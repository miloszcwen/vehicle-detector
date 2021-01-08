import React from 'react';

const Rank=({userName, carCounter})=>{
    return (
        <div>
            <div className='f3'>
                { `${userName}, cars already detected...` }
            </div>
            <div className='f1'>
                { `${carCounter}`}
            </div>
        </div>
    )
}

export default Rank;