import React from "react";
import styled from "styled-components/macro";
import DeleteIcon from "../assets/delete.svg";
import { useTodo } from "../contexts/TodoContext";

const TaskItem = ({ todo }) => {
  const { deleteTask } = useTodo();

  return (
    <TaskWrapper>
      <h2>{todo.taskText}</h2>

      <button
        onClick={() => {
          deleteTask(todo.id);
        }}
      >
        <img src={DeleteIcon} alt="delete" />
      </button>
    </TaskWrapper>
  );
};

const TaskWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 0.1rem solid #3d3d3d;
  padding: 2rem;

  &:last-child {
    border-bottom: none;
  }

  h2 {
    font-size: 1.6rem;
    color: #fff;
    font-weight: 400;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-left: 1.5rem;

    img {
      width: 2rem;
      display: block;
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.4rem;
    }

    button {
      img {
        width: 1.8rem;
      }
    }
  }
`;

export default TaskItem;
