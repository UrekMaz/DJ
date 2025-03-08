import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    
    <div className="py-4 px-8 flex flex-col h-screen max-w mx-auto">
      <Header />
      <Outlet />
    </div>
  );
}