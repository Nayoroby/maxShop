import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client'
import '../product/product.scss'
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import axios from 'axios'
import CartModal from '../../components/cartModal/CartModal.jsx';

const Product = () => {

    const [cards, setCards] = useState([])
    const [cartCards, setCartCards] = useState([])
    const [titles, setTitles] = useState([])
    const [open, setOpen] = useState(false)
    const [obj, setObj] = useState({})

    useEffect(()=>{
        setObj(JSON.parse(localStorage.getItem('obj')))
        setTitles(JSON.parse(localStorage.getItem('titles')))
    }, [])

    async function addCard(obj) {
        let found = false 
        for (let i = 0; i < titles.length; i++) {
            if (titles[i] === obj.myId) {
                found = true 
            }
        }
        if (found === false) {
            setTitles((prev)=> [...prev, obj.myId])
            await axios.post('https://6494697c0da866a95367b8d7.mockapi.io/addedCards', obj)
             .then((resp)=> {
                setCartCards((prev)=>[...prev, resp.data])  
                localStorage.setItem(resp.data.myId, JSON.stringify(resp.data))  
                console.log(titles);
             })
        }
    }
    // useMemo(()=>console.log(titles),[titles])



    async function deleteCard(id) {
        setTitles(titles.filter(title => title != id))
        setCartCards(cartCards.filter(cartCard => cartCard.myId != id))
        const mockId = JSON.parse(localStorage.getItem(id)).id
        localStorage.removeItem(id)
        await axios.delete(`https://6494697c0da866a95367b8d7.mockapi.io/addedCards/${mockId}`)      
    }

    let found = false

    function checking(id) {
        for (let i = 0; i < titles.length; i++) {
            console.log(titles[i] + ' === ' + obj.myId + '?');
            if (titles[i] === obj.myId) {
                found = true
                localStorage.setItem('titles', JSON.stringify(titles))
            }   
        }
        return found
    }

    return (
        <div className='product'>
            <Header open={open} setOpen={setOpen}/>
            <main className="main">
                <div className="main__container">
                    <div className="main__content">
                        <img src={obj.url} alt="" className="main__img" />
                        <div className="main__info">
                            <h2 className="main__title">{obj.title}</h2>
                            <p className="main__price">{obj.price}</p>
                            <p className="main__text">{obj.text}</p>
                            {
                                checking()? 
                                <button className="main__btn" onClick={()=> deleteCard(obj.myId)}>delete</button>
                                : 
                                <button className="main__btn" onClick={()=> addCard(obj)}>buy</button>
                            }
                        </div>
                    </div>
                </div>
                <CartModal open={open} setOpen={setOpen} deleteCard={deleteCard} cartCards={cartCards} setCartCards={setCartCards} />
            </main>
            <Footer/>
        </div>
    );
};

export {Product}