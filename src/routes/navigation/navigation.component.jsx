import {Outlet, Link} from 'react-router-dom';
import { Fragment,useContext } from 'react';
import { UserContext } from '../../context/user.context';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { signOutUser } from '../utils/firebase/firebase.utils';
import { CartContext } from '../../context/cart.context';
import './navigation.component.styles.scss';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
const Shop = () =>{
    return (<div>This is the shop</div>)
}
const Navigation = () =>{
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  console.log(currentUser);
  console.log(currentUser == null);
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrwnLogo className='logo'/>
                <div>Logo</div>
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                    Shop
                </Link>
                {
                  currentUser ? (
                    <span className='nav-link' > Sign Out</span>)
                  :  (<Link className='nav-link' to='/auth'> Sign In</Link>
                  )
                }
               <CartIcon /> 
            </div>
          {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    );
  }

export default Navigation;