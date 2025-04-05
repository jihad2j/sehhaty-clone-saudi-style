import { MedicalReportsApiResponse, MedicalReportDownloadResponse, MedicalReportPrintResponse } from "../types/medicalReports";

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
            inputcentralnamear: "شرككة اسلم مرشود الرحيلي الطببي للطبي العام",
            inputdoctorar: "د. أحمد محمد",
            input_sickleave_type: "إجازة مرضية"
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
            inputidentity: "1054568758",
            inputdoctorar: "د. سعيد عبدالله",
            input_sickleave_type: "إجازة مرضية"
          },
          {
            id: "3",
            _id: "67cd8deb850d6202a27e3f7c",
            title: "مشهد مراجعة",
            period: "يوم واحد",
            issueDate: "٢٠٢٣-٠٩-١٥",
            startDate: "٢٠٢٣-٠٩-١٥",
            endDate: "٢٠٢٣-٠٩-١٥",
            facility: "مستشفى الملك فهد",
            leaveNumber: "٧٨٩١٢٣",
            inputidentity: "1054568758",
            inputdoctorar: "د. خالد العلي",
            input_sickleave_type: "مشهد مراجعة"
          },
          {
            id: "4",
            _id: "67cd8deb850d6202a27e3f7d",
            title: "مشهد مرافقة",
            period: "3 أيام",
            issueDate: "٢٠٢٣-١٠-١٠",
            startDate: "٢٠٢٣-١٠-١٠",
            endDate: "٢٠٢٣-١٠-١٢",
            facility: "مستشفى الأمير سلطان",
            leaveNumber: "٥٦٧٨٩٠",
            inputCompanionNameAr: "محمد عبدالله",
            inputidentity: "1054568758",
            inputdoctorar: "د. نورة الحمد",
            input_sickleave_type: "مشهد مرافقة"
          },
          {
            id: "5",
            _id: "67cd8deb850d6202a27e3f7e",
            title: "تقرير طبي",
            period: "تقرير",
            issueDate: "٢٠٢٣-١١-٢٠",
            startDate: "٢٠٢٣-١١-٢٠",
            endDate: "٢٠٢٣-١١-٢٠",
            facility: "المركز الطبي الدولي",
            leaveNumber: "٣٤٥٦٧٨",
            inputidentity: "1054568758",
            inputdoctorar: "د. فهد العنزي",
            input_sickleave_type: "تقرير طبي"
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
  try {
    // Get the URL for the PDF file
    const pdfUrl = `https://www.sohatey.info/model_sikleaves_n/sickleavecreate/${reportId}`;
    
    // Open the PDF in a new tab directly
    window.open(pdfUrl, '_blank');
    
    return {
      success: true,
      fileUrl: pdfUrl,
      message: "تم تحميل التقرير بنجاح"
    };
  } catch (error) {
    console.error("Error downloading report:", error);
    return {
      success: false,
      message: "حدث خطأ أثناء تحميل التقرير"
    };
  }
};

export const printMedicalReport = async (reportId: string): Promise<MedicalReportPrintResponse> => {
  // Direct URL to print the report using the provided API
  const printUrl = `https://www.sohatey.info/model_sikleaves_n/sickleavecreate/${reportId}`;
  
  return {
    success: true,
    printUrl,
    message: "تم تحضير التقرير للطباعة"
  };
};

export const shareMedicalReport = async (reportId: string): Promise<boolean> => {
  try {
    const fileUrl = `https://www.sohatey.info/model_sikleaves_n/sickleavecreate/${reportId}`;
    
    if (navigator.share) {
      await navigator.share({
        title: 'تقرير إجازة مرضية',
        text: 'مشاركة تقرير الإجازة المرضية',
        url: fileUrl,
      });
      return true;
    } else {
      // Fallback for browsers that don't support Web Share API
      const textArea = document.createElement('textarea');
      textArea.value = fileUrl;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  } catch (error) {
    console.error('Error sharing report:', error);
    return false;
  }
};
