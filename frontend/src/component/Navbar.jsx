const Navbar = () => {
    return (
        <div className="navbar">
            <ul className="nav-list">
                <li><a href="#">SHOP</a></li>
                <li><a href="#">CENTER</a></li>
                <li><a href="#">ROOTFIND</a></li>
                <li><a href="#">BRAND</a></li>
            </ul>
            <img src="/icons/MainIcon.svg" alt="MainIcon" className="MainIcon"/>
            <div className="nav-icons">
                <img src="/icons/search.svg" alt="searchIcon"/>
                <img src="/icons/market.svg" alt="marketIcon"/>
                <img src="/icons/profile.svg" alt="profileIcon"/>
            </div>
        </div>
    )
}

export default Navbar;