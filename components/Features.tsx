export default function Features() {
  const features = [
    {
      icon: "📱",
      title: "簡單上傳",
      description: "透過手機或電腦，輕鬆上傳照片和文字訊息"
    },
    {
      icon: "🎨",
      title: "自動排版",
      description: "智能排版系統，自動生成精美的月報版面"
    },
    {
      icon: "📮",
      title: "定期寄送",
      description: "每月自動印刷並寄送到指定地址"
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "全家參與",
      description: "邀請家人共同編輯，分享生活點滴"
    }
  ];

  return (
    <section id="features" className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">如何運作</h2>
          <p className="text-xl text-gray-600">四個簡單步驟，開始您的家庭月報之旅</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">專為台灣長輩設計</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>大字體印刷，閱讀輕鬆無負擔</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>繁體中文內容，貼近在地文化</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>高品質紙張，可長期保存收藏</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>客製化封面，每期都是獨特回憶</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-gray-200 rounded-lg shadow-md h-48 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📰</div>
                  <p>月報預覽</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 