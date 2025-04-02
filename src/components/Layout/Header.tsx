
import React from "react";
import { Bell, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-saudi-primary text-white p-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">صحتي</h1>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <Button variant="ghost" className="text-white p-2 rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Link to="/profile">
            <Button variant="ghost" className="text-white p-2 rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
