import { Home } from "./components/Home";
import { Footer } from "./components/layouts/Footer";
import { Header } from "./components/layouts/Header";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ProductDetails } from "./components/product/ProductDetails/ProductDetails";
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/user/user-actions";
import { Profile } from "./components/user/Profile";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import { UpdateProfile } from "./components/user/UpdateProfile";
import { UpdatePassword } from "./components/user/UpdatePassword";
import { Cart } from "./components/cart/Cart";
import { Shipping } from "./components/cart/Shipping";


function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  })
  return (
    <Router >
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" exact component={Home} />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" exact component={ProductDetails} />
          <Route path="/cart" exact component={Cart} />
          <ProtectedRoutes path="/shipping" exact component={Shipping} />


          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />

          <ProtectedRoutes path="/me" exact component={Profile} />
          <ProtectedRoutes path="/me/update" exact component={UpdateProfile} />
          <ProtectedRoutes path="/password/update" exact component={UpdatePassword} />
        </div>
        <Footer />
      </div>
    </Router >
  );
}

export default App;
