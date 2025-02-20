import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];


function App() {
    return (
        <div className={'container'}>
            <Header/>
            <Menu/>
            <Footer/>
        </div>)
}

function Header() {
    // const style = {color: 'red', fontSize: '32px', textTransform: 'uppercase'}
    const style = {}
    return (
        <header className='header'>
            <h1 style={style}>Fast React Pizza Co.</h1>
        </header>
    )
}

function Menu() {
    const numPizzas = pizzaData.length;
    return (
        <main className='menu'>
            <h2>Our menu</h2>
            {numPizzas > 0 ? (
                <>
                    <p>Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone
                        oven, all organic, all delicious.
                    </p>
                    <ul className='pizzas'>
                        {pizzaData.map(pizza => (
                            <Pizza pizza={pizza} key={pizza.name}/>
                        ))}
                    </ul>
                </>
            ) : <p>We're still working on our menu. Please come back later :)</p>
            }
        </main>
    )
}

function Pizza({pizza}) {
    console.log(pizza);

    // if (pizza.soldOut) return null;

    return (
        <li className={`pizza ${pizza.soldOut ? 'sold-out' : ''}`}>
            <img src={pizza.photoName} alt={pizza.name}/>
            <div>
                <h3>{pizza.name}</h3>
                <p>{pizza.ingredients}</p>
                <span>{pizza.soldOut ? 'SOLD OUT' : pizza.price}</span>
            </div>
        </li>
    )
}

function Footer(props) {
    console.log(props)
    const hour = new Date().getHours();
    const openHour = 9;
    const closeHour = 24;
    const isOpen = hour >= openHour && hour <= closeHour;
    console.log(isOpen);
    // if (hour >= openHour && hour <= closeHour) alert("We're currently open!")
    // else alert("We're currently Close!")

    // if (!isOpen) {
    //     return (
    //         <p>We're happy to welcome you between {openHour}:00 and {closeHour}:00 </p>
    //     )
    // }

    return (
        <footer className='footer'>
            {isOpen ? <Order closeHour={closeHour} openHour={openHour}/> :
                <p>We're happy to welcome you between {openHour}:00 and {closeHour}:00 </p>
            }
        </footer>
    )
}

function Order({closeHour, openHour}) {
    return (
        <div className="order">
            <p>
                We're open from {openHour}:00 to {closeHour}:00. Come visit us or order online.
            </p>
            <button className="btn">Order</button>
        </div>
    )
}

// React v18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);