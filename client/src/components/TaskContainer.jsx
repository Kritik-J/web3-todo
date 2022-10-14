import React from "react";
import styled from "styled-components/macro";
import { useTodo } from "../contexts/TodoContext";
import TaskItem from "./TaskItem";

const TaskContainer = () => {
  const { user, todos, addTask, getAllTasks } = useTodo();
  const [input, setInput] = React.useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(input);
    setInput("");
  };

  React.useEffect(() => {
    getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TaskSection>
      <TaskHeader>
        <h2>
          Hello, <span>{user.slice(0, 5) + "..." + user.slice(-3)}</span>
        </h2>

        <h2>
          <span>{todos && todos.length}</span> Tasks
        </h2>
      </TaskHeader>

      <TaskAdd onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Add a task"
          maxLength="50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button>+</button>
      </TaskAdd>

      <TaskList>
        {todos.map((todo, index) => (
          <TaskItem key={index} todo={todo} />
        ))}
      </TaskList>
    </TaskSection>
  );
};

const TaskSection = styled.div`
  background-color: #212121;
  width: 100%;
  max-width: 48rem;
  height: calc(100vh - 8rem);
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    height: 100vh;
    max-width: 100%;
    background-color: transparent;
  }
`;

const TaskHeader = styled.div`
  padding: 0 2rem;
  height: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1rem solid #3d3d3d;
  background-color: #1e1e1e;
  border-radius: 0.5rem 0.5rem 0 0;

  h2 {
    font-size: 1.8rem;
    color: #fff;
    font-weight: 400;
    margin-bottom: 0.6rem;
  }

  span {
    color: var(--secondary);
  }

  @media (max-width: 768px) {
    background-color: transparent;

    h2 {
      font-size: 1.6rem;
    }
  }
`;

const TaskAdd = styled.form`
  padding: 0 2rem;
  height: 4.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1rem solid #3d3d3d;
  background-color: #1e1e1e;

  input {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    color: #fff;
    font-size: 1.6rem;
    font-weight: 400;
    margin-right: 1rem;
    outline: none;
  }

  button {
    color: #fff;
    border: none;
    border-radius: 4rem;
    font-size: 1.6rem;
    background-color: #ff731d;
    padding: 0.5rem 1rem;

    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    background-color: transparent;

    input {
      font-size: 1.4rem;
    }

    button {
      font-size: 1.4rem;
      padding: 0.4rem 0.8rem;
    }
  }
`;

const TaskList = styled.div`
  height: calc(100% - 11rem);
  overflow-y: auto;
  border-radius: 0 0 0.5rem 0.5rem;

  &::-webkit-scrollbar {
    width: 0.6rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #3d3d3d;
    border-radius: 0.5rem;
  }
`;

export default TaskContainer;
