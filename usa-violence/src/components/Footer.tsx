
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto py-6">
      <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Violence Statistics Dashboard. All rights reserved.</p>
        <p className="mt-2 text-sm">Data sources: FBI, NCVS, Gun Violence Archive, CSIS, ADL.</p>
      </div>
    </footer>
  );
};

export default Footer;
