import { Home } from "./components/Home";
import { Footer } from "./components/layouts/Footer";
import { Header } from "./components/layouts/Header";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ProductDetails } from "./components/product/ProductDetails/ProductDetails";
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";


function App() {
  return (
    <Router >
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" exact component={Home} />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" exact component={ProductDetails} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />

        </div>
        <Footer />
      </div>
    </Router >
  );
}

export default App;
