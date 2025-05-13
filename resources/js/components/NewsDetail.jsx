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

    // API Key yang didapat setelah login
    const apiKey = "a42278524bee772194f2ad0e9ac88a5893aa733db4d1c684d89c2dc08b7f718a";

    useEffect(() => {
        const fetchArticleDetails = async () => {
            setLoading(true);
            try {
                console.log(`Fetching article details for slug: ${slug}`);
                
                // Fetch the specific article by slug
                const response = await fetch(
                    `https://winnicode.com/api/publikasi-berita/${slug}`, {
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
                console.log("Article data:", data);
                
                // Set the article data
                setArticle(data);
                
                // Also fetch related articles (can be based on same category)
                fetchRelatedArticles(data.kategori);
                
            } catch (err) {
                console.error("Error fetching article details:", err);
                setError("Failed to load article. Please try again later.");
                
                // For demo/testing purposes, create mock data if fetch fails
                const mockArticle = {
                    judul: "Work-Life Balance: Kunci Produktivitas dan Kebahagiaan Jangka Panjang",
                    penulis: "Dhifa Siti Nurhalifah",
                    kategori: "Life Style",
                    deskripsi: `<p style="text-align: center;">(Sumber gambar: https://sl.bing.net/b08eQ1Pv7nM)</p>
                    <p style="text-align: justify;"><em>Work-life balance</em> terasa seperti mimpi yang sering kali sulit digapai di tengah hiruk pikuk dunia modern yang serba cepat. Beban kerja yang tidak ada habisnya dan godaan untuk terus terhubung secara digital dengan mudah mengaburkan batasan antara dunia kerja dan kehidupan pribadi. Akan tetapi, jika mengabaikan keseimbangan ini tidak hanya akan berdampak pada kebahagiaan individu, tetapi juga dapat berdampak pada produktivitas jangka panjang dan kondisi kesehatan secara menyeluruh.</p>
                    <p style="text-align: justify;">Terdapat beberapa alasan mengapa keseimbangan pekerjaan dan kehidupan pribadi harus seimbang. Pertama, kesehatan fisik dan mental adalah pondasinya. Tekanan pekerjaan terus menerus tanpa adanya jeda untuk istirahat dan pemulihan dapat menimbulkan stres kronis, kecemasan, depresi, dan berbagai masalah kesehatan fisik, seperti sulit tidur hingga penyakit kardiovaskular. Berdasarkan riset studi yang dilakukan <em>World Health Organization</em> (WHO) menunjukkan bahwa stres akibat beban kerja merupakan salah satu faktor penting dalam tingginya angka penyakit di seluruh dunia. Bahkan, kerugian akibat stres dan masalah kesehatan mental terkait pekerjaan diperkirakan mencapai triliunan dolar setiap tahun.</p>`,
                    gambar: "1j8mOxqj282W1oklg8EV-t4j9FeDW5otw",
                    slug: "work-life-balance-kunci-produktivitas-dan-kebahagiaan-jangka-panjang",
                    created_at: "2025-05-08T14:38:49.000000Z",
                    updated_at: "2025-05-13T03:20:31.000000Z"
                };
                setArticle(mockArticle);
                
                // Mock related articles
                setRelatedArticles([
                    {
                        judul: "Tips Manajemen Waktu untuk Profesional",
                        slug: "tips-manajemen-waktu",
                        gambar: null,
                        kategori: "Life Style"
                    },
                    {
                        judul: "Mengelola Stres di Tempat Kerja",
                        slug: "mengelola-stres-kerja",
                        gambar: null,
                        kategori: "Life Style"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        const fetchRelatedArticles = async (category) => {
            try {
                // Fetch articles with the same category
                const response = await fetch(
                    `https://winnicode.com/api/publikasi-berita?kategori=${category}`, {
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
                console.log("Related articles data:", data);
                
                // Process response based on its structure
                let articles = [];
                if (Array.isArray(data)) {
                    articles = data;
                } else if (data && data.data && Array.isArray(data.data)) {
                    articles = data.data;
                } else if (data && typeof data === 'object') {
                    articles = [data]; // Single item
                }
                
                // Filter out the current article and take up to 3 related articles
                const filtered = articles
                    .filter(item => item.slug !== slug)
                    .slice(0, 3);
                
                setRelatedArticles(filtered);
                
            } catch (err) {
                console.error("Error fetching related articles:", err);
                // No need to set error state here as this is secondary content
            }
        };

        if (slug) {
            fetchArticleDetails();
        }
    }, [slug, apiKey]);

    // Format the date for display
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };


    // Get image URL with improved Google Drive handling
    const getImageUrl = (imageId) => {
        // Default placeholder if no image ID is provided
        if (!imageId) return "/api/placeholder/800/500";
        
        // If it's already a complete URL, use it as is
        if (imageId.startsWith('http')) return imageId;
        
        // For Google Drive IDs, use the thumbnail API for better compatibility
       return `https://drive.google.com/uc?export=download&id=${imageId}`;
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
                {/* Hero Section */}
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
                        
                        {/* Article Content */}
                        <div 
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.deskripsi }}
                        />
                    </div>
                </div>
                
                {/* Related Articles Section */}
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
                                        <span className="text-xs font-semibold text-blue-600">
                                            {item.kategori}
                                        </span>
                                        <h3 className="text-xl font-bold mt-1">
                                            <a
                                                href={`/news/${item.slug}`}
                                                className="hover:text-blue-600"
                                            >
                                                {item.judul}
                                            </a>
                                        </h3>
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
                        className="inline-block bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
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