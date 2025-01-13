import React from "react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/footer/Footer";
import WordExplorer from "../components/word_explorer/WordExplorer";

const WordExplorerPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <WordExplorer />
      </main>
      <Footer />
    </div>
  );
};

export default WordExplorerPage;
