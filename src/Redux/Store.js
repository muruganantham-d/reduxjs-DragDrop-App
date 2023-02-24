import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/taskSlice';

const Store = configureStore({
  reducer: {
    tasks: taskReducer
  }
});

export default Store;