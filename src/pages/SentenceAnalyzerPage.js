import React from "react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/footer/Footer";
import SentenceAnalyzer from "../components/sentence_analyzer/SentenceAnalyzer";

const SentenceAnalyzerPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <SentenceAnalyzer />
      </main>
      <Footer />
    </div>
  );
};

export default SentenceAnalyzerPage;
