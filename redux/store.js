import { configureStore } from "@reduxjs/toolkit";
import { userReduser } from "./user/slice";
import { postsReducer } from "./posts/slice";

export const store = configureStore({
  reducer: { user: userReduser, posts: postsReducer },
});
