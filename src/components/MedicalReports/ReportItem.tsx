
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus, FileCheck, Calendar, Download, Loader2, Share2 } from "lucide-react";
import { 
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { REPORT_TYPES } from "./ReportTypeFilter";

// Icons for different report types
const ReportTypeIcons = {
  [REPORT_TYPES.SICK_LEAVE]: <FilePlus className="h-6 w-6 text-blue-400" />,
  [REPORT_TYPES.FOLLOWUP]: <FileCheck className="h-6 w-6 text-green-400" />,
  [REPORT_TYPES.COMPANION]: <Calendar className="h-6 w-6 text-purple-400" />,
  [REPORT_TYPES.MEDICAL_REPORT]: <FileText className="h-6 w-6 text-sky-400" />
};

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
  reportTypeRaw: string; // Raw value of input_sickleave_type
  companion?: string | null;
  doctor: string;
}

interface ReportItemProps {
  report: FormattedLeave;
  isDownloading: string | null;
  isPrinting: string | null;
  isSharing: string | null;
  onDownload: (id: string, reportType: string) => void;
  onShare: (id: string, reportType: string) => void;
}

const ReportItem: React.FC<ReportItemProps> = ({
  report,
  isDownloading,
  isPrinting,
  isSharing,
  onDownload,
  onShare
}) => {
  return (
    <AccordionItem key={report.id} value={report.id} className="bg-white rounded-xl overflow-hidden shadow border-none mb-4">
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <div>
              <h3 className="font-bold text-lg text-gray-800 text-right">{report.title}</h3>
              <p className="text-gray-500 text-sm text-right">تاريخ الإصدار: {report.issueDate}</p>
            </div>
          </div>
          <div>
            {ReportTypeIcons[report.reportType] || <FileText className="h-6 w-6 text-gray-400" />}
          </div>
        </div>
      </AccordionTrigger>
      
      <div className="border-t border-gray-200">
        <div className="grid grid-cols-2 divide-x divide-x-reverse">
          <div className="p-3 text-center">
            <p className="text-gray-500 text-sm mb-1">تاريخ بداية الإجازة</p>
            <p className="font-bold text-gray-800">{report.startDate}</p>
          </div>
          <div className="p-3 text-center">
            <p className="text-gray-500 text-sm mb-1">تاريخ نهاية الإجازة</p>
            <p className="font-bold text-gray-800">{report.endDate}</p>
          </div>
        </div>
      </div>
      
      <AccordionContent className="pb-0">
        <div className="border-t p-4">
          <p className="text-gray-500 mb-1">نوع الإجازة</p>
          <p className="font-bold text-gray-800">{report.reportType}</p>
        </div>
        
        <div className="border-t p-4">
          <p className="text-gray-500 mb-1">المنشأة الصحية</p>
          <p className="font-bold text-gray-800">{report.facility}</p>
        </div>
        
        <div className="border-t p-4">
          <p className="text-gray-500 mb-1">رقم الإجازة</p>
          <p className="font-bold text-gray-800">{report.leaveNumber}</p>
        </div>
        
        <div className="border-t p-4">
          <p className="text-gray-500 mb-1">اسم الطبيب</p>
          <p className="font-bold text-gray-800">{report.doctor}</p>
        </div>
        
        <div className="border-t p-4 flex justify-center gap-3">
          <Button 
            className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 flex-1 flex items-center justify-center"
            onClick={() => onDownload(report.id, report.reportTypeRaw)}
            disabled={isDownloading === report.id || isPrinting === report.id || isSharing === report.id}
          >
            {isDownloading === report.id ? (
              <Loader2 className="h-5 w-5 ml-2 animate-spin" />
            ) : (
              <Download className="h-5 w-5 ml-2" />
            )}
            تحميل
          </Button>
          
          <Button 
            className="bg-blue-600 text-white hover:bg-blue-700 flex-1 flex items-center justify-center"
            onClick={() => onShare(report.id, report.reportTypeRaw)}
            disabled={isDownloading === report.id || isPrinting === report.id || isSharing === report.id}
          >
            {isSharing === report.id ? (
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
};

export default ReportItem;
