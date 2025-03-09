import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const NewsAPI = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const API_KEY = "339a8f29af22a29a242bc7ad64792f76PI";
        const response = await axios.get(
          `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=339a8f29af22a29a242bc7ad64792f76`
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <style>
        {`
          .news-container {
            max-width: 1200px;
            margin: auto;
            padding: 20px;
            font-family: Arial, sans-serif;
          }

          h1 {
            text-align: center;
            margin-bottom: 20px;
          }

          .news-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }

          .news-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease-in-out;
          }

          .news-card:hover {
            transform: translateY(-5px);
          }

          .news-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .news-title {
            padding: 15px;
            font-size: 1.2em;
            text-align: center;
          }

          .news-title a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
            transition: color 0.3s ease;
          }

          .news-title a:hover {
            color: #0056b3;
          }
        `}
      </style>

      <div className="news-container">
        <div>
          <Link
            to="/"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "1.2rem",
              backgroundColor: "#4caf50",
              color: "white",
              textDecoration: "none",
              borderRadius: "25px",
              display: "inline-block",
            }}
          >
            {" "}
            Back to Home
          </Link>
        </div>
        <h1>Here's the top 10 trending news today worldwide</h1>
        {loading ? (
          <h1 className="loading">Loading news...</h1>
        ) : (
          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-card">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="news-image"
                  />
                  <h2 className="news-title">{article.title}</h2>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NewsAPI;
