import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Landing() {
    const [email, setEmail] = useState("");

    // Sample news data
    const featuredNews = [
        {
            id: 1,
            title: "Global Summit Addresses Climate Change Solutions",
            category: "World",
            image: "/api/placeholder/800/500",
            summary:
                "World leaders converge to discuss implementation of new climate policies.",
            date: "March 14, 2025",
        },
        {
            id: 2,
            title: "Tech Giant Unveils Revolutionary AI Platform",
            category: "Technology",
            image: "/api/placeholder/800/500",
            summary:
                "The new system promises to transform how businesses operate globally.",
            date: "March 13, 2025",
        },
        {
            id: 3,
            title: "Market Analysts Predict Economic Growth in Q2",
            category: "Business",
            image: "/api/placeholder/800/500",
            summary:
                "Experts anticipate steady recovery despite ongoing global challenges.",
            date: "March 12, 2025",
        },
    ];

    const trendingNews = [
        {
            id: 1,
            title: "Historic Space Mission Launches Successfully",
            category: "Science",
        },
        {
            id: 2,
            title: "National Healthcare Reform Bill Passes",
            category: "Politics",
        },
        {
            id: 3,
            title: "Major Sports League Announces Expansion Teams",
            category: "Sports",
        },
        {
            id: 4,
            title: "Award-Winning Film Director Announces New Project",
            category: "Entertainment",
        },
        {
            id: 5,
            title: "Breakthrough in Renewable Energy Storage",
            category: "Technology",
        },
    ];

    const categories = [
        "World",
        "Politics",
        "Business",
        "Technology",
        "Science",
        "Health",
        "Sports",
        "Entertainment",
    ];

    
    const handleSubscribe = (e) => {
        e.preventDefault();
        // Subscription logic would go here
        alert(`Thank you for subscribing with ${email}!`);
        setEmail("");
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <Navbar />
            {/* Breaking News Banner */}
            <div className="bg-red-600 text-white py-2">
                <div className="container mx-auto px-4 flex items-center">
                    <span className="font-bold mr-2">BREAKING:</span>
                    <marquee className="text-sm">
                        Major breakthrough in peace talks • Central bank
                        announces new interest rates • Severe weather alert
                        issued for coastal regions
                    </marquee>
                </div>
            </div>

            {/* Hero Section */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Featured Article */}
                        <div className="lg:col-span-2">
                            <div className="relative">
                                <img
                                    src="/api/placeholder/800/500"
                                    alt="Featured news"
                                    className="w-full h-96 object-cover rounded-lg"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                                    <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded">
                                        FEATURED
                                    </span>
                                    <h2 className="text-3xl font-bold text-white mt-2">
                                        Landmark International Agreement Reached
                                        on Digital Regulation
                                    </h2>
                                    <p className="text-gray-200 mt-2">
                                        Over 150 countries have signed the first
                                        global treaty on AI and digital rights.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trending News */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">
                                Trending Now
                            </h3>
                            <ul className="space-y-4">
                                {trendingNews.map((item) => (
                                    <li
                                        key={item.id}
                                        className="border-b border-gray-100 pb-3"
                                    >
                                        <a
                                            href={`/news/${item.id}`}
                                            className="hover:text-blue-600"
                                        >
                                            <span className="text-sm font-semibold text-blue-600">
                                                {item.category}
                                            </span>
                                            <h4 className="font-medium">
                                                {item.title}
                                            </h4>
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

            {/* Latest News */}
            <section className="py-8 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6">Latest News</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredNews.map((news) => (
                            <div
                                key={news.id}
                                className="bg-white rounded-lg overflow-hidden shadow-md"
                            >
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <span className="text-xs font-semibold text-blue-600">
                                        {news.category}
                                    </span>
                                    <h3 className="text-xl font-bold mt-1">
                                        <a
                                            href={`/news/${news.id}`}
                                            className="hover:text-blue-600"
                                        >
                                            {news.title}
                                        </a>
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        {news.summary}
                                    </p>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-sm text-gray-500">
                                            {news.date}
                                        </span>
                                        <a
                                            href={`/news/${news.id}`}
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
                        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Load More News
                        </button>
                    </div>
                </div>
            </section>

            {/* Category Sections */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* World News */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">
                                    World News
                                </h2>
                                <a
                                    href="/category/world"
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    View all →
                                </a>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <img
                                        src="/api/placeholder/200/150"
                                        alt="World news"
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                            <a
                                                href="/news/4"
                                                className="hover:text-blue-600"
                                            >
                                                Diplomatic Relations Restored
                                                Between Rival Nations
                                            </a>
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            After decades of tension, the two
                                            countries have agreed to normalize
                                            relations.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <img
                                        src="/api/placeholder/200/150"
                                        alt="World news"
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                            <a
                                                href="/news/5"
                                                className="hover:text-blue-600"
                                            >
                                                Global Health Initiative
                                                Launched to Combat Emerging
                                                Diseases
                                            </a>
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            The multi-billion dollar program
                                            aims to prevent future pandemics.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Technology News */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">
                                    Technology
                                </h2>
                                <a
                                    href="/category/technology"
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    View all →
                                </a>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <img
                                        src="/api/placeholder/200/150"
                                        alt="Tech news"
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                            <a
                                                href="/news/6"
                                                className="hover:text-blue-600"
                                            >
                                                Next-Generation Quantum
                                                Computing Breakthrough Announced
                                            </a>
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Scientists have achieved a new
                                            milestone in quantum stability.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <img
                                        src="/api/placeholder/200/150"
                                        alt="Tech news"
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                            <a
                                                href="/news/7"
                                                className="hover:text-blue-600"
                                            >
                                                Electric Vehicle Market Sees
                                                Unprecedented Growth
                                            </a>
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Sales have doubled in the past year
                                            as infrastructure expands.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-12 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Stay Updated
                    </h2>
                    <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                        Subscribe to our newsletter to receive the latest news
                        directly in your inbox.
                    </p>
                    <form
                        onSubmit={handleSubscribe}
                        className="flex max-w-md mx-auto"
                    >
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-grow px-4 py-2 rounded-l focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-gray-900 text-white px-6 py-2 rounded-r hover:bg-gray-800"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">
                                NewsPortal
                            </h3>
                            <p className="text-sm">
                                Your trusted source for the latest news and
                                in-depth analysis from around the world.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">
                                Categories
                            </h4>
                            <ul className="space-y-2">
                                {categories
                                    .slice(0, 4)
                                    .map((category, index) => (
                                        <li key={index}>
                                            <a
                                                href={`/category/${category.toLowerCase()}`}
                                                className="hover:text-white"
                                            >
                                                {category}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">
                                More Categories
                            </h4>
                            <ul className="space-y-2">
                                {categories.slice(4).map((category, index) => (
                                    <li key={index}>
                                        <a
                                            href={`/category/${category.toLowerCase()}`}
                                            className="hover:text-white"
                                        >
                                            {category}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">
                                Follow Us
                            </h4>
                            <div className="flex space-x-4">
                                <a href="#" className="hover:text-white">
                                    Twitter
                                </a>
                                <a href="#" className="hover:text-white">
                                    Facebook
                                </a>
                                <a href="#" className="hover:text-white">
                                    Instagram
                                </a>
                                <a href="#" className="hover:text-white">
                                    LinkedIn
                                </a>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold text-white mb-2">
                                    Contact
                                </h4>
                                <p className="text-sm">
                                    contact@newsportal.com
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center">
                        <p>
                            © {new Date().getFullYear()} NewsPortal. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Landing;
