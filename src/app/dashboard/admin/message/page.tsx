"use client";

import {
  useGetMessagesQuery,
  useDeleteMessageMutation,
} from "@/redux/features/message/messageSlice";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "react-hot-toast";

const MessagesPage = () => {
  const { data, isLoading, isError } = useGetMessagesQuery(undefined);
  const [deleteMessage] = useDeleteMessageMutation();

  const messages = data?.data || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteMessage(id).unwrap();
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading messages...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load messages.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Contact Messages
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="py-3 px-4 border-b dark:border-gray-700 text-gray-700 dark:text-gray-200">Name</th>
              <th className="py-3 px-4 border-b dark:border-gray-700 text-gray-700 dark:text-gray-200">Email</th>
              <th className="py-3 px-4 border-b dark:border-gray-700 text-gray-700 dark:text-gray-200">Subject</th>
              <th className="py-3 px-4 border-b dark:border-gray-700 text-gray-700 dark:text-gray-200">Message</th>
              <th className="py-3 px-4 border-b dark:border-gray-700 text-gray-700 dark:text-gray-200 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg: any) => (
              <tr key={msg._id} className=" dark:hover:bg-gray-800">
                <td className="py-3 px-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">{msg.name}</td>
                <td className="py-3 px-4 border-b dark:border-gray-700 text-blue-600 dark:text-blue-400">{msg.email}</td>
                <td className="py-3 px-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">{msg.subject}</td>
                <td className="py-3 px-4 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">{msg.message}</td>
                <td className="py-3 px-4 border-b dark:border-gray-700 text-center">
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesPage;
