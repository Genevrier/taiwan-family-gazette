'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import UploadZone from '@/components/UploadZone';
import { useState } from 'react';

interface Photo {
  file: File;
  preview: string;
  description: string;
}

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGeneratePDF = async () => {
    if (photos.length === 0) return;
    
    setLoading(true);
    const formData = new FormData();
    
    photos.forEach((photo: Photo) => {
      formData.append('photos', photo.file);
      formData.append('descriptions', photo.description || '');
    });

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        
        {/* Upload Section */}
        <section className="section bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">試用功能</h2>
                <p className="text-xl text-gray-600">立即上傳照片，體驗家庭月報製作</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold mb-4">上傳照片</h3>
                <UploadZone onUpload={setPhotos} />

                {photos.length > 0 && (
                  <button
                    onClick={handleGeneratePDF}
                    disabled={loading}
                    className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? '生成中...' : `生成家庭月報 PDF (${photos.length} 張照片)`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              準備好開始了嗎？
            </h2>
            <p className="text-xl mb-8">
              第一個月免費試用，無需信用卡
            </p>
            <a href="/register" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition">
              立即開始製作月報
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
