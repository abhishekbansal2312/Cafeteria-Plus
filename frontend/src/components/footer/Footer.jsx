import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 px-24 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-6">About the Cafeteria</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/about"
                  className="hover:text-gray-400 transition duration-200 dark:hover:text-gray-300"
                >
                  Who We Are
                </a>
              </li>
              <li>
                <a
                  href="/menu"
                  className="hover:text-gray-400 transition duration-200 dark:hover:text-gray-300"
                >
                  Our Menu
                </a>
              </li>
              <li>
                <a
                  href="/team"
                  className="hover:text-gray-400 transition duration-200 dark:hover:text-gray-300"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-gray-400 transition duration-200 dark:hover:text-gray-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Menu Section */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-6">Explore Our Menu</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/breakfast"
                  className="hover:text-gray-400 transition duration-200 dark:hover:text-gray-300"
                >
                  Breakfast
                </a>
              </li>
              <li>
                <a
                  href="/lunch"
                  className="hover:text-gray-400 transition duration-200 dark:hover:text-gray-300"
                >
                  Lunch
                </a>
              </li>
              <li>
                <a
                  href="/dinner"
                  className="hover:text-gray-400 transition duration-200 dark:hover:text-gray-300"
                >
                  Dinner
                </a>
              </li>
              <li>
                <a
                  href="/specials"
                  className="hover:text-gray-400 transition duration-200 dark:hover:text-gray-300"
                >
                  Today's Specials
                </a>
              </li>
            </ul>
          </div>

          {/* Partner With Us Section */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-6">Partner With Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/catering"
                  className="hover:text-gray-400 transition duration-200 dark:hover:text-gray-300"
                >
                  Catering
                </a>
              </li>
              <li>
                <a
                  href="/supplier"
                  className="hover:text-gray-400 transition duration-200 dark:hover:text-gray-300"
                >
                  Become a Supplier
                </a>
              </li>
              <li>
                <a
                  href="/franchise"
                  className="hover:text-gray-400 transition duration-200 dark:hover:text-gray-300"
                >
                  Franchise Opportunities
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Contact Section */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-6">Stay Connected</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-gray-100 transition duration-200 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <FaFacebook className="h-8 w-8" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-gray-100 transition duration-200 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <FaTwitter className="h-8 w-8" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-gray-100 transition duration-200 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <FaInstagram className="h-8 w-8" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-gray-100 transition duration-200 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <FaLinkedin className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>
            By continuing past this page, you agree to our{" "}
            <a
              href="/terms"
              className="underline hover:text-gray-200 transition duration-200 dark:hover:text-gray-300"
            >
              Terms of Service
            </a>
            ,{" "}
            <a
              href="/cookie-policy"
              className="underline hover:text-gray-200 transition duration-200 dark:hover:text-gray-300"
            >
              Cookie Policy
            </a>
            ,{" "}
            <a
              href="/privacy-policy"
              className="underline hover:text-gray-200 transition duration-200 dark:hover:text-gray-300"
            >
              Privacy Policy
            </a>
            , and{" "}
            <a
              href="/content-policies"
              className="underline hover:text-gray-200 transition duration-200 dark:hover:text-gray-300"
            >
              Content Policies
            </a>
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
