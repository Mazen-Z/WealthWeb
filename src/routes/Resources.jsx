const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <img
            src="res.jpg"
            alt="Stonks"
            className="w-full object-cover h-64 sm:h-96"
          />
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Finance Resources
            </h1>
            <p className="text-gray-600 mb-6">
              Are you new here or did you just lose A LOT of money? All good either way. 
              Find information, support, and guidance for everything finance here.
  
            </p>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.investopedia.com/articles/basics/04/100804.asp#toc-the-bottom-line"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  What Affects Stock Prices?
                </a>
              </li>
              <li>
                <a
                  href="https://www.investopedia.com/tech/most-important-cryptocurrencies-other-than-bitcoin/"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  What Crypto Should I Buy?
                </a>
              </li>
              <li>
                <a
                  href="https://robinhood.com/us/en/"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Your Journey Today
                </a>
              </li>
              <li>
                <a
                  href="https://www.investopedia.com/investing/simple-ways-invest-real-estate/"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Real Estate Beginners Guide
                </a>
              </li>
              <li>
                <a
                  href="https://hedgefollow.com/"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow the Big Players
                </a>
              </li>
              <li>
                <span className="font-semibold">
                  Invest Wisely.
                </span>{" "}
                
              </li>
            
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
