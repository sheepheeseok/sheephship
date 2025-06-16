import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SERVICE = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const questions = [
    {
      id: 1,
      title: '[답변 완료] 제품 색상 관련 (1)',
      product: '콜렉터스팬츠_샌드스톤 (Collectors pants_sand stone)',
      author: '희suck',
      date: '2025.01.21'
    },
    {
      id: 2,
      title: '[답변 완료] 제품 색상 관련 (1)',
      product: '콜렉터스팬츠_샌드스톤 (Collectors pants_sand stone)',
      author: '희suck',
      date: '2025.01.21'
    },
    {
      id: 3,
      title: '[답변 완료] 제품 색상 관련 (1)',
      product: '콜렉터스팬츠_샌드스톤 (Collectors pants_sand stone)',
      author: '희suck',
      date: '2025.01.21'
    },
    {
      id: 4,
      title: '[답변 완료] 제품 색상 관련 (1)',
      product: '콜렉터스팬츠_샌드스톤 (Collectors pants_sand stone)',
      author: '희suck',
      date: '2025.01.21'
    },
    {
      id: 5,
      title: '[답변 완료] 제품 색상 관련 (1)',
      product: '콜렉터스팬츠_샌드스톤 (Collectors pants_sand stone)',
      author: '희suck',
      date: '2025.01.21'
    },
    {
      id: 6,
      title: '[답변 완료] 제품 색상 관련 (1)',
      product: '콜렉터스팬츠_샌드스톤 (Collectors pants_sand stone)',
      author: '희suck',
      date: '2025.01.21'
    }
  ];
  const handleSearch = () => {
    console.log('Searching for:', searchText);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="container">
      <div className="customerService">
        <h1 className="service-title">고객센터</h1>
        <p className="subtitle">어려움이나 궁금한 점이 있으신가요?</p>

        <div className="questionList">
          {questions.map((question) => (
            <div key={question.id} className="questionItem">
              <span className="qMark">Q</span>
              <div className="questionContent">
                <div className="questionTitle">
                  <span className="lock-icon">
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.33594 5.42578C1.33594 5.1888 1.33366 4.94727 1.3291 4.70117C1.32454 4.45508 1.33138 4.20898 1.34961 3.96289C1.35872 3.74414 1.37467 3.52767 1.39746 3.31348C1.42025 3.09928 1.45898 2.88737 1.51367 2.67773C1.60482 2.3405 1.75065 2.02148 1.95117 1.7207C2.16081 1.41992 2.40234 1.15332 2.67578 0.920898C2.94922 0.688477 3.25 0.494792 3.57812 0.339844C3.90625 0.184896 4.24349 0.0846357 4.58984 0.0390625C5.11849 -0.0429688 5.61979 -0.015625 6.09375 0.121094C6.56771 0.248698 6.99154 0.44694 7.36523 0.71582C7.73893 0.9847 8.05794 1.31055 8.32227 1.69336C8.57747 2.07617 8.75521 2.48177 8.85547 2.91016C8.89193 3.08333 8.91699 3.25879 8.93066 3.43652C8.94434 3.61426 8.95117 3.78971 8.95117 3.96289C8.96029 4.20898 8.96484 4.45508 8.96484 4.70117C8.96484 4.94727 8.96484 5.19792 8.96484 5.45312C9.01953 5.45312 9.06738 5.45312 9.1084 5.45312C9.14941 5.45312 9.19271 5.45312 9.23828 5.45312C9.47526 5.46224 9.66895 5.53971 9.81934 5.68555C9.96973 5.83138 10.0449 6.02279 10.0449 6.25977C10.0449 6.66992 10.0449 7.08008 10.0449 7.49023C10.054 7.90039 10.0586 8.31055 10.0586 8.7207C10.0586 9.13086 10.054 9.54102 10.0449 9.95117C10.0449 10.3613 10.0449 10.7715 10.0449 11.1816C10.0449 11.4368 9.96517 11.6374 9.80566 11.7832C9.64616 11.929 9.43425 12.002 9.16992 12.002C8.68685 12.002 8.20378 12.002 7.7207 12.002C7.23763 12.002 6.75456 12.002 6.27148 12.002C5.85221 12.002 5.42839 12.002 5 12.002C4.58073 12.002 4.16146 12.002 3.74219 12.002C3.32292 12.002 2.90365 12.002 2.48438 12.002C2.0651 12.002 1.64128 12.002 1.21289 12.002C0.875651 12.002 0.631836 11.9268 0.481445 11.7764C0.331055 11.626 0.251302 11.3822 0.242188 11.0449C0.242188 10.6621 0.242188 10.2839 0.242188 9.91016C0.242188 9.52734 0.242188 9.14453 0.242188 8.76172C0.242188 8.37891 0.242188 8.00065 0.242188 7.62695C0.242188 7.24414 0.242188 6.86133 0.242188 6.47852C0.242188 6.10482 0.312826 5.84505 0.454102 5.69922C0.595378 5.55339 0.852865 5.47135 1.22656 5.45312C1.24479 5.45312 1.26074 5.45085 1.27441 5.44629C1.28809 5.44173 1.30859 5.4349 1.33594 5.42578ZM7.32422 5.43945C7.32422 5.12044 7.32878 4.80599 7.33789 4.49609C7.34701 4.1862 7.33789 3.8763 7.31055 3.56641C7.27409 3.04688 7.06445 2.60254 6.68164 2.2334C6.29883 1.86426 5.85677 1.66146 5.35547 1.625C4.80859 1.58854 4.31185 1.7207 3.86523 2.02148C3.41862 2.32227 3.14518 2.73242 3.04492 3.25195C2.98112 3.59831 2.95378 3.95378 2.96289 4.31836C2.97201 4.68294 2.97201 5.04297 2.96289 5.39844C2.96289 5.40755 2.96745 5.41439 2.97656 5.41895C2.98568 5.4235 2.99479 5.43034 3.00391 5.43945C3.71484 5.43945 4.43034 5.43945 5.15039 5.43945C5.87044 5.43945 6.59505 5.43945 7.32422 5.43945Z" fill="currentColor"/>
                    </svg>
                  </span>
                  {question.title}
                </div>
                <div className="productName">{question.product}</div>
              </div>
              <div className="questionInfo">
                <span className="author">{question.author}</span>
                <span className="date">{question.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="searchArea">
          <input
            type="text"
            className="searchInput"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="searchButton">SEARCH</button>
        </div>
        <div className="service-pagination">
          {[1, 2, 3, 4, 5].map((page) => (
            <span
              key={page}
              className={currentPage === page ? 'active' : ''}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </span>
          ))}
          <span className="next">{'>'}</span>
        </div>
      </div>
    </div>
  );
};
export default SERVICE;
