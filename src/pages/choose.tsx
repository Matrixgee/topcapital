import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import oneimg from "../assets/hdjdkdd 1.svg";
import twoimg from "../assets/pngwing.com (39) 1.svg";
import threimg from "../assets/—Pngtree—creative hand-painted network security logo_5008553 1.svg";

const Choose = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const features = [
    {
      id: 1,
      image: threimg,
      headline: "AI-Driven Insights",
      text: "Our advanced algorithms analyze real-time market data, historical trends, and global news to deliver actionable insights and price predictions tailored to your goals.",
      color: "from-purple-600 to-indigo-600",
    },
    {
      id: 2,
      image: twoimg,
      headline: "Automated Trading",
      text: "Let AI-powered bots execute trades for you, 24/7. Optimize profits and minimize losses with precision-timed algorithms and custom strategies.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: 3,
      image: oneimg,
      headline: "Unmatched Security",
      text: "Your data and assets are protected with military-grade encryption, multi-factor authentication, and offline cold wallet storage.",
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="w-full py-20 bg-gradient-to-b from-[#0A0A0A] to-[#1A0B2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Top Capital Mining
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Innovative solutions for modern investors
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-0.5 shadow-xl transition-all hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${feature.color}"></div>
              <div className="relative h-full bg-gray-900 rounded-lg p-6 flex flex-col items-center text-center">
                {/* Icon Container */}
                <div
                  className={`mb-6 p-4 rounded-full bg-gradient-to-r ${feature.color} shadow-lg`}
                >
                  <img
                    src={feature.image}
                    alt={feature.headline}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.headline}
                </h3>
                <p className="text-gray-400 mb-6">{feature.text}</p>

                {/* Glow Effect */}
                <div
                  className={`absolute -bottom-1 -right-1 w-32 h-32 rounded-full ${feature.color.replace(
                    "to",
                    "from"
                  )} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {[
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Support" },
            { value: "10M+", label: "Trades" },
            { value: "256-bit", label: "Encryption" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all"
            >
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choose;
