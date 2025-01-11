import React from "react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/footer/Footer";
import GenerateWord from "../components/generate_sentence_page/GenerateSentence";

const GenerateSentencePage = () => {
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

export default GenerateSentencePage;
