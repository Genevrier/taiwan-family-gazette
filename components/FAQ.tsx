'use client';

import { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "月報多久會收到？",
      answer: "月報會在每月的第一週寄出，一般來說 3-5 個工作天內就會送達。我們使用掛號郵寄，確保安全送達。"
    },
    {
      question: "可以寄送到哪些地區？",
      answer: "目前我們提供全台灣本島及離島地區的寄送服務，運費已包含在訂閱費用中。"
    },
    {
      question: "如何邀請家人一起編輯？",
      answer: "訂閱後，您可以透過 Email 或 LINE 邀請家人加入。每個帳號最多可邀請 20 位家庭成員共同編輯。"
    },
    {
      question: "可以隨時取消訂閱嗎？",
      answer: "當然可以！我們不綁約，您可以隨時在帳號設定中取消訂閱，當期月報仍會正常寄出。"
    },
    {
      question: "照片的隱私安全嗎？",
      answer: "我們非常重視您的隱私。所有照片都經過加密儲存，只有您邀請的家人可以看到。我們絕不會將您的照片用於其他用途。"
    }
  ];

  return (
    <section id="faq" className="section">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">常見問題</h2>
          <p className="text-xl text-gray-600">有其他問題嗎？歡迎聯絡我們</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 