import Image from "next/image";

export default function Hero() {
  return (
   <section className="bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto">

        <Image
          src="/images/hero/hero-banner.jpg"
          alt="徐媽媽冰鑽滷味"
          width={1920}
          height={1080}
          priority
          className="w-full h-auto shadow-lg"
        />

      </div>
    </section>
  );
}