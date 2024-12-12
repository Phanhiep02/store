import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken, removeToken, saveToken } from "../../utils/token";
const AUTH_API = import.meta.env.VITE_AUTH_API;
const initialState = {
  formLogin: {
    email: "",
    password: "",
  },
  user: null,
  token: getToken(),
  status: "ide",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormLogin: (state, action) => {
      const { name, value } = action.payload;
      state.formLogin[name] = value;
    },
    logout: (state) => {
      state.user = null;
      state.token = removeToken();
      state.status = "ide";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRequestLogin.pending, (state) => {
      state.status = "loading";
      state.error = null; // Xóa thông báo lỗi trước đó
    });
    builder.addCase(getRequestLogin.fulfilled, (state, action) => {
      state.token = action.payload;
      saveToken(action.payload);
      state.status = "success";
      state.error = null; // Đăng nhập thành công, không có lỗi
    });
    builder.addCase(getRequestLogin.rejected, (state, action) => {
      state.status = "error";
      state.error =
        action.payload || "Login failed. Please check your credentials."; // Lưu lỗi
    });

    builder.addCase(getProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "success";
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.status = "error";
    });
  },
});

// Action creators are generated for each case reducer function
export const { setFormLogin, logout } = authSlice.actions;
export const getRequestLogin = createAsyncThunk(
  "get/getRequest",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_API}/auth/login`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const token = response.data;
      if (token) {
        saveToken(token);
        return token;
      }
      throw new Error("Invalid token");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid email or password."
      );
    }
  }
);

export const getProfile = createAsyncThunk("getProfile", async () => {
  try {
    const { access_token: accessToken } = getToken();
    const response = await axios.get(`${AUTH_API}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user = response.data;

    return user;
  } catch (error) {
    console.log("ko lay duoc profile");
    return false;
  }
});
