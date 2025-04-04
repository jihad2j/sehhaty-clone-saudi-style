
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, FileText, Download, Search, Loader2, LogIn, FilePlus, FileCheck, Calendar, Printer } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import BottomNavigation from "../components/Layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMedicalReports, downloadMedicalReport, printMedicalReport } from "@/services/medicalReportsService";
import type { SickLeave } from "@/types/medicalReports";

// Define report types
const REPORT_TYPES = {
  SICK_LEAVE: "sick_leave",
  FOLLOWUP: "followup",
  COMPANION: "companion",
  MEDICAL_REPORT: "medical_report"
};

// Icons for different report types
const ReportTypeIcons = {
  [REPORT_TYPES.SICK_LEAVE]: <FilePlus className="h-6 w-6 text-orange-400" />,
  [REPORT_TYPES.FOLLOWUP]: <FileCheck className="h-6 w-6 text-green-400" />,
  [REPORT_TYPES.COMPANION]: <Calendar className="h-6 w-6 text-purple-400" />,
  [REPORT_TYPES.MEDICAL_REPORT]: <FileText className="h-6 w-6 text-sky-400" />
};

// Function to determine report type
const determineReportType = (report: SickLeave): string => {
  const title = report.title?.toLowerCase() || '';
  
  if (title.includes('مرافق') || report.inputCompanionNameAr) {
    return REPORT_TYPES.COMPANION;
  } else if (title.includes('مراجعة') || title.includes('followup')) {
    return REPORT_TYPES.FOLLOWUP;
  } else if (title.includes('تقرير طبي') || title.includes('medical report')) {
    return REPORT_TYPES.MEDICAL_REPORT;
  } else {
    return REPORT_TYPES.SICK_LEAVE; // Default
  }
};

