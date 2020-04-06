import React from 'react'
import Card from './Card'

export default function CardBlock(props) {

    const renderCards = () => (
        props.list ? props.list.map((item,i) => (
               <Card  key={i} {...item}/>
        ))
    :null)
    return (
        <div className="card_block">
            <div className="container">
                {props.title ? 
                <div className="title">
                    {props.title}
                </div>: null}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {renderCards(props.list)}
                </div>
            </div>
            
        </div>
    )
}
