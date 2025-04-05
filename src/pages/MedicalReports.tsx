
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Header from "../components/Layout/Header";
import BottomNavigation from "../components/Layout/BottomNavigation";
import ReportSearchForm from "@/components/MedicalReports/ReportSearchForm";
import ReportTypeFilter from "@/components/MedicalReports/ReportTypeFilter";
import ReportsList from "@/components/MedicalReports/ReportsList";
import { getMedicalReports, downloadMedicalReport, printMedicalReport, shareMedicalReport } from "@/services/medicalReportsService";

const MedicalReports = () => {
  const [nationalId, setNationalId] = useState<string>("");
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState<string | null>(null);
  const [reportTypeFilter, setReportTypeFilter] = useState<string | "all">("all");
  
  useEffect(() => {
    // Get the national ID from session storage (set during login)
    const storedNationalId = sessionStorage.getItem("nationalId");
    if (storedNationalId) {
      setNationalId(storedNationalId);
      setSearchTriggered(true);
    }
  }, []);
  
  const { data: reportsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['medicalReports', nationalId],
    queryFn: () => getMedicalReports(nationalId),
    enabled: searchTriggered && nationalId.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const handleSearch = () => {
    if (nationalId.trim().length < 5) {
      toast.error("الرجاء إدخال رقم هوية صالح");
      return;
    }
    
    setSearchTriggered(true);
    refetch();
  };
  
  const handleDownload = async (reportId: string) => {
    setIsDownloading(reportId);
    try {
      const response = await downloadMedicalReport(reportId);
      if (response.success && response.fileUrl) {
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

  const handlePrint = async (reportId: string) => {
    setIsPrinting(reportId);
    try {
      // Open the print URL in a new window
      const printUrl = `https://www.sohatey.info/model_sikleaves_n/sickleavecreate/${reportId}`;
      window.open(printUrl, '_blank');
      toast.success("تم فتح التقرير للطباعة");
    } catch (error) {
      toast.error("حدث خطأ أثناء طباعة التقرير");
      console.error(error);
    } finally {
      setIsPrinting(null);
    }
  };

  const handleShare = async (reportId: string) => {
    setIsSharing(reportId);
    try {
      const success = await shareMedicalReport(reportId);
      if (success) {
        toast.success("تم مشاركة التقرير بنجاح");
      } else {
        toast.info("تم نسخ رابط التقرير إلى الحافظة");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء مشاركة التقرير");
      console.error(error);
    } finally {
      setIsSharing(null);
    }
  };
  
  // Filter reports by type if a filter is selected
  const filteredReports = reportsData?.data?.filter(report => {
    if (reportTypeFilter === "all") return true;
    
    const reportType = report.input_sickleave_type || 
      (report.title?.toLowerCase().includes('مرافق') || report.inputCompanionNameAr ? "مشهد مرافقة" :
       report.title?.toLowerCase().includes('مراجعة') ? "مشهد مراجعة" :
       report.title?.toLowerCase().includes('تقرير طبي') ? "تقرير طبي" : "إجازة مرضية");
       
    return reportType === reportTypeFilter;
  });
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">التقارير الطبية</h1>
        </div>
        
        {/* National ID input */}
        <ReportSearchForm 
          nationalId={nationalId}
          setNationalId={setNationalId}
          handleSearch={handleSearch}
          isLoading={isLoading}
        />
        
        {searchTriggered && reportsData && !isLoading && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-right text-gray-800">تقارير الإجازات</h2>
              
              {/* Filter dropdown */}
              <ReportTypeFilter 
                reportTypeFilter={reportTypeFilter}
                setReportTypeFilter={setReportTypeFilter}
              />
            </div>
            
            <ReportsList 
              isLoading={isLoading}
              isError={isError}
              filteredReports={filteredReports}
              isDownloading={isDownloading}
              isPrinting={isPrinting}
              isSharing={isSharing}
              onDownload={handleDownload}
              onShare={handleShare}
            />
          </div>
        )}

        {/* Show loading state when not in the results view */}
        {isLoading && !searchTriggered && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="mr-3 text-lg">جاري تحميل البيانات...</span>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default MedicalReports;
