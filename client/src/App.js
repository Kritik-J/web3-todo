import "./App.css";
import styled from "styled-components/macro";
import TaskContainer from "./components/TaskContainer";
import { useTodo } from "./contexts/TodoContext";
import React from "react";
import Loader from "./components/Loader";

function App() {
  const { connectWallet, loading, error, isAuth, clearError, loadwallet } =
    useTodo();

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        clearError();
      }, 3000);
    }

    if (!isAuth) {
      loadwallet();
    }
  }, [error, clearError, isAuth, loadwallet]);

  return (
    <div className="App">
      <AppScreen>
        {loading && <Loader />}

        {isAuth ? (
          <TaskContainer />
        ) : (
          <ConnectWallet onClick={connectWallet}>Connect Wallet</ConnectWallet>
        )}

        {error && <h1>{error}</h1>}
      </AppScreen>
    </div>
  );
}

const AppScreen = styled.div`
  height: 100vh;
  max-width: 144rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const ConnectWallet = styled.button`
  background-color: #ff731d;
  color: #fff;
  border: none;
  border-radius: 4rem;
  padding: 1.4rem 2.8rem;
  font-size: 1.8rem;
  font-weight: 600;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: #ff6200;
    cursor: pointer;
  }
`;

export default App;
