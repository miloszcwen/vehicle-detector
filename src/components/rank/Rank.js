import React from 'react';

const Rank=({userName, carCounter})=>{
    return (
        <div>
            <div className='f3'>
                { `${userName}, you've already detected...` }
            </div>
            <div className='f1'>
                { `${carCounter} cars`}
            </div>
        </div>
    )
}

export default Rank;