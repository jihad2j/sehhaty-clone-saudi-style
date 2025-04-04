
import { SickLeave } from "../types/medicalReports";

export interface ProfileData {
  personalInfo?: {
    fullName?: string;
    nameAr?: string;
    nameEn?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    nationalId?: string;
    address?: string;
  };
  healthInfo?: {
    bloodType?: string;
    allergies?: string;
  };
}

export const getProfileData = async (nationalId: string): Promise<ProfileData> => {
  try {
    const response = await fetch(`http://127.0.0.1:3501/manger_data/findgsl/${nationalId}`);
    if (!response.ok) {
      throw new Error("API request failed");
    }
    
    const data: SickLeave[] = await response.json();
    
    // Extract profile info from the first sick leave record
    if (data && data.length > 0) {
      const firstRecord = data[0];
      
      return {
        personalInfo: {
          fullName: firstRecord.inputnamear || "عبدالله محمد العتيبي",
          nameAr: firstRecord.inputnamear,
          nameEn: firstRecord.inputnameen,
          email: "abdullah@example.com", // Default as it's not in API
          phone: "05xxxxxxxx", // Default as it's not in API
          birthDate: "15/07/1985", // Default as it's not in API
          nationalId: firstRecord.inputidentity,
          address: `${firstRecord.inputnationalityar || "المملكة العربية السعودية"}`,
        },
        healthInfo: {
          bloodType: "O+", // Default as it's not in API
          allergies: "لا يوجد" // Default as it's not in API
        }
      };
    }
    
    // Return default data if no data from API
    return {
      personalInfo: {
        fullName: "عبدالله محمد العتيبي",
        email: "abdullah@example.com",
        phone: "05xxxxxxxx",
        birthDate: "15/07/1985",
        nationalId: "104xxxxxxx",
        address: "الرياض، المملكة العربية السعودية",
      },
      healthInfo: {
        bloodType: "O+",
        allergies: "لا يوجد"
      }
    };
  } catch (error) {
    console.error("Error fetching profile data:", error);
    // Return default data in case of error
    return {
      personalInfo: {
        fullName: "عبدالله محمد العتيبي",
        email: "abdullah@example.com",
        phone: "05xxxxxxxx",
        birthDate: "15/07/1985",
        nationalId: "104xxxxxxx",
        address: "الرياض، المملكة العربية السعودية",
      },
      healthInfo: {
        bloodType: "O+",
        allergies: "لا يوجد"
      }
    };
  }
};
