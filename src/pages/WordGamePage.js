
import React from "react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/footer/Footer";
import WordGame from "../components/word_game/WordGame";

const WordGamePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <WordGame />
      </main>
      <Footer />
    </div>
  );
};

export default WordGamePage;