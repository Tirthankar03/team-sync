import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/header";
import Asidebar from "@/components/asidebar/asidebar";

const AppLayout = () => {
  return (

      <SidebarProvider>
        <Asidebar />
        <SidebarInset className="overflow-x-hidden">
          <div className="w-full">
            <>
              <Header />
              <div className="px-3 lg:px-20 py-3">
                <Outlet />
              </div>
            </>
          </div>
        </SidebarInset>
      </SidebarProvider>
  );
};

export default AppLayout;
