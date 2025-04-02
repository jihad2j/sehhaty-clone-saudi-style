
import React from "react";
import { ChevronRight, FilePlus, Search, FileText, FileBadge, Download } from "lucide-react";
import Header from "../components/Layout/Header";
import BottomNavigation from "../components/Layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Documents = () => {
  const documents = [
    {
      id: 1,
      title: "تقرير الفحص الطبي الشامل",
      date: "١٠ مارس ٢٠٢٣",
      doctorName: "د. أحمد الشمري",
      type: "تقرير",
      hospital: "مستشفى الملك فيصل التخصصي"
    },
    {
      id: 2,
      title: "نتائج تحليل الدم",
      date: "٢٢ فبراير ٢٠٢٣",
      doctorName: "د. محمد العمري",
      type: "مختبر",
      hospital: "مستشفى الملك فهد"
    },
    {
      id: 3,
      title: "الأشعة السينية للصدر",
      date: "٥ يناير ٢٠٢٣",
      doctorName: "د. خالد المالكي",
      type: "أشعة",
      hospital: "مستشفى الملك خالد"
    }
  ];

  const certificates = [
    {
      id: 1,
      title: "شهادة التطعيم ضد كوفيد-١٩",
      date: "١٥ أبريل ٢٠٢٢",
      authority: "وزارة الصحة"
    },
    {
      id: 2,
      title: "شهادة اللياقة البدنية",
      date: "١٣ مارس ٢٠٢٣",
      authority: "الهيئة السعودية للتخصصات الصحية"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
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
          <h1 className="text-xl font-bold">الملفات والتقارير الطبية</h1>
        </div>
        
        <div className="flex mb-4 space-x-2 space-x-reverse">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في الملفات..."
              className="pl-3 pr-10"
            />
          </div>
          
          <Button className="bg-saudi-primary hover:bg-saudi-dark">
            <FilePlus className="h-5 w-5 ml-2" />
            إضافة
          </Button>
        </div>
        
        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="certificates">الشهادات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports" className="animate-fade-in space-y-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">{doc.title}</CardTitle>
                    <div className="px-2 py-1 bg-saudi-lighter text-xs font-medium text-saudi-primary rounded-full">
                      {doc.type}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2 text-sm text-gray-600">
                  <p>{doc.hospital}</p>
                  <p>{doc.doctorName} • {doc.date}</p>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <Button variant="ghost" size="sm" className="text-gray-600 text-sm">
                    عرض التفاصيل
                  </Button>
                  <Button variant="outline" size="sm" className="text-sm">
                    <Download className="h-4 w-4 ml-1" />
                    تنزيل
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="certificates" className="animate-fade-in space-y-4">
            {certificates.map((cert) => (
              <Card key={cert.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{cert.title}</CardTitle>
                    <FileBadge className="h-5 w-5 text-saudi-primary" />
                  </div>
                </CardHeader>
                <CardContent className="pb-2 text-sm text-gray-600">
                  <p>{cert.authority} • {cert.date}</p>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <Button variant="ghost" size="sm" className="text-gray-600 text-sm">
                    عرض
                  </Button>
                  <Button variant="outline" size="sm" className="text-sm">
                    <Download className="h-4 w-4 ml-1" />
                    تنزيل
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Documents;
