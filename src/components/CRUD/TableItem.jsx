import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllSliceUser,
  getUsers,
  setFormUpdateUer,
  setFormUser,
  setIsUpdate,
} from "../../stores/slices/crudSlice";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

export default function TableItem() {
  const dispatch = useDispatch();
  const users = useSelector(getAllSliceUser);
  const isUpdate = useSelector((state) => state.users.isUpdate);
  // console.log(isUpdate);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const onDeleteUser = (id) => {
    confirmAlert({
      title: " Do you want delete user?",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteUser(id));
            toast.success("delete user success");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const onUpdateUser = (data) => {
    dispatch(setFormUpdateUer(data));
    dispatch(setIsUpdate(true));
  };
  return (
    <>
      <tbody>
        {users.map((user, index) => {
          return (
            <tr key={index}>
              <td className="border border-gray-500 px-4 py-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-500 px-4 py-2">{user.name}</td>
              <td className="border border-gray-500 px-4 py-2">{user.email}</td>
              <td className="border border-gray-500 px-4 py-2">
                <span
                  className={`inline-block px-2 py-1 text-white ${
                    user.status === "active" ? "bg-green-500" : "bg-yellow-500"
                  } rounded`}
                >
                  {user.status === "active" ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="border border-gray-500 px-4 py-2 text-center">
                <button
                  onClick={() => onUpdateUser(user)}
                  className="px-2 py-1 text-white bg-yellow-500 rounded"
                >
                  Edit
                </button>
              </td>
              <td className="border border-gray-500 px-4 py-2 text-center">
                <button
                  onClick={() => onDeleteUser(user.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
}
