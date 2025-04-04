
export interface SickLeave {
  id: string;
  title: string;
  period: string;
  issueDate: string;
  startDate: string;
  endDate: string;
  facility: string;
  leaveNumber: string;
}

export interface MedicalReportsApiResponse {
  success: boolean;
  data: SickLeave[];
  message?: string;
}

export interface MedicalReportDownloadResponse {
  success: boolean;
  fileUrl?: string;
  message?: string;
}
