import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [allNews, setAllNews] = useState([]);
    const [displayedNews, setDisplayedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const newsPerPage = 6;
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await fetch (`http://localhost:8000/api/news`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                let newsItems = [];

                if (Array.isArray(data)) {
                    newsItems = data.map(item => formatNewsItem(item));
                } else if (data?.data && Array.isArray(data.data)) {
                    newsItems = data.data.map(item => formatNewsItem(item));
                } else if (data && typeof data === 'object') {
                    if (data.judul) {
                        newsItems = [formatNewsItem(data)];
                    } else {
                        const possibleDataKeys = ['articles', 'items', 'news', 'publikasi', 'berita'];
                        for (const key of possibleDataKeys) {
                            if (Array.isArray(data[key])) {
                                newsItems = data[key].map(item => formatNewsItem(item));
                                break;
                            }
                        }
                    }
                }

                if (newsItems.length === 0) {
                    newsItems = generateMockData();
                }

                if (newsItems.length > 0) {
                    setAllNews(newsItems);
                    const uniqueCategories = [...new Set(newsItems.map(item => item.source.name))];
                    setCategories(uniqueCategories);
                    setDisplayedNews(newsItems.slice(0, newsPerPage));
                    setHasMore(newsItems.length > newsPerPage);
                } else {
                    setError("Failed to load news data. Please try again later.");
                }
            } catch (error) {
                console.error("Error fetching news:", error);
                setError("Failed to fetch news. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const formatNewsItem = (item) => {
        const getDescriptionFromHtml = (html) => {
            if (!html) return "";
            try {
                if (typeof document !== 'undefined') {
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = html;
                    const firstParagraph = tempDiv.querySelector("p");
                    return firstParagraph ? 
                        firstParagraph.textContent.substring(0, 150) + "..." : 
                        tempDiv.textContent.substring(0, 150) + "...";
                } else {
                    return html.replace(/<[^>]*>/g, ' ').substring(0, 150) + "...";
                }
            } catch {
                return html.replace(/<[^>]*>/g, ' ').substring(0, 150) + "...";
            }
        };

        const title = item.judul || item.title || "";
        const description = item.deskripsi ? getDescriptionFromHtml(item.deskripsi) : (item.description || "");
        const slug = item.slug || "";
        const url = slug ? `/news/${slug}` : (item.url || "#");

        let imageUrl = "/api/placeholder/800/500";
        if (item.gambar) {
            if (!item.gambar.startsWith('http')) {
                imageUrl = `https://drive.google.com/thumbnail?id=${item.gambar}&sz=w1000`;
            } else {
                imageUrl = item.gambar;
            }
        } else if (item.urlToImage) {
            imageUrl = item.urlToImage;
        } else if (item.image) {
            imageUrl = item.image;
        }

        const sourceName = item.kategori || 
            (item.source ? (typeof item.source === 'string' ? item.source : item.source.name) : "News");

        return {
            title,
            description,
            url,
            urlToImage: imageUrl,
            publishedAt: item.created_at || item.publishedAt || item.date || "",
            source: { name: sourceName },
            author: item.penulis || item.author || "",
            content: item.deskripsi || item.content || ""
        };
    };

    const generateMockData = () => {
        const categories = ["Life Style", "Technology", "Business", "Health", "Sports", "Entertainment"];
        return Array.from({ length: 20 }, (_, i) => {
            const category = categories[i % categories.length];
            return {
                title: `Sample Article ${i + 1} about ${category}`,
                description: `This is a sample description for article ${i + 1} in the ${category} category.`,
                url: `/news/sample-article-${i + 1}`,
                urlToImage: `/api/placeholder/800/500`,
                publishedAt: new Date(2025, 4, i + 1).toISOString(),
                source: { name: category },
                author: "Sample Author",
                content: `<p>Sample content for article ${i + 1}</p>`
            };
        });
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        const startIndex = page * newsPerPage;
        const endIndex = startIndex + newsPerPage;

        const filteredNews = activeCategory === "all" 
            ? allNews 
            : allNews.filter(news => news.source.name === activeCategory);

        if (startIndex < filteredNews.length) {
            const newItems = filteredNews.slice(startIndex, endIndex);
            setDisplayedNews((prev) => [...prev, ...newItems]);
            setPage(nextPage);
            setHasMore(endIndex < filteredNews.length);
        } else {
            setHasMore(false);
        }
    };

    const navigate = useNavigate();

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setPage(1);

        const filteredNews = category === "all" 
            ? allNews 
            : allNews.filter(news => news.source.name === category);

        setDisplayedNews(filteredNews.slice(0, newsPerPage));
        setHasMore(filteredNews.length > newsPerPage);

        navigate(`/news?category=${category === "all" ? "" : encodeURIComponent(category)}`);
    };

    const getCategoryCount = (categoryName) => {
        return allNews.filter(news => news.source.name === categoryName).length;
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            <section className="py-12 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Categories</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Browse all our news categories and discover the content that interests you
                    </p>
                </div>
            </section>

            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">All Categories</h2>
                    
                    {loading ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500">Loading categories...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-red-500">{error}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div
                                className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition duration-300 hover:shadow-xl bg-gray-800 text-white`}
                                onClick={() => handleCategoryChange("all")}
                            >
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 absolute inset-0 opacity-80"></div>
                                <div className="p-8 relative z-10">
                                    <h3 className="text-2xl font-bold mb-2">All News</h3>
                                    <p className="text-gray-200 mb-4">Browse all our latest articles</p>
                                    <span className="bg-white text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                        {allNews.length} Articles
                                    </span>
                                </div>
                            </div>

                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition duration-300 hover:shadow-xl"
                                    onClick={() => handleCategoryChange(category)}
                                >
                                    <div className="bg-gradient-to-r from-gray-700 to-gray-900 absolute inset-0 opacity-80"></div>
                                    <div className="p-8 relative z-10">
                                        <h3 className="text-2xl font-bold mb-2 text-white">{category}</h3>
                                        <p className="text-gray-200 mb-4">Browse {category} articles</p>
                                        <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                                            {getCategoryCount(category)} Articles
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default CategoriesPage;
