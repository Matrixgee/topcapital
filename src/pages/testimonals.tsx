import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Testimonials = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const testimonials = [
    {
      id: 1,
      img: "https://i.pravatar.cc/150?img=1",
      testimony:
        "They provided me with reliable information, trading tips, and orientation to their investment packages. I thank the account managers for their effort.",
      name: "Jason Blake",
      role: "Financial Advisor",
      rating: 5,
      color: "from-purple-600 to-indigo-600",
    },
    {
      id: 2,
      img: "https://i.pravatar.cc/150?img=2",
      testimony:
        "Their insights and services are unmatched. I am impressed with the dedication and reliability of their team. Great experience overall.",
      name: "Maria Gomez",
      role: "Investor",
      rating: 4,
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: 3,
      img: "https://i.pravatar.cc/150?img=3",
      testimony:
        "I had an amazing experience working with them. Their support team is always there to assist and guide me at every step.",
      name: "Robert Brown",
      role: "Entrepreneur",
      rating: 5,
      color: "from-amber-500 to-orange-600",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full py-20 bg-gradient-to-b from-[#0A0A0A] to-[#1A0B2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Investor{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Testimonials
            </span>
          </motion.h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Hear what our clients say about their experience
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative overflow-hidden" data-aos="fade-up">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <motion.div
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-0.5 shadow-xl hover:shadow-2xl transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${testimonial.color}`}
                  ></div>
                  <div className="relative h-full bg-gray-900 rounded-xl p-8">
                    <div className="flex flex-col items-center">
                      {/* Image with Rating */}
                      <div className="mb-8 relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-purple-500/30 relative z-10">
                          <img
                            src={testimonial.img}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div
                          className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${testimonial.color} text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg`}
                        >
                          {testimonial.rating}/5
                        </div>
                      </div>

                      {/* Testimony */}
                      <blockquote className="text-gray-300 text-lg text-center mb-8 leading-relaxed relative">
                        <span className="absolute -top-6 left-0 text-5xl text-purple-500/30">
                          "
                        </span>
                        {testimonial.testimony}
                        <span className="absolute -bottom-6 right-0 text-5xl text-purple-500/30">
                          "
                        </span>
                      </blockquote>

                      {/* Author */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {testimonial.name}
                        </h3>
                        <p
                          className={`text-transparent bg-clip-text bg-gradient-to-r ${testimonial.color}`}
                        >
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 w-8"
                    : "bg-gray-600 hover:bg-gray-500 w-3"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
