import React from 'react';
import '../header/header.scss';

const Header = ({open, setOpen}) => {
    return (
        <div className='header'>
            <div className="header__container">
                <div className="logo">
                    <img src="public/tags.svg" alt="" className="logo__img" />
                    <a href="/"><h1 className="logo__text">maxShop</h1></a>
                </div>
                <form className="search__form">
                        <input type="text" className="search__input" />
                        <button className="search__btn">search</button>
                </form>
                <img src="public/cart.svg" alt="" className="cart" onClick={()=>setOpen(true)} />
            </div>
        </div>
    );
};

export default Header;