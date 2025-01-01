import React from "react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/footer/Footer";
import GenerateWord from "../components/generate_word_page/GenerateWord";

const GenerateWordPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <GenerateWord />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GenerateWordPage;
