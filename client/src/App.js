import { Home } from "./components/Home";
import { Footer } from "./components/layouts/Footer";
import { Header } from "./components/layouts/Header";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ProductDetails } from "./components/product/ProductDetails/ProductDetails";
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/user/user-actions";
import { Profile } from "./components/user/Profile";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import { UpdateProfile } from "./components/user/UpdateProfile";
import { UpdatePassword } from "./components/user/UpdatePassword";
import { Cart } from "./components/cart/Cart";
import { Shipping } from "./components/cart/Shipping";
import { ConfirmOrder } from "./components/cart/ConfirmOrder";
import axios from 'axios'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Payment } from "./components/cart/Payment";
import { OrderCheck } from "./components/cart/OrderCheck";

function App() {


  const [stripeApiKey, setStripeApiKey] = useState('')

  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(loadUser())

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/stripe')
        setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()

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
          <ProtectedRoutes path="/order/confirm" exact component={ConfirmOrder} />
          {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoutes path="/payment" component={Payment} />
            </Elements>

          }
          <Route path="/done" exact component={OrderCheck} />

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
