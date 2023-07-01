import React, { useEffect } from 'react';
import '../../pages/home/home.scss' 
import CartCard from '../cartCard/CartCard.jsx';
import axios from 'axios';

const CartModal = ({open, setOpen, cartCards, setCartCards, deleteCard, getCardInfo}) => {

    useEffect(()=>{
        axios.get('https://6494697c0da866a95367b8d7.mockapi.io/addedCards')
            .then((resp)=> setCartCards(resp.data))
    },[])

    return (
        <div className={open? 'cart__modal active' : 'cart__modal'}>
            <div className="modal__cross" onClick={()=> setOpen(false)}></div>
            <div className="cart-modal__content">
                {
                    cartCards.map((cartCard)=>{
                        return <CartCard key={cartCard.myId} obj={cartCard} deleteCard={deleteCard}/>
                    })
                }
            </div>
        </div>
    );
};

export default CartModal;