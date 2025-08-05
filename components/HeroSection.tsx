import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-section pt-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              讓愛跨越距離<br />
              <span className="text-blue-600">連結三代情感的家庭月報</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              將您的照片和訊息轉換成精美的實體月報，每月寄送給長輩，讓他們感受家人的關愛
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="btn-primary text-center">
                立即開始 - 首月免費
              </Link>
              <Link href="#demo" className="btn-secondary text-center">
                查看範例月報
              </Link>
            </div>
            <div className="mt-8 flex items-center space-x-8">
              <div>
                <p className="text-3xl font-bold text-blue-600">50,000+</p>
                <p className="text-gray-600">台灣家庭信賴</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">4.9/5</p>
                <p className="text-gray-600">用戶滿意度</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/images/family-photo.jpg" 
              alt="開心閱讀月報的祖父母"
              className="rounded-lg shadow-2xl w-full h-64 object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-semibold">「每個月最期待的就是收到家庭月報！」</p>
              <p className="text-xs text-gray-600 mt-1">- 王奶奶，85歲</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 