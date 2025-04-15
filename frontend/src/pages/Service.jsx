import React, { useState } from 'react';

const SERVICE = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  const handlePostQuestion = () => {
    console.log('Navigate to post question page');
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
                  <span className="lock-icon">🔒</span>
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
          <button className="postButton">POST QUESTION</button>
        </div>

        <div className="pagination">
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