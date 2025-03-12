const Home = () => {
    const images = Array.from({ length: 18 }, (_, i) => `/imgs/InstaBox/insta${i + 1}.png`);

    return (
        <div className="container">
            <div className="Homelogo"></div>
            <div className="HomeInstagram">
                <h1>INSTAGRAM</h1>
                <h2>@SHEEPSHIP</h2>
                <div className="HomeInstagramBox">
                    {images.map((src, index) => (
                        <img key={index} src={src} alt={`Instagram ${index + 1}`} className="InstagramProduct" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;