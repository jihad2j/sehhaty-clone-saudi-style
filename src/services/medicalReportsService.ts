
import { MedicalReportsApiResponse, MedicalReportDownloadResponse } from "../types/medicalReports";

// API functions
export const getMedicalReports = async (nationalId: string): Promise<MedicalReportsApiResponse> => {
  if (!nationalId || nationalId.length < 5) {
    return {
      success: false,
      data: [],
      message: "رقم الهوية غير صالح"
    };
  }

  try {
    // Use the provided API endpoint
    // For development, we'll handle the error case and use mock data
    // In production, replace the try/catch with actual API call
    
    // For demo purposes:
    try {
      const response = await fetch(`http://127.0.0.1:3501/manger_data/findgsl/${nationalId}`);
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error("Error fetching from actual API:", error);
      console.log("Using mock data instead");
      
      // Mock data in case the API is not available during development
      return {
        success: true,
        data: [
          {
            id: "1",
            _id: "67cd8deb850d6202a27e3f7b",
            title: "إجازة مرضية (15 يوم)",
            period: "15 يوم",
            issueDate: "٢٠٢٥-٠٣-٠٥",
            startDate: "٢٠٢٥-٠٣-٠٥", 
            endDate: "٢٠٢٥-٠٣-١٩",
            facility: "شرككة اسلم مرشود الرحيلي الطببي للطبي العام",
            leaveNumber: "PSL25031919115",
            inputgsl: "PSL25031919115",
            inputindurationh: "51 يوم )6441-90-50 الى 6441-90-91 ( ",
            inputdurationm: "15 days ( 05-03-2025 to 19-03-2025 )",
            inputdatefrom: "2025-03-05",
            inputdateto: "2025-03-19",
            inputidentity: "1054568758",
            inputcentralnamear: "شرككة اسلم مرشود الرحيلي الطببي للطبي العام"
          },
          {
            id: "2",
            _id: "67cd8deb850d6202a27e3f79",
            title: "إجازة مرضية (يوم واحد)",
            period: "يوم واحد",
            issueDate: "٢٠٢٣-٠٨-٢٢",
            startDate: "٢٠٢٣-٠٨-٢٢",
            endDate: "٢٠٢٣-٠٨-٢٢",
            facility: "مجمع الملحم الطبي",
            leaveNumber: "٤٥٦٧٨٩",
            inputidentity: "1054568758"
          }
        ]
      };
    }
  } catch (error) {
    console.error("Error in getMedicalReports:", error);
    return {
      success: false,
      data: [],
      message: "حدث خطأ أثناء جلب البيانات"
    };
  }
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
