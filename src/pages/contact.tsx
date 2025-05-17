import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });

  interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
      // Reset form after submission
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Our Location",
      details: " Davis Farm Dr NW Kenneshaw, Georgia, USA",
    },
    {
      icon: <FaPhoneAlt />,
      title: "Phone Number",
      details: "+12248586687",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Address",
      details: "topcapitalmining@gmail.com",
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      details: "Monday - Friday: 9AM - 6PM (EST)",
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: "#", label: "Facebook" },
    { icon: <FaTwitter />, url: "#", label: "Twitter" },
    { icon: <FaInstagram />, url: "#", label: "Instagram" },
    { icon: <FaLinkedin />, url: "#", label: "LinkedIn" },
  ];

  return (
    <div className="bg-gradient-to-b from-[#0E0E0E] to-[#1a1a1a] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-pink-600 rounded-full filter blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              We're here to help! Reach out to our team with any questions or
              concerns about your investments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white mr-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="text-gray-400 pl-14">{item.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-900/70 backdrop-blur-md p-8 rounded-xl border border-gray-800"
            >
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mb-8 rounded-full" />

              {formStatus.isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-900/50 border border-green-500/30 rounded-lg p-6 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-300">
                    Thank you for reaching out. Our team will get back to you
                    shortly.
                  </p>
                  <button
                    onClick={() =>
                      setFormStatus((prev) => ({ ...prev, isSubmitted: false }))
                    }
                    className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-400 mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-400 mb-2"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-gray-400 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-400 mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                      placeholder="Please describe your question or concern in detail..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className={`w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center
                      ${
                        formStatus.isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20"
                      }`}
                  >
                    {formStatus.isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Placeholder for map - In a real implementation, you would use Google Maps or similar */}
              {/* <div className="h-80 bg-gray-800 rounded-xl overflow-hidden mb-8 border border-gray-700">
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-3xl text-purple-500 mx-auto mb-3" />
                    <p className="text-gray-400">
                      Map integration would be here
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      200 Park Avenue, New York, NY
                    </p>
                  </div>
                </div>
              </div> */}

              {/* Additional contact information */}
              <div className="bg-gray-900/70 backdrop-blur-md p-8 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <p className="text-gray-400 mb-6">
                  Follow us on social media for the latest updates, market
                  insights, and investment opportunities.
                </p>

                <div className="flex space-x-4 mb-8">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      aria-label={social.label}
                      className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h4 className="font-semibold mb-2">Customer Support Hours</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM (EST)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 2:00 PM (EST)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full" />
            <p className="text-gray-300">
              Find quick answers to common questions, or contact us for more
              detailed assistance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                question: "How do I get started with investing?",
                answer:
                  "To get started, simply create an account, complete verification, and fund your account to begin investing.",
              },
              {
                question: "What investment plans do you offer?",
                answer:
                  "We offer Starter, Standard, Advanced, and Master plans with different ROI rates and minimum investments.",
              },
              {
                question: "How can I withdraw my funds?",
                answer:
                  "Withdrawals can be requested from your dashboard and are typically processed within 24-48 hours.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-2xl p-10 lg:p-16 text-center max-w-5xl mx-auto border border-purple-500/20 shadow-xl shadow-purple-500/5"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Still Have Questions?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Our dedicated support team is ready to assist you with any
              questions about our cryptocurrency investment services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+12248588466"
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <FaPhoneAlt className="mr-3" />
                Call Us Now
              </a>
              <a
                href="#live-chat"
                className="px-8 py-4 bg-transparent border border-purple-500 hover:border-purple-400 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                Live Chat
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
