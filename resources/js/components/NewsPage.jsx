import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const API_URL = "https://winnicode.com/api/publikasi-berita";
const API_KEY = "a42278524bee772194f2ad0e9ac88a5893aa733db4d1c684d89c2dc08b7f718a";
const ITEMS_PER_PAGE = 6;

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = useQuery();
  const keywordFromURL = query.get("q")?.toLowerCase() || "";

  function useQuery() {
  return new URLSearchParams(useLocation().search);
  }

useEffect(() => {
  async function fetchNews() {
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      if (!res.ok) {
        console.error("Fetch error", res.status);
        setLoading(false);
        return;
      }
      const json = await res.json();

      let newsList = [];
      if (Array.isArray(json)) {
        newsList = json;
      } else if (Array.isArray(json.data)) {
        newsList = json.data;
      } else if (Array.isArray(json.berita)) {
        newsList = json.berita;
      }

      // Filter berdasarkan kata kunci dari URL (misal ?q=apple)
      const filtered = keywordFromURL
        ? newsList.filter((item) =>
            item.judul?.toLowerCase().includes(keywordFromURL)
          )
        : newsList;

      setNews(filtered);
      setDisplayedNews(filtered.slice(0, ITEMS_PER_PAGE));
      setHasMore(filtered.length > ITEMS_PER_PAGE);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  }
  fetchNews();
}, [keywordFromURL]);



  const handleLoadMore = () => {
    const currentLength = displayedNews.length;
    const filtered = news.filter((item) =>
      item.judul?.toLowerCase().includes(searchTerm)
    );
    const moreItems = filtered.slice(currentLength, currentLength + ITEMS_PER_PAGE);
    setDisplayedNews([...displayedNews, ...moreItems]);
    setHasMore(filtered.length > displayedNews.length + moreItems.length);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getImageUrl = (gambarId) => {
    return gambarId
      ? `https://drive.google.com/thumbnail?id=${gambarId}&sz=w1000`
      : "https://via.placeholder.com/150"; // Placeholder image
  };


  return (
    <>
      <Navbar />
      <section className="py-8 bg-gray-100">    

        {loading ? (
          <p className="text-center">Loading news...</p>
        ) : displayedNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4  mx-auto container">
            {displayedNews.map((newsItem, index) => (
              <div
                key={newsItem.id || index}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={getImageUrl(newsItem.gambar)}
                  alt={newsItem.judul}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mt-1">
                    <Link
                      to={`/news/${newsItem.slug}`}
                      className="hover:text-blue-600"
                    >
                      {newsItem.judul}
                    </Link>
                  </h3>
                  <p
                    className="text-gray-600 mt-2 text-sm line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: newsItem.deskripsi }}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">
                      {formatDate(newsItem.created_at)}
                    </span>
                    <Link
                      to={`/news/${newsItem.slug}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No news available at the moment</p>
          </div>
        )}

        <div className="mt-6 text-center">
          {hasMore && displayedNews.length > 0 ? (
            <button
              onClick={handleLoadMore}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Load More News
            </button>
          ) : (
            displayedNews.length > 0 && (
              <p className="text-gray-500">No more news to load</p>
            )
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NewsPage;
