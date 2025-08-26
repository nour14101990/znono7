import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send, Sparkles } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import { motion } from 'framer-motion';

/*
  Redesigned ContactPage Component
  - Updated color scheme to purple-indigo gradients for theme consistency
  - Replaced AOS with Framer Motion for smoother, more controlled animations
  - Enhanced form inputs with better focus states and glassmorphism
  - Optimized Lottie animation with reduced scale variations and added subtle rotation
  - Improved submit button with loading state and gradient hover
  - Updated Swal modals to match purple-indigo theme
  - Enhanced responsiveness: better stacking on mobile, adjusted paddings
  - Added subtle background glow on hover for the form container
*/

const ContactPage = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const emailAnimationOptions = {
    src: '/email.lottie',
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering 
        ? "scale-125 rotate-1" 
        : "scale-110"
    }`
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Sending Message...',
      html: 'Please wait while we send your message',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: '#0f172a', // Slate-950
      color: '#ffffff',
      confirmButtonColor: '#818cf8', // Indigo-400
    });

    try {
      // Get form data
      const form = e.target;
      const formData = new FormData(form);

      // Submit form
      await form.submit();

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonColor: '#818cf8', // Indigo-400
        timer: 2000,
        timerProgressBar: true,
        background: '#0f172a',
        color: '#ffffff'
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#818cf8',
        background: '#0f172a',
        color: '#ffffff'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Motion variants for section elements
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="Contact">
      <motion.div 
        className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={sectionVariants}
      >
        {/* Title */}
        <motion.div variants={childVariants} className="inline-block relative group">
          <h2
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500"
          >
            Contact Me
          </h2>
        </motion.div>
        {/* Description */}
        <motion.p
          variants={childVariants}
          className="mt-2 text-slate-300 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-purple-500" />
          Got a question? Send me a message, and I'll get back to you soon.
          <Sparkles className="w-5 h-5 text-purple-500" />
        </motion.p>
      </motion.div>

      <motion.div
        className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={sectionVariants}
      >
        <div className="container px-[1%] grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            variants={childVariants}
            className="bg-slate-900/30 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-300 hover:shadow-purple-500/10 border border-slate-700/50 hover:border-purple-500/30"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
                  Get in Touch
                </h2>
                <p className="text-slate-400">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-purple-500 opacity-50" />
            </div>

            <form 
              action="https://formsubmit.co/n.zakhrouf.inf@lagh-univ.dz"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <motion.div
                variants={childVariants}
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-slate-900/50 rounded-xl border border-slate-700/50 placeholder-slate-500 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 hover:border-purple-500/30 disabled:opacity-50"
                  required
                />
              </motion.div>
              <motion.div
                variants={childVariants}
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-slate-900/50 rounded-xl border border-slate-700/50 placeholder-slate-500 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 hover:border-purple-500/30 disabled:opacity-50"
                  required
                />
              </motion.div>
              <motion.div
                variants={childVariants}
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-slate-900/50 rounded-xl border border-slate-700/50 placeholder-slate-500 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 hover:border-purple-500/30 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </motion.div>
              <motion.button
                variants={childVariants}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>

           {/* <motion.div variants={childVariants} className="mt-10 pt-6 border-t border-slate-700/50 flex justify-center space-x-6">
              <SocialLinks />
            </motion.div>*/}
          </motion.div>

          {/* Right Column - Optimized Lottie Animation */}
          <motion.div 
            variants={childVariants}
            className="w-full py-[10%] sm:py-0 h-auto md:h-[600px] xl:h-[500px] relative flex items-center justify-center order-1 md:order-2 mt-8 md:mt-0"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-full opacity-90">
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
              }`}>
              </div>

              <div className={`relative z-10 w-full opacity-90 transform transition-transform duration-500 ${
                isHovering ? "scale-105" : "scale-100"
              }`}>
                <DotLottieReact {...emailAnimationOptions} />
              </div>

              <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                isHovering ? "opacity-50" : "opacity-20"
              }`}>
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/10 to-indigo-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                  isHovering ? "scale-110" : "scale-100"
                }`}>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactPage;