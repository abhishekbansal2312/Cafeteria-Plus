import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer({ theme }) {
  return (
    <footer
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-800 text-white"
      } py-10 px-6 md:px-24`}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-6">About the Cafeteria</h3>
            <ul className="space-y-4">
              {["Who We Are", "Our Menu", "Our Team", "Contact Us"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={`hover:text-gray-400 transition duration-200 ${
                        theme === "dark" ? "dark:hover:text-gray-300" : ""
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Menu Section */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-6">Explore Our Menu</h3>
            <ul className="space-y-4">
              {["Breakfast", "Lunch", "Dinner", "Today's Specials"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={`hover:text-gray-400 transition duration-200 ${
                        theme === "dark" ? "dark:hover:text-gray-300" : ""
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Partner With Us Section */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-6">Partner With Us</h3>
            <ul className="space-y-4">
              {["Catering", "Become a Supplier", "Franchise Opportunities"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={`hover:text-gray-400 transition duration-200 ${
                        theme === "dark" ? "dark:hover:text-gray-300" : ""
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social Media & Contact Section */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-6">Stay Connected</h3>
            <div className="flex space-x-6">
              {[
                { href: "https://facebook.com", icon: <FaFacebook /> },
                { href: "https://twitter.com", icon: <FaTwitter /> },
                { href: "https://instagram.com", icon: <FaInstagram /> },
                { href: "https://linkedin.com", icon: <FaLinkedin /> },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`text-gray-400 hover:text-gray-100 transition duration-200 ${
                    theme === "dark"
                      ? "dark:text-gray-300 dark:hover:text-gray-100"
                      : ""
                  }`}
                >
                  <span className="h-8 w-8">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div
          className={`mt-12 border-t pt-6 text-center text-sm ${
            theme === "dark"
              ? "border-gray-700 text-gray-500"
              : "border-gray-700 text-gray-400"
          }`}
        >
          <p>
            By continuing past this page, you agree to our{" "}
            {[
              "Terms of Service",
              "Cookie Policy",
              "Privacy Policy",
              "Content Policies",
            ].map((policy, index) => (
              <a
                key={index}
                href="#"
                className={`underline hover:text-gray-200 transition duration-200 ${
                  theme === "dark" ? "dark:hover:text-gray-300" : ""
                }`}
              >
                {policy}
              </a>
            ))}
            .
          </p>
          <p className="mt-4">
            All trademarks are properties of their respective owners. ©
            2008-2025 Cafeteria™ Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
