import React, { useState } from "react";
import Sidebar from "./sidebar";
import ProfileMenuIcon from "./menu-icon";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

interface DashboardProps {
  Content: React.FC<{ user?: User }>;
}

const Dashboard: React.FC<DashboardProps> = ({ Content }) => {
  const { data: session } = useSession();

  const role = session?.user?.user?.role;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return session ? (
    <div className="flex">
      {/* Sidebar for desktop */}
      <article className="hidden md:block">
        {role && <Sidebar theme="" role={role} />}
      </article>

      <div className="flex-1 min-h-screen bg-gray-100">
        <header className="bg-white shadow flex items-center px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center w-full">
            {/* Menu Icon for mobile */}
            <section className="block md:hidden mr-4">
              <ProfileMenuIcon toggleSidebar={toggleSidebar} />
            </section>

            {/* Title for mobile and desktop */}
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 flex-1 text-center md:text-left">
              {role === "admin" && <span>Admin</span>} Dashboard
            </h1>

            {/* Optionally add other icons for desktop here */}
            <div className="hidden md:block">
              {/* Additional desktop icons */}
            </div>
          </div>
        </header>

        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                {/* Render the passed content here */}
                <section className="flex items-center justify-center">
                  <Content user={session.user} />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
      {isSidebarOpen && (
        <>
          <div
            className="absolute inset-0 bg-black opacity-50 z-30"
            onClick={closeSidebar}
          ></div>
          <div className="h-screen absolute my-12 inset-0 z-40 bg-gray-800 text-white">
           { role && (<Sidebar
              role={role}
              theme="md:hidden"
              closeSidebar={closeSidebar}
            />)}
          </div>
        </>
      )}
    </div>
  ) : null;
};

export default Dashboard;
