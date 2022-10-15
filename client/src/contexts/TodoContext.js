import { useContext, createContext, useState } from "react";
import { ethers } from "ethers";
import TaskContractAbi from "../contracts/TaskContract.json";

const TodoContext = createContext({
  todos: [],
  loading: false,
  error: null,
  user: null,
  isAuth: false,
  connectWallet: () => {},
  clearError: () => {},
  loadwallet: () => {},
  addTodo: () => {},
  getAllTasks: () => {},
  deleteTask: () => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw new Error("Get MetaMask!");
      }

      const chainId = await ethereum.request({ method: "eth_chainId" });

      if (chainId !== "0x5") {
        throw new Error("Connect to Goerli Test Network!");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setLoading(false);

      setUser(accounts[0]);

      setIsAuth(true);
    } catch (error) {
      setLoading(false);

      setError(error.message);
    }
  };

  const loadwallet = async () => {};

  const clearError = () => {
    setError(null);
  };

  const addTask = async (input) => {
    setLoading(true);

    const task = {
      taskText: input,
      completed: false,
    };

    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw new Error("Get MetaMask!");
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const TaskContract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        TaskContractAbi.abi,
        signer
      );

      TaskContract.addTask(task.taskText, task.completed)
        .then((res) => {
          setTodos([...todos, task]);
        })
        .catch((err) => {
          setError(err.message);
        });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const getAllTasks = async () => {
    setLoading(true);

    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw new Error("Get MetaMask!");
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const TaskContract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        TaskContractAbi.abi,
        signer
      );

      const tasks = await TaskContract.getMyTasks();

      setTodos(tasks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);

    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw new Error("Get MetaMask!");
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const TaskContract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        TaskContractAbi.abi,
        signer
      );

      TaskContract.deleteTask(id, true)
        .then((res) => {
          setTodos(todos.filter((todo) => todo.id !== id));
        })
        .catch((err) => {
          setError(err.message);
        });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const value = {
    todos,
    setTodos,
    loading,
    setLoading,
    error,
    setError,
    user,
    setUser,
    isAuth,
    setIsAuth,
    connectWallet,
    clearError,
    loadwallet,
    addTask,
    getAllTasks,
    deleteTask,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
