import React, { useState, useEffect } from 'react';

const NewsPage = () => {
    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://winnicode.com/api/publikasi-berita');
                const data = await response.json();
                setNewsArticles(data.articles); // Menyimpan data artikel
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="news-container">
            {newsArticles.length > 0 ? (
                newsArticles.map((article) => (
                    <div className="news-card" key={article.id}>
                        <img 
                            src={`https://winnicode.com/storage/${article.gambar}`} 
                            alt={article.judul} 
                            className="news-image" 
                        />
                        <h2 className="news-title">{article.judul}</h2>
                        <p className="news-author">{article.penulis}</p>
                        <p className="news-category">{article.kategori}</p>
                        <div className="news-description" dangerouslySetInnerHTML={{ __html: article.deskripsi }}></div>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default NewsPage;
