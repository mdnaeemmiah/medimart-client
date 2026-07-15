"use client";

import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster richColors position="top-center" />
      {children}
    </Provider>
  );
};

export default Providers;
