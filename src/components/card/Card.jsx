import React from 'react';
import '../card/card.scss'

const Card = ({obj, addCard, titles, setTitles, getCardInfo}) => {


    return (
        <div className='card'>
            <div className="card__content">
                <img src={obj.url} alt="" className="card__img" />
                <div className="card__info">
                    <h3 className="card__title">{obj.title}</h3>
                    <p className="card__price">{obj.price}</p>
                </div>
            </div>
            <div className="card__btns">
                <button className="card-add__btn" onClick={()=> addCard({
                    title: obj.title,
                    url: obj.url,
                    price: obj.price,
                    text: obj.text,
                    myId: obj.id,
                })}>+</button>
                <a href='/product' className="card-info__btn" onClick={()=> getCardInfo({
                    title: obj.title,
                    url: obj.url,
                    price: obj.price,
                    text: obj.text,
                    myId: obj.id,
                })}>i</a>
            </div>
        </div>
    );
};

export default Card;