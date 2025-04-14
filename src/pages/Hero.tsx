import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const nav = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.6 },
    },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="w-full min-h-[32rem] bg-gradient-to-br from-[#0F0C29] via-[#1A0B47] to-[#2C075D] flex justify-center items-center px-4 py-12">
      <motion.div
        className="w-full max-w-6xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          variants={itemVariants}
        >
          Maximize Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Investment
          </span>{" "}
          Potential
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
          variants={itemVariants}
          transition={{ delay: 0.2 }}
        >
          AI-powered investment strategies designed to grow your wealth with
          precision and security.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={itemVariants}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg shadow-lg"
            onClick={() => nav("/auth/register")}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Start Investing Today
          </motion.button>
          <motion.button
            className="px-8 py-4 rounded-lg bg-white/10 text-white font-semibold text-lg border border-white/20 backdrop-blur-sm"
            onClick={() => nav("/auth/login")}
            variants={buttonVariants}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Plans
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          variants={itemVariants}
          transition={{ delay: 0.6 }}
        >
          {[
            { value: "24/7", label: "Market Monitoring" },
            { value: "AI", label: "Powered Analysis" },
            { value: "Secure", label: "Transactions" },
            { value: "Daily", label: "Profit Returns" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm"
            >
              <p className="text-2xl font-bold text-purple-400 mb-1">
                {item.value}
              </p>
              <p className="text-gray-300 text-sm">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
