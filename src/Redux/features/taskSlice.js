import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    inProgressTasks: [],
    completedTasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    startTask: (state, action) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
      const task = state.tasks.splice(taskIndex, 1);
      state.inProgressTasks.push(task[0]);
    },
    completeTask: (state, action) => {
      const taskIndex = state.inProgressTasks.findIndex((task) => task.id === action.payload.id);
      const task = state.inProgressTasks.splice(taskIndex, 1);
      state.completedTasks.push(task[0]);
    },
    reorderTasks: (state, action) => {
      const { sourceList, destinationList, sourceIndex, destinationIndex } = action.payload;

      if (sourceList === 'tasks' && destinationList === 'tasks') {
        const [removedTask] = state.tasks.splice(sourceIndex, 1);
        state.tasks.splice(destinationIndex, 0, removedTask);
      } else if (sourceList === 'tasks' && destinationList === 'inProgressTasks') {
        const [removedTask] = state.tasks.splice(sourceIndex, 1);
        state.inProgressTasks.splice(destinationIndex, 0, removedTask);
      }
      
      else if (sourceList === 'inProgressTasks' && destinationList === 'inProgressTasks') {
        const [removedTask] = state.inProgressTasks.splice(sourceIndex, 1);
        state.inProgressTasks.splice(destinationIndex, 0, removedTask);
      } else if (sourceList === 'inProgressTasks' && destinationList === 'tasks') {
        const [removedTask] = state.inProgressTasks.splice(sourceIndex, 1);
        state.tasks.splice(destinationIndex, 0, removedTask);
      } else if (sourceList === 'inProgressTasks' && destinationList === 'completedTasks') {
        const [removedTask] = state.inProgressTasks.splice(sourceIndex, 1);
        state.completedTasks.splice(destinationIndex, 0, removedTask);
      } else if (sourceList === 'completedTasks' && destinationList === 'completedTasks') {
        const [removedTask] = state.completedTasks.splice(sourceIndex, 1);
        state.completedTasks.splice(destinationIndex, 0, removedTask);
      }
 
      else if (sourceList === 'completedTasks' && destinationList === 'inProgressTasks') {
        const [removedTask] = state.completedTasks.splice(sourceIndex, 1);
        state.inProgressTasks.splice(destinationIndex, 0, removedTask);
      }
    },
  },
});

export const { addTask, startTask, completeTask, reorderTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
