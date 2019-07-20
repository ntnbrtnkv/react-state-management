import React, { useState, useContext } from "react";
import Footer from "./Footer";
import TodoList from "./TodoList";
import { TodosContext } from "./TodoContext";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "./TodoFilters";

const MainSection = () => {
  // * 2. useState for simple component state
  const [visibilityFilter, setFilter] = useState(SHOW_ALL);

  // * 9. Get state and methods to change it
  const {
    todos,
    actions: { toggleAllTodo, clearCompleted }
  } = useContext(TodosContext);

  const todosCount = todos.length;
  const completedCount = todos.filter(({ completed }) => completed).length;

  // * 3. Compute visible in place
  let visibleTodos;
  switch (visibilityFilter) {
    case SHOW_ALL:
      visibleTodos = todos;
      break;
    case SHOW_COMPLETED:
      visibleTodos = todos.filter(t => t.completed);
      break;
    case SHOW_ACTIVE:
      visibleTodos = todos.filter(t => !t.completed);
      break;
    default:
      throw new Error("Unknown filter: " + visibilityFilter);
  }

  return (
    <section className="main">
      {!!todosCount && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <label onClick={toggleAllTodo} />
        </span>
      )}
      <TodoList todos={visibleTodos} />
      {!!todosCount && (
        <Footer
          visibilityFilter={visibilityFilter}
          setFilter={setFilter}
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          clearCompleted={clearCompleted}
        />
      )}
    </section>
  );
};

export default MainSection;
