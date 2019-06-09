import React from "react";
import Header from "./Header";
import MainSection from "./MainSection";
import { TodosProvider } from "./TodoContext";

const App = () => {
  return (
    <TodosProvider>
      <div>
        <Header />
        <MainSection />
      </div>
    </TodosProvider>
  );
};

export default App;
