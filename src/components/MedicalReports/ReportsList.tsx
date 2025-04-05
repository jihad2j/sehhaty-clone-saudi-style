
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import ReportItem from "./ReportItem";
import { SickLeave } from "@/types/medicalReports";
import { REPORT_TYPES } from "./ReportTypeFilter";

interface FormattedLeave {
  id: string;
  title: string;
  period: string;
  issueDate: string;
  startDate: string;
  endDate: string;
  facility: string;
  leaveNumber: string;
  reportType: string;
  companion?: string | null;
  doctor: string;
}

interface ReportsListProps {
  isLoading: boolean;
  isError: boolean;
  filteredReports?: SickLeave[];
  isDownloading: string | null;
  isPrinting: string | null;
  isSharing: string | null;
  onDownload: (id: string) => void;
  onShare: (id: string) => void;
}

const ReportsList: React.FC<ReportsListProps> = ({
  isLoading,
  isError,
  filteredReports,
  isDownloading,
  isPrinting,
  isSharing,
  onDownload,
  onShare
}) => {
  // Determine report type based on title or input_sickleave_type
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

  // Format report for display
  const formatReportData = (report: SickLeave): FormattedLeave => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="mr-3 text-lg">جاري تحميل البيانات...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <p className="text-center">حدث خطأ أثناء تحميل البيانات. الرجاء المحاولة مرة أخرى.</p>
      </div>
    );
  }

  if (!filteredReports || filteredReports.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
        <p className="text-center">لا توجد تقارير طبية متاحة لرقم الهوية المدخل.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {filteredReports.map((report) => {
          const formattedReport = formatReportData(report);
          return (
            <ReportItem
              key={formattedReport.id}
              report={formattedReport}
              isDownloading={isDownloading}
              isPrinting={isPrinting}
              isSharing={isSharing}
              onDownload={onDownload}
              onShare={onShare}
            />
          );
        })}
      </Accordion>
    </div>
  );
};

export default ReportsList;
