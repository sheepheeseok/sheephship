import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Navbar from "./component/Navbar.jsx";

function App() {
    return(
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} /> {/* 홈 */}
            </Routes>
        </>
    )
}

export default App;