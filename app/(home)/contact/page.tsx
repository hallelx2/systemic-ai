import { Navbar } from "@/components/layout/header";
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from "lucide-react";
import { Footer } from "@/components/home/footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8 text-center">Get in Touch</h1>
          <p className="text-xl text-center mb-12">
            We'd love to hear from you. Please fill out the form below or reach
            out directly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <form className="bg-black shadow-md rounded-lg p-8">
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-gray-500 text-sm font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-500 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-500 text-sm font-bold mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <div className="bg-black shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-blue-600 mr-4" />
                    <span>support@synthesisai.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-blue-600 mr-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-blue-600 mr-4" />
                    <span>123 AI Street, Tech City, TC 12345</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
