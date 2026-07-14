/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useGetMessagesQuery,
  useDeleteMessageMutation,
} from "@/redux/features/message/messageSlice";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const MessagesPage = () => {
  const { data, isLoading, isError } = useGetMessagesQuery(undefined);
  const [deleteMessage] = useDeleteMessageMutation();
  const [expandedMessages, setExpandedMessages] = useState<{ [key: string]: boolean }>({});

  const messages = data?.data || [];

const handleDelete = async (id: string) => {
  const confirm = window.confirm("Are you sure you want to delete this message?");
  if (!confirm) return;

  try {
    await deleteMessage(id).unwrap();
    toast.success("Message deleted successfully");
  } catch (error) {
    toast.error("Failed to delete message");
  }
};
  const toggleMessage = (id: string) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) return <p className="p-4">Loading messages...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load messages.</p>;

  return (
    <div className="space-y-6 p-4">
      <section className="dashboard-card relative overflow-hidden p-6 md:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-sky-500/25 via-emerald-400/10 to-transparent" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-200">
            Messages
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Inbox Overview</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Review patient questions and contact requests.
          </p>
        </div>
      </section>

      <section className="dashboard-card p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg: any) => {
                const isExpanded = expandedMessages[msg._id];
                const messageToShow =
                  msg.message.length > 20 && !isExpanded
                    ? `${msg.message.slice(0, 20)}... `
                    : msg.message;
                return (
                  <tr key={msg._id} className="border-t">
                    <td className="px-4 py-3 font-semibold">{msg.name}</td>
                    <td className="px-4 py-3 text-sky-700 dark:text-sky-300">{msg.email}</td>
                    <td className="px-4 py-3">{msg.subject}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {messageToShow}
                      {msg.message.length > 20 && (
                        <button
                          onClick={() => toggleMessage(msg._id)}
                          className="text-sky-600 hover:underline ml-1"
                        >
                          {isExpanded ? "Show less" : "See more"}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="text-rose-600 hover:text-rose-800"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {messages.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-500 dark:text-slate-400">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MessagesPage;
