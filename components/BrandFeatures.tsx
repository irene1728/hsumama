export default function BrandFeatures() {
  const features = [
    {
      title:"獨家祕方",
      desc: "傳承三代的獨門滷製，慢火細滷，香氣濃郁。",
      icon: "🥣",
    },
    {
      title:"多樣選擇",
      desc: "牛肉、豬肉、羊肉、雞肉，多種美味任你挑。",
      icon: "🍖",
    },
    {
      title:"輕鬆上桌",
      desc: "真空包裝保存，簡單加熱，美味立即享用。",
      icon: "❤️",
    },
  ];

  return (
    <section className="bg-white py-10">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-stone-800">
          品牌特色
        </h2>

        <p className="text-center text-gray-500 mt-4">
          傳承的不只是味道，更是一份對家人的用心。
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-10">

          {features.map((item) => (

            <div
              key={item.title}
              className="rounded-3xl border border-orange-100 p-10 text-center shadow-sm hover:shadow-lg transition"
            >

              <div className="text-5xl mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-stone-800">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-8 mt-4">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}