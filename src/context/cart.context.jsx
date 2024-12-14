import { createContext,useState } from "react";
import { useEffect } from "react";
const addCartItem = (cartItems, productToAdd) => {
    console.log('cart items: ', cartItems);
    //find if cartItems contains productToAdd
     const existingCartItem = cartItems.find(
        (cartitem)=> cartitem.id === productToAdd.id
    );
    //if found increment quantity
    if(existingCartItem) {
        return cartItems.map((cartitem) => 
            cartitem.id === productToAdd.id
         ? {...cartitem,quantity:cartitem.quantity+1}
         : cartitem
        );

    }

    //return new array with modified cartItems/cart item
    return [...cartItems,{...productToAdd,quantity:1}];
}

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: ()=>{},
    cartItems : [],
    addItemToCart:() =>{},
    cartCount : 0
});

/**
 * product
 * {
 *  id,
 *  name,
 *  price,
 *  description
 * }
 * @param {*} param0 
 * @returns 
 */

export const CartProvider = ({children}) =>{
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    
    useEffect(()=>{
        const newCartCount = cartItems.reduce(
            (total,cartItem)=> 
                total + cartItem.quantity,0
            );
        setCartCount(newCartCount);    
    },[cartItems]);
    
    const addItemToCart =(productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd))
    }
    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,cartCount};
    
    return (
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
    );
}