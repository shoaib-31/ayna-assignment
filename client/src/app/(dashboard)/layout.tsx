"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Initialize as null to indicate loading state

  const path = usePathname();
  // Check for token
  const getToken = () => {
    const token = localStorage.getItem("jwt");
    setIsAuthenticated(!!token); // Update state based on token presence
  };

  useEffect(() => {
    getToken();
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      window.location.href = "/auth";
    }
  }, [isAuthenticated]);

  // Show loading state while determining authentication
  if (isAuthenticated === null) {
    return (
      <div className=" h-screen w-full flex justify-center items-center flex-col">
        <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
        Loading...
      </div>
    );
  }

  // Generate breadcrumb items dynamically based on the current route
  const pathSegments = path.split("/").filter((segment) => segment);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return { name: segment.charAt(0).toUpperCase() + segment.slice(1), href };
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 h-[100dvh] bg-gray-50 flex flex-col">
        <div className="w-fit flex items-center justify-center gap-4">
          <SidebarTrigger />
          <span className="text-gray-400">|</span>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((breadcrumb) => (
                <React.Fragment key={breadcrumb.href}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={breadcrumb.href}>
                      {breadcrumb.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}
