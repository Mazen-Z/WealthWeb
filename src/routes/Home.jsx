const Home = () => {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-semibold text-gray-800 mt-2 mb-6">
            WebWealth: Stocks, Real Estate, Crypto, and Anything Finance.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Are you a degen looking for your next big play or are you
            a bear waiting out this crazy market? 
            Maybe you&apos;re a bullish believer set on making generational wealth 
            one trade at a time. Whether you&apos;re hodling crypto, a 
            billionaire that needs more property in Manhattan, or 
            someone who loves gambling on SPY trades, at Web Wealth, you&apos;ve found your tribe!
          </p>

          <img
            src="https://s.yimg.com/ny/api/res/1.2/fCIC.SZFnq3qtAHFHC8UfQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTcyMDtjZj13ZWJw/https://media.zenfs.com/en/business_insider_articles_888/5428ec9d09d4aafd0c511c09dc5f4086"
            alt="Web Wealth Office"
            className="w-full custom-height object-cover rounded-lg mb-8"
          />
          <h2 className="text-3xl font-semibold text-gray-800 mt-2 mb-6">
            Why Join Web Wealth?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
          Because where else can you discuss the intricacies of Fibonacci retracements 
          and talk about stonk memes at the same time? At Web Wealth, we believe in 
          the power of financial information, whatever that means. Remember, in Web Wealth, 
          every post is a potential treasure trove, and could lead to your next 
          brilliant investment (or epic fail... buy hey, we’re all friends here).
          </p>
          <p className="text-lg text-gray-600 mb-4">
          Join today to connect with fellow finance aficionados who don’t just 
          follow the markets—they meme them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
