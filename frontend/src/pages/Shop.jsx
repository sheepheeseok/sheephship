const Shop = () => {
    const images = Array.from({ length: 18 }, (_, i) => `/imgs/InstaBox/insta${i + 1}.png`);

    return (
        <div className="container">
            <ul className="shop-menu">
                <li><a href="#">ALL</a></li>
                <li><a href="#">BOTTOM</a></li>
                <li><a href="#">TOP</a></li>
                <li><a href="#">CHALK BAGS</a></li>
                <li><a href="#">ACC</a></li>
                <li><a href="#">SKIN CARE</a></li>
            </ul>
        </div>
    )
}

export default Shop;