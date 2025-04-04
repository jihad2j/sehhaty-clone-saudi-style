
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Eye, EyeOff, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Login = () => {
  const [nationalId, setNationalId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userType, setUserType] = useState<"citizen" | "visitor">("citizen");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!nationalId.trim()) {
      toast.error("الرجاء إدخال رقم الهوية الوطنية");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        // Store the national ID in session storage for use in medical reports
        sessionStorage.setItem("nationalId", nationalId);
        setIsLoading(false);
        navigate("/medical-reports");
        toast.success("تم تسجيل الدخول بنجاح");
      }, 1000);
    } catch (error) {
      toast.error("حدث خطأ أثناء تسجيل الدخول");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <button className="text-sky-600 flex items-center gap-1">
          <Languages size={20} />
          English
        </button>
        <ChevronRight className="text-gray-600" />
      </header>

      {/* Logo */}
      <div className="flex justify-center mt-4">
        <img 
          src="public/lovable-uploads/ea0f5aad-3c2d-4397-9c09-aea7eacbf36a.png" 
          alt="صحتي" 
          className="w-20 h-20" 
        />
      </div>

      {/* Welcome text */}
      <div className="text-center mt-4 px-6">
        <h1 className="text-2xl font-bold text-gray-800">مرحباً بك مجدداً</h1>
        <p className="text-gray-500 mt-2">أدخل بياناتك المسجلة مسبقاً</p>
      </div>

      {/* Login form */}
      <form onSubmit={handleLogin} className="px-6 mt-8 flex-1 flex flex-col">
        {/* User type tabs */}
        <div className="grid grid-cols-2 rounded-lg overflow-hidden border mb-6">
          <button
            type="button"
            className={`py-3 px-4 text-center ${
              userType === "citizen" ? "bg-white text-sky-600" : "bg-sky-50 text-gray-500"
            }`}
            onClick={() => setUserType("citizen")}
          >
            مواطن/مقيم
          </button>
          <button
            type="button"
            className={`py-3 px-4 text-center ${
              userType === "visitor" ? "bg-white text-sky-600" : "bg-sky-50 text-gray-500"
            }`}
            onClick={() => setUserType("visitor")}
          >
            زائر
          </button>
        </div>

        {/* National ID input */}
        <div className="mb-4">
          <Input
            dir="rtl"
            type="text"
            placeholder="رقم الهوية الوطنية أو الإقامة"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            className="h-14 border-gray-300 text-right text-lg bg-white"
          />
        </div>

        <div className="mt-auto mb-6">
          <Button
            type="submit"
            className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-lg"
            disabled={isLoading}
          >
            {isLoading ? "جاري التسجيل..." : "تسجيل الدخول"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
