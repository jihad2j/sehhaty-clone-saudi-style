
import React from "react";
import Header from "../components/Layout/Header";
import BottomNavigation from "../components/Layout/BottomNavigation";
import DashboardCards from "../components/Home/DashboardCards";
import RecentAppointments from "../components/Home/RecentAppointments";
import HealthMetrics from "../components/Home/HealthMetrics";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">مرحباً، عبدالله</h1>
          <p className="text-gray-600">نتمنى لك يوم صحي سعيد</p>
        </div>
        
        <DashboardCards />
        <RecentAppointments />
        <HealthMetrics />
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
