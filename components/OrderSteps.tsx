export default function OrderSteps() {
  const steps = [
    {
      icon: "🛒",
      title: "挑選商品",
      text: "挑選喜歡的滷味商品"
    },
    {
      icon: "🧺",
      title: "加入購物車",
      text: "確認商品與數量"
    },
    {
      icon: "💳",
      title: "完成付款",
      text: "安全快速完成付款"
    },
    {
      icon: "🚚",
      title: "冷凍宅配到府",
      text: "新鮮美味送到您家"
    }
  ];

  return (
    <section className="bg-[#FFF8F0] py-8">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-8">

          <p className="text-orange-600 font-semibold tracking-widest">
            ORDER PROCESS
          </p>

          <h2 className="text-5xl font-bold text-stone-800 mt-2">
            訂購流程
          </h2>

          <p className="text-gray-500 mt-5">
            四個步驟，輕鬆把美味帶回家
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {steps.map((step, index) => (

            <div
              key={index}
              className="relative bg-white rounded-3xl shadow-sm border border-orange-100 p-10 text-center hover:shadow-lg transition"
            >

              <div className="text-6xl mb-6">
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold text-stone-800 mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {step.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}