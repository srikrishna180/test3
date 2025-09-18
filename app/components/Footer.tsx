const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 w-full flex flex-col md:flex-row justify-between items-center">
      <div>
        <a href="/" className="text-gray-400 hover:text-gray-300 mx-2">
          &copy; {new Date().getFullYear()} Stlth Towing PTY LTD
        </a>
      </div>
      <div className="text-gray-400 mx-2">
        Designed & developed by{" "}
        <a
          href="https://irs.dev"
          target="_blank"
          className="hover:text-gray-300 underline"
        >
          Krishna
        </a>
      </div>
      <div>
        <a
          href="/privacy-policy"
          className="text-gray-400 hover:text-gray-300 mx-2"
        >
          Privacy Policy
        </a>
        <a
          href="/terms-of-service"
          className="text-gray-400 hover:text-gray-300 mx-2"
        >
          Terms of Service
        </a>
        <a
          href="/contact-us"
          className="text-gray-400 hover:text-gray-300 mx-2"
        >
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
