import React, { useContext } from "react";
import TodoTextInput from "./TodoTextInput";
import { TodosContext } from "./TodoContext";

const Header = () => {
  const {
    actions: { addTodo }
  } = useContext(TodosContext);

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={text => {
          if (text.length !== 0) {
            addTodo(text);
          }
        }}
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default Header;
