const Home = () => {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-semibold text-gray-800 mt-2 mb-6">
            Welcome to WebWealth. 
            <br></br>
            Your Gateway to Informed Investing.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
          Are you an investor looking for strategies or insights, 
          or perhaps you're cautiously navigating the volatile market? 
          Whether you're committed to long-term wealth or looking 
          for tactical opportunities in stocks, real estate, or crypto, 
          WebWealth is your essential resource.
          </p>

          <img
            src="https://s.yimg.com/ny/api/res/1.2/fCIC.SZFnq3qtAHFHC8UfQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTcyMDtjZj13ZWJw/https://media.zenfs.com/en/business_insider_articles_888/5428ec9d09d4aafd0c511c09dc5f4086"
            alt="Web Wealth Office"
            className="w-full custom-height object-cover rounded-lg mb-8"
          />
          <h2 className="text-3xl font-semibold text-gray-800 mt-2 mb-6">
            Why Join WebWealth?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
          Why settle for surface-level discussions when you can dive deep into the 
          complexities of market analysis and investment strategies with like-minded 
          enthusiasts? At WebWealth, we're more than just a forum. We're a community 
          committed to empowering each member with insights and data-driven analysis.
          </p>
          <p className="text-lg text-gray-600 mb-4">
          At WebWealth, every conversation could unveil critical information that might catalyze 
          your next investment decision. Our platform is built on the belief that 
          knowledge is power, and informed decisions are the most profitable ones.
          </p>
          <p className="text-lg text-gray-600 mb-4">
          Join today to engage with a network of finance enthusiasts who don’t just 
          passively observe the markets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
