import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Filters from "./Filters";

function Landing() {
    const [email, setEmail] = useState("");
    const [featuredNews, setFeaturedNews] = useState([]);
    const [trendingNews, setTrendingNews] = useState([]);
    const [allNews, setAllNews] = useState([]);
    const [displayedNews, setDisplayedNews] = useState([]);
    const [page, setPage] = useState(1);
    const newsPerPage = 3;
    const [hasMore, setHasMore] = useState(true);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                console.log("Fetching news from API...");
                const response = await fetch("http://localhost:8000/api/news");

                console.log("API response status:", response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API response data structure:", Object.keys(data));
                console.log("API response data sample:", data);

                // Handle different API response structures
                let newsItems = [];
                
                // Check for common response structures
                if (Array.isArray(data)) {
                    console.log("Data is an array with length:", data.length);
                    newsItems = data.map(item => formatNewsItem(item));
                } else if (data && data.data && Array.isArray(data.data)) {
                    // Many APIs wrap their data in a data property
                    console.log("Data is wrapped in data property with length:", data.data.length);
                    newsItems = data.data.map(item => formatNewsItem(item));
                } else if (data && typeof data === 'object') {
                    // Handle single object response
                    if (data.judul) {
                        // Single news item
                        console.log("Data is a single news item");
                        newsItems = [formatNewsItem(data)];
                    } else {
                        // Try to extract articles or items from response
                        const possibleDataKeys = ['articles', 'items', 'news', 'publikasi', 'berita'];
                        for (const key of possibleDataKeys) {
                            if (data[key] && Array.isArray(data[key])) {
                                console.log(`Found data in '${key}' property with length:`, data[key].length);
                                newsItems = data[key].map(item => formatNewsItem(item));
                                break;
                            }
                        }
                    }
                }
                
                console.log("Processed newsItems:", newsItems.length);
                
                // Create mock data for testing if no news items were found
                if (newsItems.length === 0) {
                    console.log("No news items found, adding mock data from API structure sample");
                    // Create mock data based on the structure in paste-2.txt
                    const mockItem = {
                        judul: "Work-Life Balance: Kunci Produktivitas dan Kebahagiaan Jangka Panjang",
                        penulis: "Dhifa Siti Nurhalifah",
                        kategori: "Life Style",
                        deskripsi: "<p>Work-life balance terasa seperti mimpi yang sering kali sulit digapai di tengah hiruk pikuk dunia modern yang serba cepat.</p>",
                        gambar: "1j8mOxqj282W1oklg8EV-t4j9FeDW5otw",
                        slug: "work-life-balance-kunci-produktivitas-dan-kebahagiaan-jangka-panjang",
                        created_at: "2025-05-08T14:38:49.000000Z"
                    };
                    newsItems = [formatNewsItem(mockItem)];
                }
                
                // If we have at least one item
                if (newsItems.length > 0) {
                    console.log("Setting state with news items");
                    setFeaturedNews(newsItems.slice(0, 1));
                    setTrendingNews(newsItems.slice(0, 5));
                    setAllNews(newsItems);
                    
                    // Extract unique categories from news items
                    const uniqueCategories = [...new Set(newsItems.map(item => item.source.name))];
                    setCategories(uniqueCategories);
                    
                    // Initial display with all news
                    setDisplayedNews(newsItems.slice(0, 3)); 
                    setHasMore(newsItems.length > 3);
                } else {
                    console.error("No news items could be processed from the API response");
                }
            } catch (error) {
                console.error("Error fetching news:", error);
                // Handle error state
                setFeaturedNews([]);
                setTrendingNews([]);
                setAllNews([]);
                setDisplayedNews([]);
                setHasMore(false);
                alert("Failed to fetch news. Please try again later.");
                
            }
        };

        fetchNews();
    }, []);

    // Format a news item from the API to match the structure expected by the components
    const formatNewsItem = (item) => {
        console.log("Formatting item:", item);
        
        // Handle different possible property names
        const title = item.judul || item.title || "";
        const description = item.deskripsi ? getDescriptionFromHtml(item.deskripsi) : 
                        (item.description || "");
        const slug = item.slug || "";
        const url = slug ? `/news/${slug}` : (item.url || "#");
        
        // Handle image URL - improved Google Drive handling
        let imageUrl = "/api/placeholder/800/500"; // Default placeholder
        
        if (item.gambar) {
            // Check if it's a Google Drive ID (not a full URL)
            if (!item.gambar.startsWith('http')) {
                // Use the direct thumbnail URL format for Google Drive images
                // This format works better for embedding and avoids CORS issues
                imageUrl = `https://drive.google.com/thumbnail?id=${item.gambar}&sz=w1000`;
                
            } else {
                imageUrl = item.gambar;
            }
        } else if (item.urlToImage) {
            imageUrl = item.urlToImage;
        } else if (item.image) {
            imageUrl = item.image;
        }
        
        // Add logging to track image URL generation
        console.log("Generated image URL:", imageUrl, "from original:", item.gambar);
        
        // Handle source/category
        const sourceName = item.kategori || 
                        (item.source ? (typeof item.source === 'string' ? item.source : item.source.name) : "News");
        
        // Create and return the formatted item
        return {
            title: title,
            description: description,
            url: url,
            urlToImage: imageUrl,
            publishedAt: item.created_at || item.publishedAt || item.date || "",
            source: {
                name: sourceName
            },
            author: item.penulis || item.author || "",
            content: item.deskripsi || item.content || ""
        };
    };

    // Extract plain text description from HTML content
    const getDescriptionFromHtml = (html) => {
        if (!html) return "";
        
        try {
            // For browser environment
            if (typeof document !== 'undefined') {
                // Create a temporary div to parse HTML
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = html;
                // Get the first paragraph or the first 150 characters
                const firstParagraph = tempDiv.querySelector("p");
                return firstParagraph ? 
                    firstParagraph.textContent.substring(0, 150) + "..." : 
                    tempDiv.textContent.substring(0, 150) + "...";
            } else {
                // Simple fallback for non-browser environments
                // Remove HTML tags with regex (not perfect but works for simple cases)
                const textContent = html.replace(/<[^>]*>/g, ' ');
                return textContent.substring(0, 150) + "...";
            }
        } catch (error) {
            console.error("Error parsing HTML:", error);
            // Strip all HTML tags as fallback
            return html.replace(/<[^>]*>/g, ' ').substring(0, 150) + "...";
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        const startIndex = 3 + (nextPage - 1) * newsPerPage;
        const endIndex = startIndex + newsPerPage;

        // Filter news by category if needed
        const filteredNews = activeCategory === "all" 
            ? allNews 
            : allNews.filter(news => news.source.name === activeCategory);

        if (startIndex < filteredNews.length) {
            const newItems = filteredNews.slice(startIndex, endIndex);
            setDisplayedNews((prev) => [...prev, ...newItems]);
            setPage(nextPage);

            // Check if we have more news to load
            setHasMore(endIndex < filteredNews.length);
        } else {
            setHasMore(false);
        }
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setPage(1);
        
        // Filter news by selected category
        const filteredNews = category === "all" 
            ? allNews 
            : allNews.filter(news => news.source.name === category);
        
        // Reset displayed news with the first page of filtered results
        setDisplayedNews(filteredNews.slice(0, newsPerPage));
        setHasMore(filteredNews.length > newsPerPage);
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert(`Thank you for subscribing with ${email}!`);
        setEmail("");
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                        {/* Main Featured Article */}
                        <div className="lg:col-span-2 flex flex-col">
                            {featuredNews[0] && (
                                <div className="relative flex-1">
                                    <img
                                        src={featuredNews[0].urlToImage || "/api/placeholder/800/500"}
                                        alt="Featured news"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg">
                                        <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded">
                                            {featuredNews[0].source.name}
                                        </span>
                                        <h2 className="text-3xl font-bold text-white mt-2">
                                            {featuredNews[0].title}
                                        </h2>
                                        <p className="text-gray-200 mt-2">
                                            {featuredNews[0].description}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Trending News */}
                        <div className="bg-gray-50 p-6 rounded-lg flex flex-col">
                            <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">
                                Trending Now
                            </h3>
                            <ul className="space-y-4 flex-1">
                                {trendingNews.map((item, index) => (
                                    <li
                                        key={index}
                                        className="border-b border-gray-100 pb-3"
                                    >
                                        <a
                                            href={item.url}
                                            className="hover:text-blue-600"
                                        >
                                            <span className="text-sm font-semibold text-blue-600">
                                                {item.source.name}
                                            </span>
                                            <h4 className="font-medium">
                                                {item.title}
                                            </h4>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            {trendingNews.length > 0 && (
                                <a
                                    href="/trending"
                                    className="text-blue-600 hover:underline text-sm font-medium mt-4"
                                >
                                    View all trending news →
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6">Latest News</h2>
                    
                    {/* Categories Component */}
                    <Filters
                        categories={categories} 
                        activeCategory={activeCategory} 
                        onCategoryChange={handleCategoryChange} 
                    />
                    
                    {displayedNews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedNews.map((news, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg overflow-hidden shadow-md"
                                >
                                    <img
                                        src={news.urlToImage || "/api/placeholder/800/500"}
                                        alt={news.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <span className="text-xs font-semibold text-blue-600">
                                            {news.source.name}
                                        </span>
                                        <h3 className="text-xl font-bold mt-1">
                                            <Link
                                                to={news.url}
                                                className="hover:text-blue-600"
                                            >
                                                {news.title}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            {news.description}
                                        </p>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-sm text-gray-500">
                                                {formatDate(news.publishedAt)}
                                            </span>
                                            <Link
                                                to={news.url}
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
                            </p>
                        </div>
                    )}
                    <div className="mt-6 text-center">
                        {hasMore ? (
                            <button
                                onClick={handleLoadMore}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                            >
                                Load More News
                            </button>
                        ) : (
                            <p className="text-gray-500">No more news to load</p>
                        )}
                    </div>
                </div>
            </section>

            {/* <section className="py-6 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
                    <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                        Subscribe to our newsletter to receive the latest news directly in your inbox.
                    </p>
                    <form
                        onSubmit={handleSubscribe}
                        className="flex max-w-md mx-auto gap-x-2"
                    >
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full pl-2 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section> */}

            <Footer />
        </div>
    );
}

export default Landing;