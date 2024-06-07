import { useGSAP } from '@gsap/react';
import axios from 'axios';
import { gsap } from 'gsap';
import React, { useEffect, useState } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import './index.css';
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?&category=${props.category}&country=${props.country}&apiKey=c3677ac491e64ce48003dfc11a1d7dbe&page=${currentPage}&pageSize=${itemsPerPage}`
      );

      if (response.data && response.data.articles) {
        setArticles(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / itemsPerPage));
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dummyImage = 'https://th.bing.com/th/id/OIP.focxdosXfLcVMbGpnwmbHQAAAA?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7';

  return (
    <>
      <div className="titlediv" style={{marginTop:'80px'}}>
        <h1 className={`text-center text-${props.textcolor} mt-5`} style={{fontFamily:'Josefin Sans'}}>Welcome to Gorilla News</h1>
      </div>
      <div className={`container container-fluid my-5 bg-${props.mode} text-${props.textcolor}`}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {articles.map((article, index) => (
                <div className="col mb-3 mb-md-4" key={index}>
                  <NewsItems
                    url={article.urlToImage || dummyImage}
                    title={article.title || 'News is not available'}
                    description={article.description || 'Data is not available'}
                    url1={article.url || 'Data is not available'}
                    mode1={props.mode}
                    textcolor={props.textcolor}
                  />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-primary mx-2"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default News;
