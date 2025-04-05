
import { SickLeave } from "@/types/medicalReports";
import { REPORT_TYPES } from "./ReportTypeFilter";

export const determineReportType = (report: SickLeave): string => {
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
