
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
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
        <Card className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-6">
              <div className="bg-green-50 p-3 rounded-full">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">تسجيل الدخول</h1>
              <p className="text-gray-500">للوصول إلى التقارير الطبية</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="nationalId" className="block text-sm font-medium text-right mb-1 text-gray-700">
                    رقم الهوية
                  </label>
                  <Input
                    id="nationalId"
                    type="text"
                    placeholder="أدخل رقم الهوية"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
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
