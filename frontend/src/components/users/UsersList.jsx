import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UserSkeleton from "./UserSkeleton";

export default function UsersList({
  users,
  handleEdit,
  handleDelete,
  loading,
}) {
  return (
    <ul className="w-full gap-2">
      {loading ? (
        <UserSkeleton />
      ) : (
        users.map((user) => (
          <li
            key={user.id}
            className="flex flex-col p-2 border-b-1 border-amber-600 transition duration-300 pb-1 mx-10"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex-1">
                <p className="text-md font-normal flex flex-row items-center">
                  <span className="mr-2">{user.name}</span>

                  <span className="text-[12px] text-center">
                    {"-"}
                    {user.role}
                  </span>
                </p>

                <p className="text-[12px]">{user.email}</p>
              </div>
              <div className="flex mt-2 sm:mt-0 space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="flex items-center px-3 py-1 text-white bg-teal-400 border border-teal-400 rounded hover:bg-white hover:text-teal-400 transition duration-200 text-[12px]"
                >
                  <FaEdit className="mr-1" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="flex items-center px-3 py-1 text-white bg-red-500 border border-red-500 rounded hover:bg-white hover:text-red-500 transition duration-200 text-[12px]"
                >
                  <FaTrash className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
