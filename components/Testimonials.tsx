export default function Testimonials() {
  const testimonials = [
    {
      name: "陳小姐",
      age: "35歲，台北",
      content: "自從訂閱家庭月報後，爸媽每個月都很期待收到。看到他們開心地翻閱，分享給鄰居看，我覺得這錢花得真值得！",
      avatar: "/images/testimonial-1.jpg"
    },
    {
      name: "林先生",
      age: "42歲，高雄",
      content: "在國外工作的我，透過月報讓父母能看到孫子的成長。每次視訊時，他們都會拿著月報跟我分享最喜歡哪張照片。",
      avatar: "/images/testimonial-2.jpg"
    },
    {
      name: "張奶奶",
      age: "78歲，台中",
      content: "不會用手機的我，現在也能看到孫子的照片了！字體很大很清楚，我都收藏起來，沒事就拿出來看看。",
      avatar: "/images/testimonial-3.jpg"
    }
  ];

  return (
    <section id="testimonials" className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">用戶真實分享</h2>
          <p className="text-xl text-gray-600">聽聽其他家庭的使用心得</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.age}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
              <div className="mt-4">
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 