"use client";
import { useState } from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
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
    <section className="py-20 px-[150px] text-white">
      <h2 className="text-5xl font-bold text-center">Contact me.</h2>
      <p className="text-center text-gray-400 mt-2">
        Want to order a project? Or do you just want to stay in touch?
      </p>

      <div className="grid md:grid-cols-2 gap-10 mt-10">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="border border-gray-800 rounded-lg p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Juan Dela Cruz"
                className="w-full py-2 px-3 rounded-md border border-gray-700 focus:border-gray-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="juan@delacruz.com"
                className="w-full py-2 px-3 rounded-md border border-gray-700 focus:border-gray-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Hello there!"
              className="w-full py-2 px-3 rounded-md border border-gray-700 focus:border-gray-500 outline-none"
              required
              maxLength={500}
            />
            <p className="text-sm text-gray-500 text-right">
              {form.message.length} / 500
            </p>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-purple-500 font-semibold rounded-lg py-2 px-5 w-full md:w-auto -mt-2 hover:bg-purple-600 transition-colors duration-300 cursor-pointer"
          >
            Send
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
              className="flex items-center justify-between border border-gray-800 rounded-lg px-6 py-4 hover:border-gray-500 transition-all"
            >
              <div className="flex items-center gap-4">
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
