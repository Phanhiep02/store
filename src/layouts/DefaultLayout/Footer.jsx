import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="mt-32">
      <footer className=" bg-gray-500 text-white  py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="text-sm">
              We are your go-to online store for all your shopping needs.
              Offering top-quality products and exceptional service.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <ul className="text-sm space-y-2">
              <li>Email: phanhiep070502@gmail.com</li>
              <li>Phone: +84357809889</li>
              <li>Address: 48 NKToan Ha Noi</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">
            &copy; 2024 Your Store. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
