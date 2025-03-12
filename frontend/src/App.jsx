import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
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
            </Routes>
            <Footer/>
        </>
    )
}

export default App;