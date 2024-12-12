import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  resetFormUser,
  setFormUser,
  setIsUpdate,
  updateUser,
} from "../../stores/slices/crudSlice";
import { toast } from "react-toastify";

export default function FormAdd() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.users.formUser);
  const isUpdate = useSelector((state) => state.users.isUpdate);
  const onSubmitForm = (e) => {
    e.preventDefault();

    if (!form.id) {
      dispatch(addUser(form));
      toast.success("add User Success");
      dispatch(resetFormUser());
    } else {
      const { id, ...data } = form;

      dispatch(updateUser({ id, data }));

      dispatch(setIsUpdate(false));
      dispatch(resetFormUser());
    }
  };
  const onChangeValue = (e) => {
    dispatch(setFormUser({ name: e.target.name, value: e.target.value }));
  };
  const handleCancel = () => {
    dispatch(setIsUpdate(false));
    dispatch(resetFormUser());
  };
  return (
    <>
      <div className="mt-20">
        <h2 className="text-2xl font-semibold text-primary mb-10">Form User</h2>
        <form
          action=""
          onSubmit={onSubmitForm}
          className="max-w-xl  p-4 bg-white shadow-md rounded"
        >
          <h2 className="text-xl font-bold mb-4 text-primary">
            {isUpdate ? "Update User" : "Add User"}
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary"
              placeholder="Name..."
              required
              onChange={onChangeValue}
              value={form.name}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary"
              placeholder="Email..."
              required
              onChange={onChangeValue}
              value={form.email}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              onChange={onChangeValue}
              value={form.status}
            >
              <option value="active">active</option>
              <option value="inactive">inActive</option>
            </select>
          </div>
          {isUpdate ? (
            <button className="w-full px-4 py-2 text-white bg-primary rounded hover:opacity-80 focus:outline-none focus:ring focus:ring-blue-300">
              Update
            </button>
          ) : (
            <button className="w-full px-4 py-2 text-white bg-primary rounded hover:opacity-80 focus:outline-none focus:ring focus:ring-blue-300">
              Add
            </button>
          )}
          {isUpdate ? (
            <button
              onClick={handleCancel}
              className="w-full mt-2 px-4 py-2 text-white bg-red-400 rounded hover:opacity-80 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Cancel
            </button>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}