const MedicalReports = () => {
  const [nationalId, setNationalId] = useState<string>("");
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);
  const [selectedLeave, setSelectedLeave] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState<string | null>(null);
  const [reportTypeFilter, setReportTypeFilter] = useState<string | "all">("all");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get the national ID from session storage (set during login)
    const storedNationalId = sessionStorage.getItem("nationalId");
    if (storedNationalId) {
      setNationalId(storedNationalId);
      setSearchTriggered(true);
    }
  }, []);
  
  const { data: reportsData, isLoading, isError, error, refetch } = useQuery({
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
      const response = await printMedicalReport(reportId);
      if (response.success) {
        // Open the print URL in a new window
        window.open(response.printUrl, '_blank');
        toast.success("تم فتح التقرير للطباعة");
      } else {
        toast.error(response.message || "حدث خطأ أثناء طباعة التقرير");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء طباعة التقرير");
      console.error(error);
    } finally {
      setIsPrinting(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("nationalId");
    navigate("/login");
  };
  
  // Format report for display
  const formatReportData = (report: SickLeave) => {
    const reportType = determineReportType(report);
    let title = '';
    
    switch(reportType) {
      case REPORT_TYPES.COMPANION:
        title = report.title || `مشهد مرافقة (${report.inputdaynum || report.period || "غير محدد"})`;
        break;
      case REPORT_TYPES.FOLLOWUP:
        title = report.title || `مشهد مراجعة (${report.inputdaynum || report.period || "غير محدد"})`;
        break;
      case REPORT_TYPES.MEDICAL_REPORT:
        title = report.title || `تقرير طبي (${report.inputdaynum || report.period || "غير محدد"})`;
        break;
      default:
        title = report.title || `إجازة مرضية (${report.inputdaynum || report.period || "غير محدد"})`;
    }
    
    return {
      id: report._id || report.id || "",
      title: title,
      period: report.period || report.inputdaynum || "غير محدد",
      issueDate: report.issueDate || report.inputdatemin || "غير محدد",
      startDate: report.startDate || report.inputdatefrom || "غير محدد",
      endDate: report.endDate || report.inputdateto || "غير محدد",
      facility: report.facility || report.inputcentralnamear || "غير محدد",
      leaveNumber: report.leaveNumber || report.inputgsl || "غير محدد",
      reportType: reportType,
      companion: report.inputCompanionNameAr || null
    };
  };

  // Filter reports by type if a filter is selected
  const filteredReports = reportsData?.data?.filter(report => {
    if (reportTypeFilter === "all") return true;
    return determineReportType(report) === reportTypeFilter;
  });
  
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
          
          <Button
            variant="outline"
            size="sm"
            className="mr-auto"
            onClick={handleLogout}
          >
            <LogIn className="h-4 w-4 ml-2 rotate-180" />
            تسجيل الخروج
          </Button>
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
              className="bg-sky-500 hover:bg-sky-600"
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
            <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-right">تقارير الإجازات</h2>
              
              {/* Filter dropdown */}
              <Select 
                value={reportTypeFilter} 
                onValueChange={setReportTypeFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="جميع التقارير" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التقارير</SelectItem>
                  <SelectItem value={REPORT_TYPES.SICK_LEAVE}>إجازة مرضية</SelectItem>
                  <SelectItem value={REPORT_TYPES.FOLLOWUP}>مشهد مراجعة</SelectItem>
                  <SelectItem value={REPORT_TYPES.COMPANION}>مشهد مرافقة</SelectItem>
                  <SelectItem value={REPORT_TYPES.MEDICAL_REPORT}>تقرير طبي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {(!reportsData.data || reportsData.data.length === 0) ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
                <p className="text-center">لا توجد تقارير طبية متاحة لرقم الهوية المدخل.</p>
              </div>
            ) : filteredReports && filteredReports.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
                <p className="text-center">لا توجد تقارير من النوع المحدد لرقم الهوية المدخل.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReports?.map((leave) => {
                  const formattedLeave = formatReportData(leave);
                  return (
                    <div key={formattedLeave.id} className="bg-white rounded-xl overflow-hidden shadow">
                      <div 
                        className="p-4 cursor-pointer"
                        onClick={() => handleLeaveClick(formattedLeave.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <ChevronDown className={`h-6 w-6 text-sky-500 ${selectedLeave === formattedLeave.id ? 'rotate-180' : ''} transition-transform`} />
                            <div className="mr-3">
                              <h3 className="font-bold text-lg">{formattedLeave.title}</h3>
                              <p className="text-gray-500 text-sm">تاريخ الإصدار: {formattedLeave.issueDate}</p>
                              {formattedLeave.companion && (
                                <p className="text-gray-500 text-sm">المرافق: {formattedLeave.companion}</p>
                              )}
                            </div>
                          </div>
                          {ReportTypeIcons[formattedLeave.reportType] || <FileText className="h-6 w-6 text-gray-400" />}
                        </div>
                      </div>
                      
                      {selectedLeave === formattedLeave.id && (
                        <div className="border-t">
                          <div className="grid grid-cols-2 divide-x divide-x-reverse divide-gray-200">
                            <div className="p-4 text-center">
                              <p className="text-gray-500 mb-1">تاريخ بداية الإجازة</p>
                              <p className="font-bold">{formattedLeave.startDate}</p>
                            </div>
                            <div className="p-4 text-center">
                              <p className="text-gray-500 mb-1">تاريخ نهاية الإجازة</p>
                              <p className="font-bold">{formattedLeave.endDate}</p>
                            </div>
                          </div>
                          
                          <div className="border-t p-4">
                            <p className="text-gray-500 mb-1">المنشأة الصحية</p>
                            <p className="font-bold">{formattedLeave.facility}</p>
                          </div>
                          
                          <div className="border-t p-4">
                            <p className="text-gray-500 mb-1">رقم الإجازة</p>
                            <p className="font-bold">{formattedLeave.leaveNumber}</p>
                          </div>
                          
                          <div className="border-t p-4 flex justify-center gap-3">
                            <Button 
                              className="bg-white text-sky-500 border border-sky-500 hover:bg-sky-50 flex items-center"
                              onClick={() => handleDownload(formattedLeave.id)}
                              disabled={isDownloading === formattedLeave.id || isPrinting === formattedLeave.id}
                            >
                              {isDownloading === formattedLeave.id ? (
                                <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                              ) : (
                                <Download className="h-5 w-5 ml-2" />
                              )}
                              تحميل التقرير
                            </Button>
                            
                            <Button 
                              className="bg-sky-500 text-white hover:bg-sky-600 flex items-center"
                              onClick={() => handlePrint(formattedLeave.id)}
                              disabled={isDownloading === formattedLeave.id || isPrinting === formattedLeave.id}
                            >
                              {isPrinting === formattedLeave.id ? (
                                <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                              ) : (
                                <Printer className="h-5 w-5 ml-2" />
                              )}
                              طباعة التقرير
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
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
