export default function Story() {
  return (
    <section className="bg-white py-12">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-2 gap-16 items-center">

                 {/* 左邊品牌故事影片 */}
<div>
  <div className="rounded-3xl overflow-hidden h-[400px] md:h-[600px] bg-orange-100">
   
<video
  src="/images/mv/hsumama.mp4"
  controls
  loop
  playsInline
  className="w-full h-full object-cover"
/>
  </div>
</div>

          {/* 右邊文字 */}

          <div>

            <p className="text-orange-600 font-semibold tracking-widest mb-2">
              ABOUT US
            </p>

            <h2 className="text-5xl font-bold text-stone-800 mb-8">
              我們的故事
            </h2>

            <h3 className="text-2xl font-semibold text-orange-600 mb-8">
  一鍋滷香，
  <br />
  傳承三代的溫暖。
</h3>

            <div className="space-y-6 text-gray-600 leading-9">

              <p>
                徐媽媽冰鑽滷味的故事，
                始於外婆的古早味滷製手藝。
                多年來，那份用心烹調、真材實料的堅持，
                成為一家人共同珍藏的味道。
              </p>

              <p>
                後來，舅舅承接這份手藝，
                投入多年心力反覆研發與改良，
                調整滷汁比例、精選食材、
                優化滷製工法，
                在保留傳統風味的同時，
                也讓滷味更加香醇入味，
                成就今天的冰鑽滷味。
              </p>

              <p>
                我們始終相信，
                傳承的不只是味道，
                更是一份對家人的愛。
                每一天堅持新鮮現滷，
                以時間與耐心慢火細滷，
                希望每一口滷香，
                都能陪伴每一個家庭共享幸福餐桌。
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}