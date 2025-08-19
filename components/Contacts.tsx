"use client";
import { useState } from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setForm({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    {
      name: "Facebook",
      detail: "Kurt Oswill McCarver",
      icon: <FaFacebook size={20} color="#1877F2" />,
      href: "https://facebook.com/scrypt06",
    },
    {
      name: "X",
      detail: "@scrypt06",
      icon: <FaXTwitter size={20} color="#ffffff" />,
      href: "https://twitter.com/scrypt06",
    },
    {
      name: "Email",
      detail: "kurtoswillmc@gmail.com",
      icon: <MdEmail size={20} color="#EA4335" />,
      href: "mailto:kurtoswillmc@gmail.com",
    },
    {
      name: "LinkedIn",
      detail: "Kurt Oswill McCarver",
      icon: <FaLinkedin size={20} color="#0A66C2" />,
      href: "https://linkedin.com/in/kurtoswill",
    },
  ];

  return (
      <section className="py-16 px-6 sm:px-10 lg:px-[150px] text-white">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          Contact me.
        </h2>
        <p className="text-center text-white/75 mt-2 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
          Have a question or want to work together? Fill out the form below or reach out via my socials.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Form */}
          <form
              onSubmit={handleSubmit}
              className="border border-gray-800 rounded-lg p-4 sm:p-6 space-y-4"
          >
            {submitStatus === 'success' && (
                <div className="bg-green-900/20 border border-green-800 rounded-md p-3 text-green-400 text-sm">
                  Message sent successfully! I'll get back to you soon.
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="bg-red-900/20 border border-red-800 rounded-md p-3 text-red-400 text-sm">
                  Something went wrong. Please try again or contact me directly via email.
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold text-sm sm:text-base">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Juan Dela Cruz"
                    className="w-full py-2 px-3 rounded-md border border-gray-700 bg-gray-900 text-white focus:border-gray-500 outline-none text-sm sm:text-base"
                    required
                    disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-sm sm:text-base">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="juan@delacruz.com"
                    className="w-full py-2 px-3 rounded-md border border-gray-700 bg-gray-900 text-white focus:border-gray-500 outline-none text-sm sm:text-base"
                    required
                    disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-sm sm:text-base">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Hello there!"
                  className="w-full py-2 px-3 rounded-md border border-gray-700 bg-gray-900 text-white focus:border-gray-500 outline-none text-sm sm:text-base resize-vertical"
                  required
                  maxLength={500}
                  disabled={isSubmitting}
              />
              <p className="text-xs sm:text-sm text-gray-500 text-right">
                {form.message.length} / 500
              </p>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-md py-2 px-5 w-full sm:w-auto hover:bg-gray-200 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send'}
              <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1 mt-0.5"
                  size={17}
              />
            </button>
          </form>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold">Or contact me with...</p>
            {socials.map((social, idx) => (
                <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 rounded-lg px-4 sm:px-6 py-4 min-h-[50px] shadow-sm border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    {social.icon}
                    <span className="font-medium">{social.name}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{social.detail}</span>
                </a>
            ))}
          </div>
        </div>
      </section>
  );
}