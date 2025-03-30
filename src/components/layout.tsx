import { PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="py-8 border-t backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container text-center text-gray-100 mx-auto px-4">
          <p>Made by Sujal ~ Assignment Zynetic Weather App</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
