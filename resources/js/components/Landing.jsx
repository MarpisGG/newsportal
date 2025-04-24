import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import logo from "../../assets/img/winniLogo.png";
import Footer from "../components/Footer";

function Landing() {
    const [email, setEmail] = useState("");
    const [featuredNews, setFeaturedNews] = useState([]);
    const [trendingNews, setTrendingNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&pageSize=8&apiKey=190880734ea849a1831253b2a7474f85`
                );
                const data = await response.json();
                if (data.articles) {
                    setFeaturedNews(data.articles.slice(0, 3));
                    setTrendingNews(data.articles.slice(3, 8));
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert(`Thank you for subscribing with ${email}!`);
        setEmail("");
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            {/* <div className="bg-red-600 text-white py-2">
                <div className="container mx-auto px-4 flex items-center">
                    <span className="font-bold mr-2">BREAKING:</span>
                    <marquee className="text-sm">
                        Major breakthrough in peace talks • Central bank announces new interest rates • Severe weather alert issued for coastal regions
                    </marquee>
                </div>
            </div> */}

            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Featured Article */}
                        <div className="lg:col-span-2">
                            {featuredNews[0] && (
                                <div className="relative h-full">
                                    <img
                                        src={featuredNews[0].urlToImage || "/api/placeholder/800/500"}
                                        alt="Featured news"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                                        <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded">
                                            FEATURED
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
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">
                                Trending Now
                            </h3>
                            <ul className="space-y-4">
                                {trendingNews.map((item, index) => (
                                    <li key={index} className="border-b border-gray-100 pb-3">
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-600"
                                        >
                                            <span className="text-sm font-semibold text-blue-600">
                                                {item.source.name}
                                            </span>
                                            <h4 className="font-medium">{item.title}</h4>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="/trending"
                                className="text-blue-600 hover:underline text-sm font-medium mt-4 block"
                            >
                                View all trending news →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6">Latest News</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredNews.map((news, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
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
                                        <a
                                            href={news.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-600"
                                        >
                                            {news.title}
                                        </a>
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        {news.description}
                                    </p>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-sm text-gray-500">
                                            {new Date(news.publishedAt).toLocaleDateString()}
                                        </span>
                                        <a
                                            href={news.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            Read more →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                            Load More News
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-6 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
                    <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                        Subscribe to our newsletter to receive the latest news directly in your inbox.
                    </p>
                    <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto gap-x-2">
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
            </section>

            <Footer />
        </div>
    );
}

export default Landing;
