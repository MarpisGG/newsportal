import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NewsDetail() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    const apiKey = "a42278524bee772194f2ad0e9ac88a5893aa733db4d1c684d89c2dc08b7f718a";

    useEffect(() => {
        const fetchArticleDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://winnicode.com/api/publikasi-berita/${slug}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setArticle(data);
                fetchRelatedArticles(data.kategori);

            } catch (err) {
                console.error("Error fetching article details:", err);
                setError("Failed to load article. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
      


        const fetchRelatedArticles = async (category) => {
            try {
                const response = await fetch(`https://winnicode.com/api/publikasi-berita?kategori=${category}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                let articles = [];

                if (Array.isArray(data)) {
                    articles = data;
                } else if (data && data.data && Array.isArray(data.data)) {
                    articles = data.data;
                } else if (data && typeof data === 'object') {
                    articles = [data];
                }

                const filtered = articles.filter(item => item.slug !== slug).slice(0, 3);
                setRelatedArticles(filtered);

            } catch (err) {
                console.error("Error fetching related articles:", err);
            }
        };

        if (slug) {
            fetchArticleDetails();
        }
    }, [slug]);

    useEffect(() => {
    const fetchComments = async () => {
        const res = await fetch(`http://localhost:8000/api/comments/${slug}`);
        const data = await res.json();
        setComments(data);
    };
    fetchComments();
    }, [slug]);

    const submitComment = async (e) => {
    e.preventDefault(); 
    const token = localStorage.getItem("token"); // pastikan token tersimpan setelah login

    const res = await fetch("http://localhost:8000/api/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            slug,
            content: commentText,
        }),
    });

    if (res.ok) {
        const newComment = await res.json();
        setComments([newComment, ...comments]);
        setCommentText("");
    }
    };

    

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const getImageUrl = (gambarId) => {
        return gambarId
        ? `https://drive.google.com/thumbnail?id=${gambarId}&sz=w1000`
        : "https://via.placeholder.com/150"; // Placeholder image
    };

    if (loading) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading article...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="bg-red-100 p-4 rounded-lg">
                        <p className="text-red-700">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold">Article Not Found</h1>
                    <p className="mt-4 text-gray-600">The article you're looking for doesn't exist or has been removed.</p>
                    <a 
                        href="/"
                        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Back to Home
                    </a>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="relative">
                        <img 
                            src={getImageUrl(article.gambar)}
                            alt={article.judul} 
                            className="w-full h-64 md:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    </div>
                    <div className="p-6 md:p-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                {article.kategori}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                                {formatDate(article.created_at)}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.judul}</h1>
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-600 font-bold">
                                    {article.penulis ? article.penulis.charAt(0) : "A"}
                                </span>
                            </div>
                            <div className="ml-3">
                                <p className="font-medium">{article.penulis}</p>
                                <p className="text-sm text-gray-500">Penulis</p>
                            </div>
                        </div>
                        <div 
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.deskripsi }}
                        />
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Comments</h2>
                    <form onSubmit={submitComment} className="mb-4">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full h-24 p-2 border border-gray-300 rounded-lg mb-4"
                            placeholder="Write a comment..."
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Submit Comment
                        </button>
                    </form>
                    <div className="max-h-60 overflow-y-auto">
                        {comments.map((comment, index) => (
                            <div key={index} className="border-b border-gray-200 py-4">
                                <div className="flex items-center mb-2">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-gray-600 font-bold">
                                            {comment.user ? comment.user.charAt(0) : "A"}
                                        </span>
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-medium">{comment.user}</p>
                                        <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {relatedArticles.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedArticles.map((item, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img 
                                        src={getImageUrl(item.gambar)}
                                        alt={item.judul}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{item.judul}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{formatDate(item.created_at)}</p>
                                        <a 
                                            href={`/berita/${item.slug}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* Back button */}
                <div className="text-center">
                    <a
                        href="/"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Back to News
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NewsDetail;