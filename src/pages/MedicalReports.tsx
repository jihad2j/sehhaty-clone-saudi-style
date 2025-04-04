
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, FileText, Download, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Header from "../components/Layout/Header";
import BottomNavigation from "../components/Layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getMedicalReports, downloadMedicalReport } from "@/services/medicalReportsService";
import type { SickLeave } from "@/types/medicalReports";

const MedicalReports = () => {
  const [nationalId, setNationalId] = useState<string>("");
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);
  const [selectedLeave, setSelectedLeave] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  
  const { data: reportsData, isLoading, isError, error } = useQuery({
    queryKey: ['medicalReports', nationalId],
    queryFn: () => getMedicalReports(nationalId),
    enabled: searchTriggered && nationalId.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const handleLeaveClick = (leaveId: string) => {
    setSelectedLeave(selectedLeave === leaveId ? null : leaveId);
  };
  
  const handleSearch = () => {
    if (nationalId.trim().length < 5) {
      toast.error("الرجاء إدخال رقم هوية صالح");
      return;
    }
    
    setSearchTriggered(true);
  };
  
  const handleDownload = async (reportId: string) => {
    setIsDownloading(reportId);
    try {
      const response = await downloadMedicalReport(reportId);
      if (response.success && response.fileUrl) {
        // In a real app, you'd redirect to the download URL or create a download link
        // For now, we'll just show a success toast
        toast.success("تم تحميل التقرير بنجاح");
      } else {
        toast.error(response.message || "حدث خطأ أثناء تحميل التقرير");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تحميل التقرير");
      console.error(error);
    } finally {
      setIsDownloading(null);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={() => window.history.back()}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">التقارير الطبية</h1>
        </div>
        
        {/* National ID input */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-bold mb-4">أدخل رقم الهوية للبحث عن التقارير</h2>
          <div className="flex gap-3 items-center">
            <Input
              type="text"
              placeholder="رقم الهوية"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleSearch}
              className="bg-saudi-primary hover:bg-saudi-dark"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4 ml-2" />
                  بحث
                </>
              )}
            </Button>
          </div>
        </div>
        
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-saudi-primary" />
            <span className="mr-3 text-lg">جاري تحميل البيانات...</span>
          </div>
        )}
        
        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            <p className="text-center">حدث خطأ أثناء تحميل البيانات. الرجاء المحاولة مرة أخرى.</p>
          </div>
        )}
        
        {searchTriggered && reportsData && !isLoading && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-right mb-4">تقارير الإجازات</h2>
            
            {reportsData.data.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
                <p className="text-center">لا توجد تقارير طبية متاحة لرقم الهوية المدخل.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reportsData.data.map((leave) => (
                  <div key={leave.id} className="bg-white rounded-xl overflow-hidden shadow">
                    <div 
                      className="p-4 cursor-pointer"
                      onClick={() => handleLeaveClick(leave.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <ChevronDown className={`h-6 w-6 text-saudi-primary ${selectedLeave === leave.id ? 'rotate-180' : ''} transition-transform`} />
                          <div className="mr-3">
                            <h3 className="font-bold text-lg">{leave.title}</h3>
                            <p className="text-gray-500 text-sm">تاريخ الإصدار: {leave.issueDate}</p>
                          </div>
                        </div>
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                    
                    {selectedLeave === leave.id && (
                      <div className="border-t">
                        <div className="grid grid-cols-2 divide-x divide-x-reverse divide-gray-200">
                          <div className="p-4 text-center">
                            <p className="text-gray-500 mb-1">تاريخ بداية الإجازة</p>
                            <p className="font-bold">{leave.startDate}</p>
                          </div>
                          <div className="p-4 text-center">
                            <p className="text-gray-500 mb-1">تاريخ نهاية الإجازة</p>
                            <p className="font-bold">{leave.endDate}</p>
                          </div>
                        </div>
                        
                        <div className="border-t p-4">
                          <p className="text-gray-500 mb-1">المنشأة الصحية</p>
                          <p className="font-bold">{leave.facility}</p>
                        </div>
                        
                        <div className="border-t p-4">
                          <p className="text-gray-500 mb-1">رقم الإجازة</p>
                          <p className="font-bold">{leave.leaveNumber}</p>
                        </div>
                        
                        <div className="border-t p-4 flex justify-center">
                          <Button 
                            className="bg-white text-saudi-primary border border-saudi-primary hover:bg-saudi-lighter flex items-center"
                            onClick={() => handleDownload(leave.id)}
                            disabled={isDownloading === leave.id}
                          >
                            {isDownloading === leave.id ? (
                              <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                            ) : (
                              <Download className="h-5 w-5 ml-2" />
                            )}
                            تحميل تقرير الإجازة
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default MedicalReports;
