import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const Faq = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const faqItems = [
    {
      question: "What is Top Capital Mining?",
      answer:
        "Top Capital Mining is a platform that allows you to buy, sell, and trade cryptocurrencies securely. It offers investment plans with attractive returns.",
    },
    {
      question: "How do I get started?",
      answer:
        "To get started, simply click on the 'Get Started' button on our homepage. You'll be guided through a registration process to create your account.",
    },
    {
      question: "What are the investment plans offered?",
      answer:
        "We offer four investment plans: Starter Plan, Standard Plan, Advanced Plan, and Master Plan. Each plan has different daily ROI and minimum investment amounts.",
    },
    {
      question: "Is my investment safe?",
      answer:
        "Yes Top Capital Mining Finance prioritizes security. We use advanced encryption and security protocols to protect your investments and personal information.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact our customer support team via email at info@blockinv.com or through our live chat feature available on our website.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <section className="w-full py-20 px-4 bg-[#0E0E0E] text-white" id="faq">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Find answers to common questions about our platform and services.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`border border-gray-800 rounded-xl transition-all duration-300 ${
                selected === index
                  ? "bg-gray-900/80 border-purple-500"
                  : "bg-gray-800/60 hover:border-purple-400"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left group"
              >
                <div className="flex items-center gap-3">
                  <FaQuestionCircle className="text-purple-400" />
                  <h3 className="text-lg font-medium group-hover:text-purple-300">
                    {item.question}
                  </h3>
                </div>
                <motion.span
                  animate={{ rotate: selected === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-purple-400"
                >
                  <FaChevronDown />
                </motion.span>
              </button>
              <AnimatePresence>
                {selected === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-300"
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            Still need help? Reach out to our team.
          </p>
          <a
            href="mailto:info@blockinv.com"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
