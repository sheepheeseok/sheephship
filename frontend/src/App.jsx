import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx"
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";

function App() {
    return(
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} /> {/* 홈 */}
                <Route path="/Login" element={<Login/>} /> {/* 로그인 */}
            </Routes>
            <Footer/>
        </>
    )
}

export default App;