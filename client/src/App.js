import "./App.css";
import styled from "styled-components/macro";
import TaskContainer from "./components/TaskContainer";
import { useTodo } from "./contexts/TodoContext";
import React from "react";
import Loader from "./components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { connectWallet, loading, error, isAuth, clearError, loadwallet } =
    useTodo();

  React.useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

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
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        {loading && <Loader />}

        {isAuth ? (
          <TaskContainer />
        ) : (
          <ConnectWallet onClick={connectWallet}>Connect Wallet</ConnectWallet>
        )}
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
