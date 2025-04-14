import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer
      className="bg-[#0E0E0E] text-white py-16 px-4 md:px-8 lg:px-16"
      id="footer"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="flex flex-col space-y-6">
          <img src="" alt="Company Logo" className="w-40 h-auto" />
          <div>
            <h2 className="font-bold text-xl mb-2">Location HQ</h2>
            <p className="text-gray-400">23 Valley Lane, Austin</p>
            <a
              href="mailto:defiskyspace@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              info@blockinv.com
            </a>
          </div>
        </div>

        {/* Customer Support */}
        <div>
          <h2 className="font-bold text-xl mb-4">Customer Support</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Private Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Planning Service */}
        <div>
          <h2 className="font-bold text-xl mb-4">Planning Service</h2>
          <ul className="space-y-2">
            {[
              "Planning Services",
              "Assets Management",
              "Alternative Investing",
              "Retirement Planning",
              "Private Wealth",
            ].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Investment Service */}
        <div>
          <h2 className="font-bold text-xl mb-4">Investment Service</h2>
          <ul className="space-y-2">
            {[
              "Option Trading",
              "Real Estate",
              "Stock Market",
              "Infrastructure",
              "Forex Trading",
              "Crypto Asset",
              "Fixed Income",
              "Agriculture",
            ].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400 mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Top Capital Mining. All rights
          reserved.
        </p>
        <div className="flex space-x-4">
          <BsFacebook className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
          <BsTwitter className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
          <BsInstagram className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
          <BsLinkedin className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
