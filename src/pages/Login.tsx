
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Header from "@/components/Layout/Header";

const Login: React.FC = () => {
  const [nationalId, setNationalId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nationalId || nationalId.trim().length < 5) {
      toast.error("الرجاء إدخال رقم هوية صحيح");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // Store the nationalId in sessionStorage to use in other pages
      sessionStorage.setItem("nationalId", nationalId);
      
      setIsLoading(false);
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/medical-reports");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                className="mb-4"
                onClick={() => navigate("/")}
              >
                <ChevronRight className="h-5 w-5 ml-2" />
                العودة
              </Button>
              
              <h1 className="text-2xl font-bold text-center mb-2">تسجيل الدخول</h1>
              <p className="text-gray-500 text-center">للوصول إلى التقارير الطبية</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="nationalId" className="block text-sm font-medium text-right mb-1">
                    رقم الهوية
                  </label>
                  <Input
                    id="nationalId"
                    type="text"
                    placeholder="أدخل رقم الهوية"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-sky-500 hover:bg-sky-600"
                  disabled={isLoading}
                >
                  {isLoading ? "جاري التسجيل..." : "تسجيل الدخول"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
