import logo from './logo.svg';
import './App.css';
import './categories.styles.scss'
import Directory from './components/directory/directory.component';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import {Route,Routes} from 'react-router-dom';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';

const App = () => {
  return(
    <Routes>
      <Route path='/' element={<Navigation />}>
      <Route index element={<Home />}/>
       <Route path ='shop' element={<Shop />}></Route>
       <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
}
export default App;
