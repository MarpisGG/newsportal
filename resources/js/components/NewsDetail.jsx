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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [commentLoading, setCommentLoading] = useState(false);
    const [commentError, setCommentError] = useState("");

    const apiKey = "a42278524bee772194f2ad0e9ac88a5893aa733db4d1c684d89c2dc08b7f718a";

    // Check authentication status
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            console.log("Token from localStorage:", token); // Debug log
            
            if (token) {
                try {
                    // Try multiple endpoints to verify token
                    let response;
                    let userData;
                    
                    // First try /api/user
                    try {
                        response = await fetch("http://localhost:8000/api/user", {
                            headers: {
                                "Authorization": `Bearer ${token}`,
                                "Accept": "application/json",
                            }
                        });
                        console.log("Auth response status:", response.status); // Debug log
                        
                        if (response.ok) {
                            userData = await response.json();
                            console.log("User data:", userData); // Debug log
                        }
                    } catch (error) {
                        console.log("First auth check failed, trying alternative...");
                    }
                    
                    // If first attempt failed, try alternative endpoint or method
                    if (!response || !response.ok) {
                        try {
                            response = await fetch("http://localhost:8000/api/profile", {
                                headers: {
                                    "Authorization": `Bearer ${token}`,
                                    "Accept": "application/json",
                                }
                            });
                            
                            if (response.ok) {
                                userData = await response.json();
                                console.log("User data from profile:", userData); // Debug log
                            }
                        } catch (error) {
                            console.log("Profile endpoint also failed");
                        }
                    }
                    
                    if (userData) {
                        setIsLoggedIn(true);
                        setUser(userData);
                        console.log("User is logged in:", userData); // Debug log
                    } else {
                        console.log("No user data received, user not authenticated");
                        setIsLoggedIn(false);
                        setUser(null);
                        // Don't remove token immediately, user might still be able to comment
                    }
                } catch (error) {
                    console.error("Auth check failed:", error);
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } else {
                console.log("No token found in localStorage");
                setIsLoggedIn(false);
                setUser(null);
            }
        };
        
        checkAuth();
    }, []);

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
                setLoading(true);
                const response = await fetch("http://localhost:8000/api/news");

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
            try {
                const res = await fetch(`http://localhost:8000/api/comments/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        
        if (slug) {
            fetchComments();
        }
    }, [slug]);

    const submitComment = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("token");
        console.log("Submitting comment, token:", token); // Debug log
        
        if (!token) {
            setCommentError("Please login to comment.");
            return;
        }

        if (!commentText.trim()) {
            setCommentError("Comment cannot be empty.");
            return;
        }

        setCommentLoading(true);
        setCommentError("");

        try {
            console.log("Sending comment request..."); // Debug log
            const res = await fetch("http://localhost:8000/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    slug,
                    content: commentText.trim(),
                })
            });

            console.log("Comment response status:", res.status); // Debug log
            
            if (res.ok) {
                const newComment = await res.json();
                console.log("New comment:", newComment); // Debug log
                
                // Add the new comment to the top of the list
                setComments([newComment, ...comments]);
                setCommentText("");
                setCommentError("");
                
                // If auth check failed but comment succeeded, update auth state
                if (!isLoggedIn) {
                    setIsLoggedIn(true);
                    // Try to get user data from the comment response
                    if (newComment.user) {
                        setUser(newComment.user);
                    }
                }
            } else {
                const errorData = await res.json();
                console.log("Comment error response:", errorData); // Debug log
                
                if (res.status === 401) {
                    setCommentError("Your session has expired. Please login again.");
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    setUser(null);
                } else {
                    setCommentError(errorData.message || "Failed to submit comment. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
            setCommentError("Network error. Please check your connection and try again.");
        } finally {
            setCommentLoading(false);
        }
    };

    const handleLogin = () => {
        // Redirect to login page or open login modal
        window.location.href = "/login";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const getImageUrl = (gambarId) => {
        return gambarId
        ? `https://drive.google.com/thumbnail?id=${gambarId}&sz=w1000`
        : "https://via.placeholder.com/150";
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
                <div className="relative h-96 md:h-[48rem] mb-8 rounded-lg overflow-hidden fill ">
                    <img 
                    src={getImageUrl(article.gambar)}
                    alt={article.judul} 
                    className="w-full h-full object-cover"
                    />
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                        <span className="pe-4 py-1  text-blue-800 text-sm font-bold rounded-full">
                            {article.kategori}
                        </span>
                        <span className="px-4 py-1  text-gray-800 text-sm font-bold rounded-full">
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
                    <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
                    
                    {/* Comment Form */}
                    {localStorage.getItem("token") ? (
                        <form onSubmit={submitComment} className="mb-6">
                            <div className="flex items-start space-x-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-white font-bold">
                                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm text-gray-700 mb-2">
                                        Commenting as {user?.name || "User"}
                                    </p>
                                    <textarea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Share your thoughts..."
                                        required
                                        disabled={commentLoading}
                                    ></textarea>
                                </div>
                            </div>
                            
                            {commentError && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                                    {commentError}
                                </div>
                            )}
                            
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={commentLoading || !commentText.trim()}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                                >
                                    {commentLoading && (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    )}
                                    {commentLoading ? "Posting..." : "Post Comment"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                            <p className="text-gray-600 mb-3">Please login to join the conversation</p>
                            <button
                                onClick={handleLogin}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Login to Comment
                            </button>
                        </div>
                    )}
                    
                    {/* Comments List */}
                    <div className="space-y-4">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                            <span className="text-gray-600 font-bold">
                                                {comment.user?.name ? comment.user.name.charAt(0).toUpperCase() : "A"}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-medium text-gray-900">
                                                    {comment.user?.name || "Anonymous"}
                                                </p>
                                                <span className="text-sm text-gray-500">
                                                    {formatDate(comment.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p>No comments yet. Be the first to share your thoughts!</p>
                            </div>
                        )}
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
                                            href={`/news/${item.slug}`}
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