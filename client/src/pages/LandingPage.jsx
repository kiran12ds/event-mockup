// src/pages/LandingPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import logo from '../assets/logo.png';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ScrollFadeSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('animate');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
};

const LandingPage = () => {
  return (
    <motion.div
      className="font-sans text-gray-800"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Navbar */}
      <motion.nav
        className="flex justify-between items-center py-4 px-8 bg-white shadow-md sticky top-0 z-50"
        variants={fadeInUp}
      >
        <div className="flex items-center gap-3">
          <img src={logo} alt="Mock n Shop Logo" className="h-20 w-auto" />
          <span className="text-3xl font-bold text-purple-700">Mock n Shop</span>
        </div>
        <Link
          to="/editor"
          className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm hover:bg-purple-700 transition"
        >
          Start Designing
        </Link>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="text-center py-20 bg-gradient-to-br from-purple-100 to-pink-100"
        variants={fadeInUp}
      >
        <motion.h2 className="text-5xl font-bold mb-4" variants={fadeInUp}>Design. Compare. Shop.</motion.h2>
        <motion.p className="text-lg mb-6 max-w-xl mx-auto" variants={fadeInUp}>
          Create beautiful event mockups in minutes and get instant price comparisons from top online stores.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeInUp}
        >
          <Link
            to="/editor"
            className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition"
          >
            Launch Editor
          </Link>
          <a href="#features" className="text-purple-600 hover:underline text-lg pt-2 sm:pt-3">
            Learn More ↓
          </a>
        </motion.div>
      </motion.section>

      {/* Features */}
      <section id="features" className="py-16 px-6 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
        {["Easy Mockup Editor", "Price Comparison", "Share & Export"].map((title, idx) => (
          <ScrollFadeSection key={idx}>
            <div className="shadow-lg rounded-xl p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p>{
                idx === 0
                  ? "Create and customize event setups with drag & drop simplicity."
                  : idx === 1
                  ? "Find product links from top retailers sorted from cheapest to costliest."
                  : "Export your mockups or share them with friends and clients instantly."
              }</p>
            </div>
          </ScrollFadeSection>
        ))}
      </section>

      {/* Upload Design + Amazon Links Section */}
      <ScrollFadeSection>
        <section className="bg-gradient-to-br from-pink-100 to-purple-100 py-16 px-6 text-center">
          <h3 className="text-3xl font-bold text-purple-800 mb-6">Try It Now: Upload Your Design</h3>
          <p className="text-gray-700 max-w-xl mx-auto mb-6">
            Upload your backdrop or party mockup and we’ll match it with trending decor items from Amazon.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <input
              type="file"
              accept="image/*"
              className="border border-gray-300 rounded-md px-4 py-2 bg-white"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
            >
              Upload
            </button>
          </form>

          <h4 className="text-xl font-semibold text-gray-800 mb-4">Sample Decor Picks (Amazon)</h4>
          <ul className="space-y-2 text-purple-700 underline">
            <li>
              <a href="https://www.amazon.com/dp/B09R6HP7KZ" target="_blank" rel="noopener noreferrer">
                🎈 Jungle Leaf Garland – Amazon
              </a>
            </li>
            <li>
              <a href="https://www.amazon.com/dp/B08P5PDBL9" target="_blank" rel="noopener noreferrer">
                🦁 Lion King Birthday Backdrop – Amazon
              </a>
            </li>
            <li>
              <a href="https://www.amazon.com/dp/B07PFD6Q7W" target="_blank" rel="noopener noreferrer">
                🎉 Gold Number Balloons – Amazon
              </a>
            </li>
          </ul>

          <p className="mt-4 text-sm text-gray-500">
            *As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </section>
      </ScrollFadeSection>


      {/* FAQ */}
      <ScrollFadeSection>
        <section className="bg-white py-12 px-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-purple-700 mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg text-gray-800">Is Mock n Shop free to use?</h4>
              <p className="text-gray-600">Yes! You can design mockups and compare product prices for free.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800">How do I get product links?</h4>
              <p className="text-gray-600">After you create a mockup, we automatically fetch matching products and sort them by price.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800">Can I share my designs?</h4>
              <p className="text-gray-600">Absolutely! You can download or email them directly to clients or friends.</p>
            </div>
          </div>
        </section>
      </ScrollFadeSection>
    </motion.div>
  );
};

export default LandingPage;
