// src/pages/LandingPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import logo from '../assets/logo.png';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
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
      className="font-sans text-gray-800 overflow-hidden"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Navbar */}
      <motion.nav
        className="flex justify-between items-center py-6 px-8 bg-white/90 backdrop-blur-md shadow-xl border-b border-purple-100 sticky top-0 z-50"
        variants={slideInLeft}
      >
        <div className="flex items-center gap-4">
          <motion.img 
            src={logo} 
            alt="Mock n Shop Logo" 
            className="h-20 w-auto drop-shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Mock n Shop
          </span>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/editor"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            ✨ Start Designing
          </Link>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="relative text-center py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 overflow-hidden"
        variants={fadeInUp}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10">
          <motion.h2 
            className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight"
            variants={scaleIn}
          >
            Design. Compare. Shop.
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-700 font-medium leading-relaxed"
            variants={fadeInUp}
          >
            Create stunning event mockups in minutes and get instant price comparisons from top online stores. 
            <span className="text-purple-600 font-semibold"> Your dream event, perfectly planned. 🎉</span>
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={fadeInUp}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/editor"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-purple-300/50 transform hover:-translate-y-1"
              >
                🚀 Launch Editor
              </Link>
            </motion.div>
            <motion.a 
              href="#features" 
              className="text-purple-600 hover:text-pink-600 text-xl font-semibold pt-2 sm:pt-4 group transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              Learn More 
              <span className="inline-block ml-2 group-hover:translate-y-1 transition-transform duration-300">↓</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose Mock n Shop? ✨
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "🎨 Easy Mockup Editor",
                description: "Create and customize event setups with drag & drop simplicity. No design experience needed!",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "💰 Price Comparison",
                description: "Find product links from top retailers sorted from cheapest to costliest. Save money effortlessly!",
                gradient: "from-pink-500 to-red-500"
              },
              {
                title: "📤 Share & Export",
                description: "Export your mockups or share them with friends and clients instantly. Professional results every time!",
                gradient: "from-blue-500 to-purple-500"
              }
            ].map((feature, idx) => (
              <ScrollFadeSection key={idx}>
                <motion.div 
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                </motion.div>
              </ScrollFadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Design + Amazon Links Section */}
      <ScrollFadeSection>
        <section className="relative bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 py-20 px-6 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-blue-300/15 to-purple-300/15 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.h3 
              className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              🎨 Try It Now: Upload Your Design
            </motion.h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-10 text-xl leading-relaxed">
              Upload your backdrop or party mockup and we'll match it with 
              <span className="font-semibold text-purple-600"> trending decor items from Amazon</span>. 
              Magic happens instantly! ✨
            </p>
            
            <motion.form 
              className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="border-2 border-purple-200 rounded-2xl px-6 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 transition-all duration-300"
                />
              </div>
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Upload & Match
              </motion.button>
            </motion.form>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-200">
              <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
                🛍️ Sample Decor Picks (Amazon)
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { emoji: "🎈", text: "Jungle Leaf Garland", url: "https://amzn.to/4n55vvW" },
                  { emoji: "🦁", text: "Jungle Safari Cutouts", url: "https://amzn.to/3ZxrJNk" },
                  { emoji: "🎉", text: "Sage Green Balloons", url: "https://amzn.to/3HHHpY6" }
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-2xl p-4 text-purple-700 font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border border-purple-200/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl mr-2">{item.emoji}</span>
                    {item.text} – Amazon
                  </motion.a>
                ))}
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500 font-medium">
              *As an Amazon Associate, we earn from qualifying purchases.
            </p>
          </div>
        </section>
      </ScrollFadeSection>

      {/* FAQ */}
      <ScrollFadeSection>
        <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h3 
              className="text-4xl md:text-5xl font-black text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              🤔 Frequently Asked Questions
            </motion.h3>
            <div className="space-y-8">
              {[
                {
                  question: "Is Mock n Shop free to use?",
                  answer: "Yes! You can design mockups and compare product prices for free. No hidden costs, no surprises! 🎉"
                },
                {
                  question: "How do I get product links?",
                  answer: "After you create a mockup, we automatically fetch matching products and sort them by price. It's like having a personal shopping assistant! 🛍️"
                },
                {
                  question: "Can I share my designs?",
                  answer: "Absolutely! You can download or email them directly to clients or friends. Show off your amazing creativity! ✨"
                }
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                >
                  <h4 className="font-bold text-xl text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-purple-600">Q:</span>
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed pl-8">
                    <span className="text-pink-600 font-semibold">A:</span> {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFadeSection>
    </motion.div>
  );
};

export default LandingPage;