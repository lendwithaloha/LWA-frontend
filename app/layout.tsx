// app/layout.tsx

"use client";

import "./globals.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { AuthProvider } from "@/context/auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap children with the ThemeProvider */}
        {/* <ThemeProvider>
          <CssBaseline /> */}
        <ToastContainer />
        <Provider store={store}>
          <AuthProvider>
            {children}
            </AuthProvider>
        </Provider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
