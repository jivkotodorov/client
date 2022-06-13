import React from 'react';
import Tasks from './Tasks';
import { Paper, TextField, Checkbox, Button } from '@material-ui/core';
import './TasksListApp.css';

class TasksListApp extends Tasks {

  state = {
    tasks: [],
    currentTask: ''
  }

  render() {
    const {tasks} = this.state;
    const doneTasks = tasks && tasks.filter(task => task.completed).length;

    return (
      <div className='App flex'>
        <Paper className='container' elevation={3} >
          <div className='heading'>
            THINGS TO DO:
          </div>

          <div className='tasks_list_container'>
            {tasks.map((task, index) => (
              <Paper
                className='flex task_container'
                key={task._id}>
                <Checkbox 
                  checked={task.completed}
                  onClick={() => this.handleUpdate(task._id)}
                  color='primary'
                />
                <div className={task.completed ? 'task line_through' : 'task'}>
                  <TextField
                    className='text_field'
                    value={task.task}
                    required={false}
                    multiline={true}
                    onChange={(e) => this.handleChangeText(e, index, task._id)}
                  />
                </div>
                <Button onClick={() => this.handleDelete(task._id)} color='primary'>
                  X
                </Button>
              </Paper>
            ))}
          </div>

          <div className='footer'>
            {`DONE: ${doneTasks}`}
          </div>

          <form className='form flex' onSubmit={this.handleSubmit}>
            <TextField 
              className='text_field'
              variant='outlined'
              size='small'
              value={this.state.currentTask}
              required={true}
              onChange={this.handleChange}
              placeholder='Enter new task'
            />
            <Button
              className='button_add'
              color='primary'
              variant='contained'
              type='submit'>
              ADD TASK
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default TasksListApp;