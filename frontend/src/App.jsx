import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx"
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import FloatingButton from "./component/FloatingButton.jsx";
import Brand from "./pages/Brand.jsx";
import QnA from "./pages/QnA.jsx";
import Payment from "./pages/Payment.jsx";


// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
function App() {
    // const [hello, setHello] = useState('')
    //
    // useEffect(() => {
    //     axios.get('/api/hello')
    //         .then(response => setHello(response.data))
    //         .catch(error => console.log(error))
    // }, []);

    return(
        // <div>
        //     백엔드에서 가져온 데이터입니다 : {hello}
        // </div>
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} /> {/* 홈 */}
                <Route path="/Login" element={<Login/>} /> {/* 로그인 */}
                <Route path="/Signup" element={<Signup/>} /> {/* 회원가입 */}
                <Route path="/Product/:id" element={<Product/>} /> { /* 제품 상세 */}
                <Route path="/Shop" element={<Shop/>} /> {/* 샵 */}
                <Route path="/Payment" element={<Payment/>} /> {/* QnA */}
                <Route path="/Brand" element={<Brand/>} /> {/* Brand */}
                <Route path="/QnA" element={<QnA/>} /> {/* QnA */}
            </Routes>
            <Footer/>
            <FloatingButton/>
        </>
    )
}

export default App;