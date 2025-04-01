import { Link } from "react-router-dom";

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
                <div className="title-underline"></div>
                <p className="description">
                    클라이밍을 처음 접하는 분들도 쉽고 재미있게 <br/>
                    클라이밍을 즐길 수 있는 곳, SHEEP SHIP 입니다. <br/>
                    <br/>
                    <br/>
                    서울권 클라이밍장을 한눈에 찾아볼 수 있습니다.<br/>
                    각 장소의 위치, 시설 정보, 운영 시간, 이용 요금 등의 상세한 정보도 함께 제공합니다.<br/>
                    <br/>
                    또한, 루트 파인드 기능을 통해 자신에게 맞는 난이도의 루트를 찾을 수 있으며, <br/>
                    초보자부터 전문가까지 다양한 레벨의 클라이머들이 적합한 루트를 선택하는 데 도움을 받을 수 있습니다.<br/>
                    <br/>
                    뿐만 아니라, 클라이밍 용품 구매도 가능합니다. 클라이밍화, 초크백, 하네스, 퀵드로 등 다양한 장비를 한곳에서 비교<br/>
                    하고 구매할 수 있어 편리합니다.<br/>
                    서울에서 클라이밍을 즐기고 싶다면, 이 사이트를 통해 원하는 정보를 빠르고 쉽게 찾아보세요!<br/>
                </p>
            </div>

            {/* 콘텐츠 섹션 */}
            <div className="contentGrid">
                <div className="contentCard">
                    <img src="/imgs/brand/shop_find.png" alt="클라이밍 위치 찾기" className="image" />
                    <h2 className="cardTitle">클라이밍짐 위치 찾기</h2>
                    <p className="cardText">클라이밍짐 위치를 한 눈에 찾아보기</p>
                    <Link to="/center" className="buttonBlue">CENTER</Link>
                </div>
                <div className="contentCard">
                    <img src="/imgs/brand/root_find.png" alt="루트파인딩" className="image" />
                    <h2 className="cardTitle">루트파인드(Route Find)</h2>
                    <p className="cardText">문제를 풀다가 정답이 궁금할때<br/>
                        ※루트파인드: 클라이밍 할 때, 올라가는 길을 미리 생각하는것</p>
                    <Link to="/rootfind" className="buttonBlue">ROOTFIND</Link>
                </div>
            </div>

            {/* 하단 상품 소개 */}
            <div className="productSection">
                <img src="/imgs/brand/Link.png" alt="클라이밍 용품" className="image" />
                <h2 className="cardTitle">클라이밍 용품</h2>
                <p className="cardText">암벽화와 클라이밍 용품을 할인된 가격에 구매할 수 있습니다.</p>
                <Link to="/shop" className="buttonBlue">SHOP</Link>
            </div>
        </div>
    )
}

export default Brand;