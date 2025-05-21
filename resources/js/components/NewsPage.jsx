import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Filter from "./Filters"; // Adjust the path as needed

const API_URL = "https://winnicode.com/api/publikasi-berita";
const API_KEY = "a42278524bee772194f2ad0e9ac88a5893aa733db4d1c684d89c2dc08b7f718a";
const ITEMS_PER_PAGE = 6;

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const location = useLocation();
  const query = useQuery();
  const keywordFromURL = query.get("q")?.toLowerCase() || "";
  const categoryFromURL = query.get("category") || "";
  
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json"
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

        // Process each news item to standardize format
        const processedNewsList = newsList.map(item => formatNewsItem(item));
        
        // Extract categories from the news items
        const uniqueCategories = [...new Set(processedNewsList.map(item => 
          item.kategori || (item.source && item.source.name) || "Uncategorized"
        ))];
        setCategories(uniqueCategories);
        
        // Initial active category from URL or default to "all"
        const initialCategory = categoryFromURL || "all";
        setActiveCategory(initialCategory);
        
        // Apply filters (keyword and category)
        let filtered = processedNewsList;
        
        // Filter by keyword if provided
        if (keywordFromURL) {
          filtered = filtered.filter(item => 
            item.judul?.toLowerCase().includes(keywordFromURL) || 
            item.title?.toLowerCase().includes(keywordFromURL)
          );
        }
        
        // Filter by category if provided and not "all"
        if (initialCategory && initialCategory !== "all") {
          filtered = filtered.filter(item => {
            const itemCategory = item.kategori || 
                              (item.source ? (typeof item.source === 'string' ? item.source : item.source.name) : "");
            return itemCategory.toLowerCase() === initialCategory.toLowerCase();
          });
        }

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
  }, [keywordFromURL, categoryFromURL]);

  // Format news item to standardize structure
  const formatNewsItem = (item) => {
    // Return the item with standardized properties
    return {
      id: item.id,
      judul: item.judul || item.title || "",
      title: item.judul || item.title || "",
      slug: item.slug || "",
      deskripsi: item.deskripsi || item.description || "",
      description: item.deskripsi || item.description || "",
      gambar: item.gambar || "",
      created_at: item.created_at || item.publishedAt || item.date || new Date().toISOString(),
      kategori: item.kategori || (item.source ? (typeof item.source === 'string' ? item.source : item.source.name) : ""),
      penulis: item.penulis || item.author || "",
      source: {
        name: item.kategori || (item.source ? (typeof item.source === 'string' ? item.source : item.source.name) : "")
      }
    };
  };

  const handleCategoryChange = (category) => {
    // Update URL with the new category parameter
    const currentURL = new URL(window.location.href);
    if (category === "all") {
      currentURL.searchParams.delete("category");
    } else {
      currentURL.searchParams.set("category", category);
    }
    
    // Update the browser history without refreshing the page
    window.history.pushState({}, '', currentURL);
    
    // Filter news by selected category
    const filtered = category === "all" 
      ? news 
      : news.filter(item => {
          const itemCategory = item.kategori || 
                            (item.source ? (typeof item.source === 'string' ? item.source : item.source.name) : "");
          return itemCategory.toLowerCase() === category.toLowerCase();
        });
    
    setActiveCategory(category);
    setDisplayedNews(filtered.slice(0, ITEMS_PER_PAGE));
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    const currentLength = displayedNews.length;
    
    // Apply current filters
    let filtered = news;
    
    // Apply search term filter if any
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.judul?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter if not "all"
    if (activeCategory !== "all") {
      filtered = filtered.filter(item => {
        const itemCategory = item.kategori || 
                          (item.source ? (typeof item.source === 'string' ? item.source : item.source.name) : "");
        return itemCategory.toLowerCase() === activeCategory.toLowerCase();
      });
    }
    
    const moreItems = filtered.slice(currentLength, currentLength + ITEMS_PER_PAGE);
    setDisplayedNews([...displayedNews, ...moreItems]);
    setHasMore(filtered.length > displayedNews.length + moreItems.length);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getImageUrl = (gambarId) => {
    if (!gambarId) return "https://via.placeholder.com/150"; // Placeholder image
    
    // Check if it's already a full URL
    if (gambarId.startsWith('http')) {
      return gambarId;
    }
    
    // Assume it's a Google Drive ID
    return `https://drive.google.com/thumbnail?id=${gambarId}&sz=w1000`;
  };

  return (
    <>
      <Navbar />
      <section className="py-8 bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">
            {activeCategory === "all" ? "All News" : `${activeCategory} News`}
            {keywordFromURL && (
              <span className="text-gray-600 text-xl ml-2">
                {" "}
                - Search results for "{keywordFromURL}"
              </span>
            )}
          </h1>
          
          {/* Filters Component */}
          {/* <Filter
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          /> */}

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading news...</p>
            </div>
          ) : displayedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <span className="text-xs font-semibold text-blue-600">
                      {newsItem.kategori || (newsItem.source && newsItem.source.name) || "News"}
                    </span>
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
              <p className="text-gray-500">
                {activeCategory === "all" 
                  ? "No news available at the moment" 
                  : `No news available in the ${activeCategory} category`}
                {keywordFromURL && ` containing "${keywordFromURL}"`}
              </p>
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
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NewsPage;