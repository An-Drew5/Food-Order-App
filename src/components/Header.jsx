import { use } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
    const cartCtx = use(CartContext);
    const userProgressCtx = use(UserProgressContext);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) =>{
        return totalNumberOfItems + item.quantity;
    }, 0);

    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="Logo" />
            <h1>Big Mike's Eatary</h1>
        </div>
        <nav>
            <Button onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
        </nav>
    </header>
}