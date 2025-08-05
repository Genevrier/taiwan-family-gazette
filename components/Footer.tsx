import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">台灣家庭月報</h3>
            <p className="text-gray-400">
              連結三代情感，讓愛跨越距離
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">產品</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-gray-400 hover:text-white">功能介紹</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-white">方案價格</Link></li>
              <li><Link href="/demo" className="text-gray-400 hover:text-white">範例月報</Link></li>
              <li><Link href="/gift" className="text-gray-400 hover:text-white">禮物訂閱</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">支援</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white">使用教學</Link></li>
              <li><Link href="#faq" className="text-gray-400 hover:text-white">常見問題</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">聯絡我們</Link></li>
              <li><Link href="/business" className="text-gray-400 hover:text-white">企業方案</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">聯絡資訊</h4>
            <ul className="space-y-2 text-gray-400">
              <li>客服信箱：support@familytw.com</li>
              <li>客服電話：0800-123-456</li>
              <li>服務時間：週一至週五 9:00-18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 台灣家庭月報. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-white">隱私權政策</Link>
            <Link href="/terms" className="hover:text-white">服務條款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 