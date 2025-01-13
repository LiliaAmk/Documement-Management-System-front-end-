
import React from "react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/footer/Footer";
import GrammarExercise from "../components/grammar_page/GrammarExercise";

const GrammarPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <GrammarExercise />
      </main>
      <Footer />
    </div>
  );
};

export default GrammarPage;