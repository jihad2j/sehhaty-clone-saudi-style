
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarCheck, FileText, Home, User, Stethoscope, Activity } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
      <div className="grid grid-cols-5 h-16">
        <Link to="/" className={`flex flex-col items-center justify-center ${isActive("/") ? "text-saudi-primary" : "text-gray-500"}`}>
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">الرئيسية</span>
        </Link>
        
        <Link to="/appointments" className={`flex flex-col items-center justify-center ${isActive("/appointments") ? "text-saudi-primary" : "text-gray-500"}`}>
          <CalendarCheck className="h-5 w-5" />
          <span className="text-xs mt-1">المواعيد</span>
        </Link>
        
        <Link to="/medical-reports" className={`flex flex-col items-center justify-center ${isActive("/medical-reports") ? "text-saudi-primary" : "text-gray-500"}`}>
          <Activity className="h-5 w-5" />
          <span className="text-xs mt-1">التقارير</span>
        </Link>
        
        <Link to="/documents" className={`flex flex-col items-center justify-center ${isActive("/documents") ? "text-saudi-primary" : "text-gray-500"}`}>
          <FileText className="h-5 w-5" />
          <span className="text-xs mt-1">الملفات</span>
        </Link>
        
        <Link to="/profile" className={`flex flex-col items-center justify-center ${isActive("/profile") ? "text-saudi-primary" : "text-gray-500"}`}>
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">الملف</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
