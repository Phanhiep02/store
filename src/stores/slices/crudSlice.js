import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const USER_API = import.meta.env.VITE_USER_API;
export const crudSlice = createSlice({
  name: "users",
  initialState: {
    formUser: {
      name: "",
      email: "",
      status: "active",
    },
    users: [],
    status: "ide",
    isUpdate: false,
  },
  reducers: {
    setFormUser: (state, action) => {
      const { name, value } = action.payload;
      state.formUser[name] = value;
    },
    resetFormUser: (state) => {
      state.formUser = { name: "", email: "", status: "active" };
    },
    setFormUpdateUer: (state, action) => {
      state.formUser = action.payload;
    },
    setIsUpdate: (state, actions) => {
      state.isUpdate = actions.payload;
    },
  },
  extraReducers: (builder) => {
    // get user
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = "success";
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.status = "error";
    });
    // add user
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
      state.status = "success";
    });
    builder.addCase(addUser.rejected, (state) => {
      state.status = "error";
    });
    // delete user
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      console.log("action delete", action.payload);

      state.users = state.users.filter((user) => user.id !== action.payload);
      state.status = "success";
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.status = "error";
    });
    // update User
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log("action.payload Update", action.payload);

      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      console.log("index", index);

      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
  },
});
export const getUsers = createAsyncThunk("get/getUsers", async () => {
  try {
    const response = await axios.get(`${USER_API}/users`);
    const users = response.data;
    return users;
  } catch (error) {
    console.log("error", error);
    return false;
  }
});
export const addUser = createAsyncThunk("add/addUser", async (body) => {
  try {
    const response = await axios.post(`${USER_API}/users`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.log("error", error);
    return false;
  }
});
export const deleteUser = createAsyncThunk("delete/deleteUser", async (id) => {
  try {
    const response = await axios.delete(`${USER_API}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return id;
  } catch (error) {
    console.log("error", error);
    return false;
  }
});
export const updateUser = createAsyncThunk(
  "update , updateUser",
  async ({ id, data }) => {
    const response = await axios.put(`${USER_API}/users/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("idAPI", id);
    console.log("bodyAPI", data);

    return response.data;
  }
);
export const getAllSliceUser = (state) => state.users.users;
export const { setFormUser, resetFormUser, setFormUpdateUer, setIsUpdate } =
  crudSlice.actions;
