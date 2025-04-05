
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define report types
export const REPORT_TYPES = {
  SICK_LEAVE: "إجازة مرضية",
  FOLLOWUP: "مشهد مراجعة",
  COMPANION: "مشهد مرافقة",
  MEDICAL_REPORT: "تقرير طبي"
};

interface ReportTypeFilterProps {
  reportTypeFilter: string | "all";
  setReportTypeFilter: (value: string | "all") => void;
}

const ReportTypeFilter: React.FC<ReportTypeFilterProps> = ({
  reportTypeFilter,
  setReportTypeFilter,
}) => {
  return (
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
  );
};

export default ReportTypeFilter;
