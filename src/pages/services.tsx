import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const services = [
    {
      title: "AI Portfolio Management",
      description:
        "Our intelligent algorithms continuously optimize your investment portfolio based on market conditions and your risk profile.",
      icon: "🤖",
      color: "from-purple-600 to-indigo-600",
    },
    {
      title: "Automated Trading",
      description:
        "Set your parameters and let our bots execute trades 24/7, taking advantage of every market opportunity.",
      icon: "⚡",
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Risk Analysis",
      description:
        "Comprehensive risk assessment tools to help you make informed decisions and protect your assets.",
      icon: "🛡️",
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "Yield Optimization",
      description:
        "Maximize your returns with our advanced yield farming strategies across multiple DeFi protocols.",
      icon: "📈",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Security Vaults",
      description:
        "Enterprise-grade security solutions including multi-sig wallets and cold storage options.",
      icon: "🔒",
      color: "from-red-500 to-pink-600",
    },
    {
      title: "Tax Reporting",
      description:
        "Automated tax reporting tools that track your transactions and generate necessary documents.",
      icon: "🧾",
      color: "from-violet-500 to-fuchsia-600",
    },
  ];

  return (
    <div className="w-full py-20 bg-gradient-to-b from-[#0A0A0A] to-[#1A0B2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Premium
            </span>{" "}
            Services
          </motion.h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive solutions designed to maximize your crypto investment
            potential
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-0.5 shadow-xl hover:shadow-2xl transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${service.color}"></div>
              <div className="relative h-full bg-gray-900 rounded-lg p-8 flex flex-col">
                <div
                  className={`mb-6 w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl`}
                >
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 flex-grow">{service.description}</p>
                <div className="mt-6">
                  <button className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                    Learn more →
                  </button>
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-32 h-32 rounded-full ${service.color.replace(
                    "to",
                    "from"
                  )} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="mt-20 text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        ></div>
      </div>
    </div>
  );
};

export default Services;
