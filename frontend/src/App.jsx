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
import Center from "./pages/Center.jsx";
import MyPage from "./pages/MyPage.jsx";
import PrivateRoute from "./hooks/PrivateRoute.js";
import Cart from "./pages/Cart.jsx";
import Service from "./pages/Service.jsx";
import Inquiry from "./pages/Inquiry.jsx";
import InquiryAnwser from "./pages/InquiryAnwser.jsx";
import RootFind from "./pages/RootFind.jsx";


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
                <Route path="/Mypage"
                       element={<PrivateRoute><MyPage/></PrivateRoute>}/>{" "} { /* 마이페이지 */}
                <Route path="/Product/:id" element={<Product/>} /> { /* 제품 상세 */}
                <Route path="/Shop" element={<Shop/>} /> {/* 샵 */}
                <Route path="/Payment" element={<Payment/>} /> {/* Payment */}
                <Route path="/Cart" element={<Cart/>} /> { /* Cart */}
                <Route path="/Center" element={<Center/>} /> {/* Center */}
                <Route path="/Brand" element={<Brand/>} /> {/* Brand */}
                <Route path="/QnA" element={<QnA/>} /> {/* QnA */}
                <Route path="/Service" element={<Service/>} /> {/* 서비스 */}
                <Route path="/Inquiry" element={<Inquiry/>} /> {/* 포스트 */}
                <Route path="/InquiryAnwser" element={<InquiryAnwser/>} /> {/* 포스트 답변 */}
                <Route path="/RootFind" element={<RootFind/>} /> {/* 루트파인드 */}
            </Routes>
            <Footer/>
            <FloatingButton/>
        </>
    )
}

export default App;