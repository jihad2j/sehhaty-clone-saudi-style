
import React, { useState } from "react";
import { ChevronDown, ChevronRight, ChevronLeft, FileText, Download } from "lucide-react";
import Header from "../components/Layout/Header";
import BottomNavigation from "../components/Layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SickLeave {
  id: string;
  title: string;
  period: string;
  issueDate: string;
  startDate: string;
  endDate: string;
  facility?: string;
  leaveNumber?: string;
  expanded?: boolean;
}

const MedicalReports = () => {
  const [selectedLeave, setSelectedLeave] = useState<string | null>(null);
  
  const sickLeaves: SickLeave[] = [
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
      title: "إجازة مرضية (يوم واحد)",
      period: "يوم واحد",
      issueDate: "٢٠٢٢-٠٩-١٥",
      startDate: "٢٠٢٢-٠٩-١٥",
      endDate: "٢٠٢٢-٠٩-١٥",
      facility: "مستشفى الملك خالد",
      leaveNumber: "٢٣٤٥٦٧"
    },
  ];
  
  const handleLeaveClick = (leaveId: string) => {
    setSelectedLeave(selectedLeave === leaveId ? null : leaveId);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={() => window.history.back()}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">التقارير الطبية</h1>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-right mb-4">تقارير الإجازات</h2>
          
          <div className="space-y-4">
            {sickLeaves.map((leave) => (
              <div key={leave.id} className="bg-white rounded-xl overflow-hidden shadow">
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => handleLeaveClick(leave.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {selectedLeave === leave.id ? 
                        <ChevronDown className="h-6 w-6 text-blue-600" /> : 
                        <ChevronDown className="h-6 w-6 text-blue-600" />
                      }
                      <div className="mr-3">
                        <h3 className="font-bold text-lg">{leave.title}</h3>
                        <p className="text-gray-500 text-sm">تاريخ الإصدار: {leave.issueDate}</p>
                      </div>
                    </div>
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                
                {selectedLeave === leave.id && (
                  <div className="border-t">
                    <div className="grid grid-cols-2 divide-x divide-x-reverse divide-gray-200">
                      <div className="p-4 text-center">
                        <p className="text-gray-500 mb-1">تاريخ بداية الإجازة</p>
                        <p className="font-bold">{leave.startDate}</p>
                      </div>
                      <div className="p-4 text-center">
                        <p className="text-gray-500 mb-1">تاريخ نهاية الإجازة</p>
                        <p className="font-bold">{leave.endDate}</p>
                      </div>
                    </div>
                    
                    <div className="border-t p-4">
                      <p className="text-gray-500 mb-1">المنشأة الصحية</p>
                      <p className="font-bold">{leave.facility}</p>
                    </div>
                    
                    <div className="border-t p-4">
                      <p className="text-gray-500 mb-1">رقم الإجازة</p>
                      <p className="font-bold">{leave.leaveNumber}</p>
                    </div>
                    
                    <div className="border-t p-4 flex justify-center">
                      <Button className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 flex items-center">
                        <Download className="h-5 w-5 ml-2" />
                        تحميل تقرير الإجازة
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default MedicalReports;
