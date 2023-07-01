import React from 'react';
import '../../pages/home/home.scss'

const CartCard = ({obj, deleteCard}) => {
    return (
        <div className='cart__card'>
            <div className="cart-card__content">
                <img src={obj.url} alt="" className="cart-card__img" />
                <div className="cart-card__info">
                    <h4 className="cart-card__title">{obj.title}</h4>
                    <p className="cart-card__price">{obj.price}</p>
                </div>
            </div>
            <div className="cart-card__cross" onClick={()=> {deleteCard(obj.myId)}}></div>
        </div>
    );
};

export default CartCard;