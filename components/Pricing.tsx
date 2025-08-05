export default function Pricing() {
  const plans = [
    {
      name: "月刊方案",
      price: "NT$ 199",
      period: "每月",
      features: [
        "每月一期月報",
        "最多 30 張照片",
        "自動排版設計",
        "全台免運費"
      ],
      popular: false
    },
    {
      name: "雙週刊方案",
      price: "NT$ 349",
      period: "每月",
      features: [
        "每兩週一期月報",
        "每期最多 20 張照片",
        "優先客服支援",
        "全台免運費",
        "贈送精美收藏盒"
      ],
      popular: true
    },
    {
      name: "週刊方案",
      price: "NT$ 599",
      period: "每月",
      features: [
        "每週一期月報",
        "每期最多 15 張照片",
        "VIP 客服支援",
        "全台免運費",
        "年度精裝合訂本"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">選擇您的方案</h2>
          <p className="text-xl text-gray-600">無需綁約，隨時可以更改或取消</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`price-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  最受歡迎
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                選擇此方案
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">需要大量訂購或企業方案？</p>
          <a href="/contact" className="text-primary font-semibold hover:underline">
            聯絡我們獲取客製化報價 →
          </a>
        </div>
      </div>
    </section>
  );
} 