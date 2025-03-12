import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";

function App() {
    return(
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