// src/components/Header.jsx

const Header = () => {
    return (
      <div className="relative screen h-80">
        
        {/* Background Image */}
        <div
          className="absolute inset-x-0 top-0 bg-cover bg-center h-full"
          style={{
            backgroundImage: "url(https://wallpapers.com/images/file/dark-blue-background-s86tidn9aho9ulxm.jpg)",
          }}
        ></div>
  
        {/* Content with Quote */}
        <div className="relative z-10 text-white text-center p-30">
          <h1 className="text-4xl font-bold mb-6">
            Unlock a world of endless inspiration with millions of blogs, all just a click away.
          </h1>
        </div>  
  
        {/* Navigation links aligned to the top-right */}
        <div className="absolute top-4 right-8 flex space-x-8">
          <a href="#discover" className="text-xl font-bold text-white hover:text-white cursor-pointer">
            Home
          </a>
          <a href="#blogs" className="text-xl font-bold text-white hover:text-white cursor-pointer">
            Blogs
          </a>
          <a href="#contact" className="text-xl font-bold text-white hover:text-white cursor-pointer">
            Contact
          </a>
        </div>
      </div>
    );
  };
  
  export default Header;
  