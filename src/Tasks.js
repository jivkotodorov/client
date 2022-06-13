import { Component } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from './services/taskServices';

class Tasks extends Component {
    state = {
        tasks: [],
        currentTask: ''
    }

    async componentDidMount() {
        try {
            const { data } = await getTasks();
            this.setState({tasks: data});
        } catch (error) {
            console.log('Unable to retrieve tasks', error);
        }
    }

    handleChange = ({currentTarget: input}) => {
        this.setState({currentTask: input.value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        try {
            const { data } = await addTask({task: this.state.currentTask});
            const tasks = originalTasks;
            tasks.push(data);
            this.setState({tasks, currentTask: ''});
        } catch (error) {
            console.log('Error adding task', error);
        }
    }

    handleUpdate = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            tasks[index] = {...tasks[index]};
            tasks[index].completed = !tasks[index].completed;
            await updateTask(currentTask, {completed: tasks[index].completed});
            this.setState({tasks});
        } catch (error) {
            this.setState({tasks: originalTasks});
            console.log('Unable to update task', error);
        }
    }

    handleChangeText = async (e, index) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks];
            tasks[index] = {...tasks[index]};
            tasks[index].task = e.target.value;
            await updateTask(tasks[index]._id, {task: tasks[index].task});
            this.setState({tasks});
        } catch (error) {
            this.setState({tasks: originalTasks});
            console.log('Unable to update task', error);
        }
    }

    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks.filter((task) => task._id !== currentTask);
            this.setState({tasks});
            await deleteTask(currentTask);
        } catch (error) {
            this.setState({tasks: originalTasks});
            console.log('Unable to delete task', error);
        }
    }
}

export default Tasks;