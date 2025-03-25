const Brand = () => {

    return (
        <div className="container">
            {/* 상단 이미지 */}
            <div className="banner">
                <img src="/imgs/brand/Container.png" alt="Brand Banner" layout="fill" objectFit="cover" className="bannerImage" />
            </div>

            {/* 브랜드 소개 */}
            <div className="intro">
                <h1 className="title">SHEEP SHIP</h1>
                <p className="description">
                    클라이밍을 처음 접하는 분들도 쉽고 재미있게 <br/>
                    클라이밍을 즐길 수 있는 곳, SHEEP SHIP 입니다. <br/>
                    <br/>
                    서울권 클라이밍장울 한눈에 찾아볼 수 있습니다.
                </p>
            </div>

            {/* 콘텐츠 섹션 */}
            <div className="contentGrid">
                <div className="contentCard">
                    <img src="/imgs/brand/shop_find.png" alt="클라이밍 위치 찾기" width={500} height={300} className="image" />
                    <h2 className="cardTitle">클라이밍짐 위치 찾기</h2>
                    <p className="cardText">클라이밍짐 위치를 한 눈에 찾아보기</p>
                    <button className="buttonBlue">CENTER</button>
                </div>
                <div className="contentCard">
                    <img src="/imgs/brand/root_find.png" alt="루트파인딩" width={500} height={300} className="image" />
                    <h2 className="cardTitle">루트파인드(Route Find)</h2>
                    <p className="cardText">문제를 풀다가 정답이 궁금할때</p>
                    <button className="buttonBlue">ROUTEFIND</button>
                </div>
            </div>

            {/* 하단 상품 소개 */}
            <div className="productSection">
                <img src="/imgs/brand/Link.png" alt="클라이밍 용품" width={500} height={300} className="image" />
                <h2 className="cardTitle">클라이밍 용품</h2>
                <p className="cardText">암벽화와 클라이밍 용품을 할인된 가격에 구매할 수 있습니다.</p>
                <button className="buttonBlue">SHOP</button>
            </div>
        </div>
    )
}

export default Brand;