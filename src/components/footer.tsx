// components/Footer.tsx
import Link from 'next/link';
import FacebookIcon from '../../public/icons/facebook-icon.svg';
import TwitterIcon from '../../public/icons/twitter-icon.svg';
import InstagramIcon from '../../public/icons/instagram-icon.svg';
import VisaIcon from '../../public/icons/visa-icon.svg';
import MasterCardIcon from '../../public/icons/mastercard-icon.svg';
import Image from 'next/image';
import Logo from './logo-transparent';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-56 lg:mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* About Section */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">About Us</h4>
            <p>
              We are committed to providing high-quality, nutritious, and affordable meals for everyone. Our mission is to make healthy eating easy and accessible.
            </p>
          </div>

          {/* Links Section */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul>
              <li>
                <Link className="hover:underline" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/track-order">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Payment Section */}
          <div className='md:px-8'>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookIcon style={{ filter: 'invert(1)' }} className="w-6 h-6 text-white hover:text-gray-400" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon style={{ filter: 'invert(1)' }} className="w-6 h-6 text-white hover:text-gray-400" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon style={{ filter: 'invert(1)' }} className="w-6 h-6 text-white hover:text-gray-400" />
              </a>
            </div>

            {/* Payment Methods */}
            <h4 className="text-lg font-semibold mb-2">We Accept</h4>
            <div className="flex space-x-4">
              <a href="https://www.mastercard.us/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/icons/mastercard-icon.svg"
                  alt="Mastercard"
                  width={40}
                  height={24}
                />
              </a>
              <a href="https://www.visa.com/" target="_blank" rel="noopener noreferrer">
                <Image
                  className='rounded-lg p-1'
                  src="/icons/visa-icon.svg"
                  alt="Visa"
                  width={40}
                  height={24}
                  style={{ filter: 'invert(1)' }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
         <div className="text-center mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} DishDiscovery. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
