import React from 'react'
import Card from './Card'
function CardContainer({ newApi }) {
    return (
        <div className='cardsContainer'>
            <Card newApi={newApi} />
        </div>
    )
}

export default CardContainer
