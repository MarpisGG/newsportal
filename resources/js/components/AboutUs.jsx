import { useState, useEffect } from "react";
import winniLogo from "../../assets/img/WinniLogo.png";
export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Animation */}
      <div className={`container mx-auto py-16 px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="md:w-1/3 flex justify-center">
            <div className="bg-white p-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="w-48 h-48 flex items-center justify-center">
                {/* Replace with actual logo path */}
                <img 
                  src={winniLogo}
                  alt="PT. Winnicode Garuda Teknologi Logo" 
                  className="max-w-full" 
                />
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="text-5xl font-bold text-blue-800 mb-4">About Us</h1>
            <h2 className="text-3xl font-semibold text-gray-700 mb-3">PT. Winnicode Garuda Teknologi</h2>
            <p className="text-xl text-gray-600 italic">Media Publikasi dan Layanan Digital</p>
          </div>
        </div>
        
        {/* Company Description Cards */}
        <div className="mb-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 hover:shadow-xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/4 bg-blue-700 p-6 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Siapa Kami</h3>
              </div>
              <div className="p-8 md:w-3/4">
                <p className="text-gray-600 leading-relaxed">
                  PT. Winnicode Garuda Teknologi adalah perusahaan yang bergerak di bidang Media Publikasi dan Layanan Digital, 
                  didirikan pada tahun 2020 di Bandung. Kami hadir untuk menyediakan solusi publikasi dan digital yang inovatif bagi
                  berbagai sektor industri. Fokus utama kami adalah pada publikasi berita, artikel, dan jurnalistik, serta menyediakan 
                  layanan digital yang mendukung transformasi dan pertumbuhan bisnis di era modern.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/4 bg-blue-600 p-6 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Bidang Keahlian</h3>
              </div>
              <div className="p-8 md:w-3/4">
                <p className="text-gray-600 leading-relaxed">
                  Dalam bidang Media Publikasi, PT. Winnicode Garuda Teknologi mengkhususkan diri dalam pembuatan dan distribusi 
                  konten-konten berkualitas seperti berita terkini, artikel mendalam, dan tulisan jurnalistik yang dirancang untuk 
                  memberikan informasi yang akurat, terpercaya, dan relevan kepada masyarakat. Kami berkomitmen untuk menyajikan 
                  konten yang tidak hanya informatif, tetapi juga berperan dalam membentuk opini publik dan mendukung perkembangan 
                  pengetahuan.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-800 relative after:content-[''] after:absolute after:w-24 after:h-1 after:bg-blue-500 after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:mt-2 pb-3">Layanan Kami</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-500 h-2"></div>
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Media Publikasi</h4>
                <p className="text-gray-600">Berita terkini, artikel mendalam, dan konten jurnalistik berkualitas</p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-600 h-2"></div>
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Layanan Digital</h4>
                <p className="text-gray-600">Solusi digital inovatif untuk mendukung transformasi bisnis</p>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-700 h-2"></div>
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Kemitraan</h4>
                <p className="text-gray-600">Kolaborasi dengan berbagai sektor industri untuk pertumbuhan bersama</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-8 text-center text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Mari Bekerja Sama</h3>
          <p className="mb-6 max-w-2xl mx-auto">Tertarik untuk berkolaborasi dengan PT. Winnicode Garuda Teknologi? Hubungi kami untuk mendiskusikan peluang kerjasama.</p>
          <button className="bg-white text-blue-700 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors duration-300">
            Hubungi Kami
          </button>
        </div>
      </div>
    </div>
  );
};
