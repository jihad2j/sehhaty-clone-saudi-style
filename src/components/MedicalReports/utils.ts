
import { SickLeave } from "@/types/medicalReports";
import { REPORT_TYPES } from "./ReportTypeFilter";

// Map input_sickleave_type to API endpoint path
export const REPORT_TYPE_ENDPOINTS = {
  "sickleave": "model_sikleaves_n/sickleavecreate",
  "sickleavecompanion": "model_sikleaves_comp/sickleavecreate",
  "visitleave": "model_sikleaves_visit/sickleavecreate",
  "visitcompamion": "model_sikleaves_comp_visit/sickleavecreate",
  "medicalreport": "model_report/medicalreportcreate"
};

// Map input_sickleave_type to display name
export const REPORT_TYPE_NAMES = {
  "sickleave": "إجازة مرضية",
  "sickleavecompanion": "تقرير مرافق مريض",
  "visitleave": "مشهد مراجعة",
  "visitcompamion": "مشهد مراجعة لمرافق",
  "medicalreport": "تقرير طبي"
};

export const determineReportType = (report: SickLeave): string => {
  if (report.input_sickleave_type) {
    return getReportTypeName(report.input_sickleave_type);
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

export const getReportTypeName = (input_sickleave_type: string): string => {
  return REPORT_TYPE_NAMES[input_sickleave_type as keyof typeof REPORT_TYPE_NAMES] || input_sickleave_type;
};

export const getEndpointForReportType = (input_sickleave_type: string): string => {
  return REPORT_TYPE_ENDPOINTS[input_sickleave_type as keyof typeof REPORT_TYPE_ENDPOINTS] || "model_sikleaves_n/sickleavecreate";
};

// Environment variable fallback
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://www.sohatey.info";
