import React from 'react';

const Rank=({userName, userRank})=>{
    return (
        <div>
            <div className='f3'>
                { `${userName}, your current rank is ${userRank}` }
            </div>
            <div className='f1'>
                {/* {'#5'} */}
            </div>
        </div>
    )
}

export default Rank;