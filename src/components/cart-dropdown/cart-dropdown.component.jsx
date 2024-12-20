import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { useContext } from 'react';
const CartDropdown = () =>{

    const {cartItems} = useContext(CartContext);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(item =>(
                     <CartItem key={item.id} 
                        cartItem={item} />
                    ))}
            </div>
            <Button>Go to checkout</Button> 
        </div>
    )
}

export default CartDropdown;