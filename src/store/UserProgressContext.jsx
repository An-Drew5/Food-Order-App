import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckOut: () => {},
    hideCheckout: () => {}
}); 

export function UserProgressContextProvider ({children}) {
    const [userProgress, setUserProgress] = useState('');

    function showCart (){
        setUserProgress('cart');
    }

    function hideCart() {
        setUserProgress('');
    }

    function showCheckOut () {
        setUserProgress('checkout')
    }

    function hideCheckout () {
        setUserProgress('')
    }

    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckOut,
        hideCheckout
    }

    return <UserProgressContext value={userProgressCtx}>{children}</UserProgressContext>
}  

export default UserProgressContext;