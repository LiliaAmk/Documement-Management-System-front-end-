import React from "react";

const Contact = () => {
  return (
    <div className="bg-[#0D0D2B] py-3 flex items-center justify-center">
      <div className="w-full max-w-sm p-6">
        <h2 className="text-white text-3xl font-bold text-center mb-1">
          Contact <span className="text-[#00D9D9]">us</span>
        </h2>
        <p className="text-gray-600 text-center mb-4">Drop your message here!</p>

        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-500 border border-[#3E3E5C] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00D9D9]"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              className="w-full h-28 px-4 py-2 bg-transparent text-white placeholder-gray-500 border border-[#3E3E5C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D9D9] resize-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#00D9D9] text-[#0D0D2B] font-semibold py-2 rounded-full hover:bg-[#00BFBF] transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
