
import { MedicalReportsApiResponse, MedicalReportDownloadResponse } from "../types/medicalReports";

// Mock API functions - replace with actual API calls in production
export const getMedicalReports = async (nationalId: string): Promise<MedicalReportsApiResponse> => {
  // For demo purposes, we'll simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!nationalId || nationalId.length < 5) {
        resolve({
          success: false,
          data: [],
          message: "رقم الهوية غير صالح"
        });
      } else {
        resolve({
          success: true,
          data: [
            {
              id: "1",
              title: "إجازة مرضية (يوم واحد)",
              period: "يوم واحد",
              issueDate: "٢٠٢٣-٠٨-٢٢",
              startDate: "٢٠٢٣-٠٨-٢٢",
              endDate: "٢٠٢٣-٠٨-٢٢",
              facility: "مجمع الملحم الطبي",
              leaveNumber: "٤٥٦٧٨٩"
            },
            {
              id: "2",
              title: "إجازة مرضية (يوم واحد)",
              period: "يوم واحد",
              issueDate: "٢٠٢٢-١١-٠٣",
              startDate: "٢٠٢٢-١١-٠٣",
              endDate: "٢٠٢٢-١١-٠٣",
              facility: "مستشفى الملك فهد",
              leaveNumber: "٣٤٥٦٧٨"
            },
            {
              id: "3",
              title: "إجازة مرضية (يومين)",
              period: "يومين",
              issueDate: "٢٠٢٢-٠٩-١٥",
              startDate: "٢٠٢٢-٠٩-١٥",
              endDate: "٢٠٢٢-٠٩-١٦",
              facility: "مستشفى الملك خالد",
              leaveNumber: "٢٣٤٥٦٧"
            },
            {
              id: "4",
              title: "إجازة مرضية (٣ أيام)",
              period: "٣ أيام",
              issueDate: "٢٠٢٢-٠٧-١٠",
              startDate: "٢٠٢٢-٠٧-١٠",
              endDate: "٢٠٢٢-٠٧-١٢",
              facility: "مستشفى القوات المسلحة",
              leaveNumber: "١٣٥٧٩١"
            },
          ]
        });
      }
    }, 800);
  });
};

export const downloadMedicalReport = async (reportId: string): Promise<MedicalReportDownloadResponse> => {
  // Simulate API call for downloading a report
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        fileUrl: `https://example.com/api/reports/download/${reportId}`,
        message: "تم تحميل التقرير بنجاح"
      });
    }, 1000);
  });
};
