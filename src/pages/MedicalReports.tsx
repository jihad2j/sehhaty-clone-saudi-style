
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, FileText, Download, Search, Loader2, FilePlus, FileCheck, Calendar, Share2 } from "lucide-react";
import { toast } from "sonner";
import Header from "../components/Layout/Header";
import BottomNavigation from "../components/Layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMedicalReports, downloadMedicalReport, printMedicalReport, shareMedicalReport } from "@/services/medicalReportsService";
import type { SickLeave } from "@/types/medicalReports";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

// Define report types
const REPORT_TYPES = {
  SICK_LEAVE: "إجازة مرضية",
  FOLLOWUP: "مشهد مراجعة",
  COMPANION: "مشهد مرافقة",
  MEDICAL_REPORT: "تقرير طبي"
};

// Icons for different report types
const ReportTypeIcons = {
  [REPORT_TYPES.SICK_LEAVE]: <FilePlus className="h-6 w-6 text-blue-400" />,
  [REPORT_TYPES.FOLLOWUP]: <FileCheck className="h-6 w-6 text-green-400" />,
  [REPORT_TYPES.COMPANION]: <Calendar className="h-6 w-6 text-purple-400" />,
  [REPORT_TYPES.MEDICAL_REPORT]: <FileText className="h-6 w-6 text-sky-400" />
};

// Function to determine report type
const determineReportType = (report: SickLeave): string => {
  if (report.input_sickleave_type) {
    return report.input_sickleave_type;
  }
  
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
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
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

  // Reset progress when no download is in progress
  useEffect(() => {
    if (!isDownloading) {
      setDownloadProgress(0);
    }
  }, [isDownloading]);
  
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
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const newProgress = prev + 20;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);
    
    try {
      toast.loading("جاري تحميل الإجازة...", { id: "download-toast" });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await downloadMedicalReport(reportId);
      
      if (response.success && response.fileUrl) {
        toast.success("تم تحميل وفتح التقرير بنجاح", { id: "download-toast" });
      } else {
        toast.error(response.message || "حدث خطأ أثناء تحميل التقرير", { id: "download-toast" });
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تحميل التقرير", { id: "download-toast" });
      console.error(error);
    } finally {
      clearInterval(interval);
      setDownloadProgress(0);
      setIsDownloading(null);
    }
  };

  const handleShare = async (reportId: string) => {
    setIsSharing(reportId);
    try {
      toast.loading("جاري تحضير المشاركة...", { id: "share-toast" });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const success = await shareMedicalReport(reportId);
      if (success) {
        toast.success("تم مشاركة التقرير بنجاح", { id: "share-toast" });
      } else {
        toast.info("تم نسخ رابط التقرير إلى الحافظة", { id: "share-toast" });
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء مشاركة التقرير", { id: "share-toast" });
      console.error(error);
    } finally {
      setIsSharing(null);
    }
  };
  
  // Format report for display
  const formatReportData = (report: SickLeave) => {
    const reportType = report.input_sickleave_type || determineReportType(report);
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
      companion: report.inputCompanionNameAr || null,
      doctor: report.inputdoctorar || "غير محدد"
    };
  };

  // Filter reports by type if a filter is selected
  const filteredReports = reportsData?.data?.filter(report => {
    if (reportTypeFilter === "all") return true;
    const reportType = report.input_sickleave_type || determineReportType(report);
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
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">أدخل رقم الهوية للبحث عن التقارير</h2>
          <div className="flex gap-3 items-center">
            <Input
              type="text"
              placeholder="رقم الهوية"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="flex-1 border-gray-300"
            />
            <Button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white"
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
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
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
              <h2 className="text-xl font-bold text-right text-gray-800">تقارير الإجازات</h2>
              
              {/* Filter dropdown */}
              <Select 
                value={reportTypeFilter} 
                onValueChange={setReportTypeFilter}
              >
                <SelectTrigger className="w-[180px] border-gray-300">
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
                <Accordion type="single" collapsible className="w-full">
                  {filteredReports?.map((leave) => {
                    const formattedLeave = formatReportData(leave);
                    return (
                      <AccordionItem key={formattedLeave.id} value={formattedLeave.id} className="bg-white rounded-xl overflow-hidden shadow border-none mb-4">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center">
                              <div>
                                <h3 className="font-bold text-lg text-gray-800 text-right">{formattedLeave.title}</h3>
                                <p className="text-gray-500 text-sm text-right mb-2">تاريخ الإصدار: {formattedLeave.issueDate}</p>
                                <div className="flex flex-col text-right">
                                  <p className="text-gray-500 text-sm">
                                    <span className="font-semibold">تاريخ البداية:</span> {formattedLeave.startDate}
                                  </p>
                                  <p className="text-gray-500 text-sm">
                                    <span className="font-semibold">تاريخ النهاية:</span> {formattedLeave.endDate}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              {ReportTypeIcons[formattedLeave.reportType] || <FileText className="h-6 w-6 text-gray-400" />}
                            </div>
                          </div>
                        </AccordionTrigger>
                        
                        <AccordionContent className="pb-0">
                          <div className="border-t p-4">
                            <p className="text-gray-500 mb-1">نوع الإجازة</p>
                            <p className="font-bold text-gray-800">{formattedLeave.reportType}</p>
                          </div>
                          
                          <div className="border-t p-4">
                            <p className="text-gray-500 mb-1">المنشأة الصحية</p>
                            <p className="font-bold text-gray-800">{formattedLeave.facility}</p>
                          </div>
                          
                          <div className="border-t p-4">
                            <p className="text-gray-500 mb-1">رقم الإجازة</p>
                            <p className="font-bold text-gray-800">{formattedLeave.leaveNumber}</p>
                          </div>
                          
                          <div className="border-t p-4">
                            <p className="text-gray-500 mb-1">اسم الطبيب</p>
                            <p className="font-bold text-gray-800">{formattedLeave.doctor}</p>
                          </div>
                          
                          {isDownloading === formattedLeave.id && (
                            <div className="border-t p-4">
                              <p className="text-gray-600 mb-2 text-center">جاري تحميل التقرير...</p>
                              <Progress value={downloadProgress} className="h-2 w-full" />
                            </div>
                          )}
                          
                          <div className="border-t p-4 flex gap-3">
                            <Button 
                              className="bg-blue-600 text-white hover:bg-blue-700 flex-1 flex items-center justify-center"
                              onClick={() => handleDownload(formattedLeave.id)}
                              disabled={isDownloading !== null || isSharing !== null}
                            >
                              {isDownloading === formattedLeave.id ? (
                                <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                              ) : (
                                <Download className="h-5 w-5 ml-2" />
                              )}
                              تحميل
                            </Button>
                            
                            <Button 
                              className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 flex-1 flex items-center justify-center"
                              onClick={() => handleShare(formattedLeave.id)}
                              disabled={isDownloading !== null || isSharing !== null}
                            >
                              {isSharing === formattedLeave.id ? (
                                <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                              ) : (
                                <Share2 className="h-5 w-5 ml-2" />
                              )}
                              مشاركة
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
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
