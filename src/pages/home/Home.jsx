import React, { useEffect, useState } from 'react';
import '../home/home.scss'
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import Card from '../../components/card/Card.jsx';
import axios from 'axios'
import CartModal from '../../components/cartModal/CartModal.jsx';

const Home = () => {

    const [cards, setCards] = useState([])
    const [cartCards, setCartCards] = useState([])
    const [titles, setTitles] = useState([])
    const [open, setOpen] = useState(false)
    const [obj, setObj] = useState({})

    useEffect(() => {
        axios.get('https://6494697c0da866a95367b8d7.mockapi.io/shopCards')
            .then(resp => setCards(resp.data))
    }, [])

    useEffect(()=>{
        cartCards.forEach((item)=>{
            setTitles((prev)=> [...prev, item.myId])
        })
    }, [cartCards])

    async function getCardInfo(obj) {
        window.location.href = 'http://localhost:5173/product'
        localStorage.setItem('obj', JSON.stringify(obj))
        localStorage.setItem('titles', JSON.stringify(titles))
    }

    async function addCard(obj) {
        let found = false 
        
        for (let i = 0; i < titles.length; i++) {
            if (titles[i] === obj.myId) {
                found = true 
            }
        }
        if (found === false) {
            setTitles((titles)=> [...titles, obj.myId])
            localStorage.setItem('titles', JSON.stringify(titles))
            await axios.post('https://6494697c0da866a95367b8d7.mockapi.io/addedCards', obj)
                .then((resp)=> {
                    setCartCards((prev)=>[...prev, resp.data])  
                    console.log(obj);
                    localStorage.setItem(resp.data.myId, JSON.stringify(resp.data))     
                })
        }
        
    }

    async function deleteCard(id) {
        const mockId = JSON.parse(localStorage.getItem(id)).id
        setTitles(titles.filter(title => title != id))
        setCartCards(cartCards.filter(cartCard => cartCard.id != mockId))
        localStorage.removeItem(id)
        await axios.delete(`https://6494697c0da866a95367b8d7.mockapi.io/addedCards/${mockId}`)  
        console.log(id);      
    }

    return (
        <div className='home'>
            <Header open={open} setOpen={setOpen}/>
            <main className="main">
                <div className="main__container">
                    <p className="main__text">There is many intresting clothes:</p>
                    <div className="main__cards">
                        {
                            cards.map(card => {
                                return <Card key={card.id} obj={card} titles={titles} addCard={addCard} getCardInfo={getCardInfo}/>
                            })
                        }
                    </div>
                </div>
                <CartModal open={open} setOpen={setOpen} cartCards={cartCards} setCartCards={setCartCards} deleteCard={deleteCard} />
            </main>
            <Footer/>
        </div>
    );
};

export {Home};