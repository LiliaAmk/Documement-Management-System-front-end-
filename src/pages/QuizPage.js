import React from "react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/footer/Footer";
import ArabicQuiz from "../components/quiz_page/ArabicQuiz";

const QuizPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <ArabicQuiz />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default QuizPage;
