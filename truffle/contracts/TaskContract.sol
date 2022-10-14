// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TaskContract {
    event AddTaskEvent(address recipient, uint256 taskId);
    event DeleteTaskEvent(uint256 taskId, bool isCompleted);

    struct Task {
        uint256 id;
        string taskText;
        bool isCompleted;
    }

    Task[] private tasks;

    mapping(uint256 => address) taskToOwner;

    function addTask(string memory taskText, bool isCompleted) external {
        uint256 id = tasks.length;
        tasks.push(Task(id, taskText, isCompleted));
        taskToOwner[id] = msg.sender;
        emit AddTaskEvent(msg.sender, id);
    }

    function getMyTasks() external view returns (Task[] memory) {
        Task[] memory temp = new Task[](tasks.length);

        uint256 counter = 0;

        for (uint256 i = 0; i < tasks.length; i++) {
            if (taskToOwner[i] == msg.sender && !tasks[i].isCompleted) {
                temp[counter] = tasks[i];
                counter++;
            }
        }

        Task[] memory result = new Task[](counter);

        for (uint256 i = 0; i < counter; i++) {
            result[i] = temp[i];
        }

        return result;
    }

    function getTaskCount() external view returns (uint256) {
        uint256 counter = 0;

        for (uint256 i = 0; i < tasks.length; i++) {
            if (taskToOwner[i] == msg.sender && !tasks[i].isCompleted) {
                counter++;
            }
        }

        return counter;
    }

    function deleteTask(uint256 taskId, bool isCompleted) external {
        require(
            taskToOwner[taskId] == msg.sender,
            "You are not the owner of this task"
        );

        tasks[taskId].isCompleted = isCompleted;

        emit DeleteTaskEvent(taskId, tasks[taskId].isCompleted);
    }
}
