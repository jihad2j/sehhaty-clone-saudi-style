
import React from "react";
import { ChevronRight, Shield, FileCheck, Syringe, AlertCircle, QrCode, Info } from "lucide-react";
import Header from "../components/Layout/Header";
import BottomNavigation from "../components/Layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  path 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  path: string;
}) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-5">
        <div className="flex items-center mb-4">
          <div className="rounded-full p-3 mr-4 bg-saudi-lighter">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <Button className="w-full bg-saudi-primary hover:bg-saudi-dark" onClick={() => window.location.href = path}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

const Covid = () => {
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
          <h1 className="text-xl font-bold">خدمات كوفيد-١٩</h1>
        </div>
        
        <Alert className="mb-6 bg-saudi-lighter border-saudi-light">
          <Info className="h-4 w-4 text-saudi-primary" />
          <AlertTitle className="text-saudi-primary">تحديث هام</AlertTitle>
          <AlertDescription>
            تم تحديث إجراءات السفر وشهادات التطعيم. يرجى الاطلاع على آخر المستجدات.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-5">
          <ServiceCard
            icon={<QrCode className="h-6 w-6 text-saudi-primary" />}
            title="توكلنا"
            description="عرض حالة التحصين وشهادة التطعيم الرسمية"
            buttonText="عرض الشهادة"
            path="/covid/certificate"
          />
          
          <ServiceCard
            icon={<Syringe className="h-6 w-6 text-saudi-primary" />}
            title="حجز موعد التطعيم"
            description="حجز أو تعديل موعد للحصول على لقاح كوفيد-١٩"
            buttonText="حجز موعد"
            path="/covid/vaccination"
          />
          
          <ServiceCard
            icon={<FileCheck className="h-6 w-6 text-saudi-primary" />}
            title="نتائج الفحص"
            description="الاطلاع على نتائج فحص كوفيد-١٩"
            buttonText="عرض النتائج"
            path="/covid/test-results"
          />
          
          <ServiceCard
            icon={<Shield className="h-6 w-6 text-saudi-primary" />}
            title="الإبلاغ عن الأعراض"
            description="الإبلاغ عن أعراض كوفيد-١٩ وتقييم الحالة"
            buttonText="إبلاغ"
            path="/covid/report"
          />
          
          <ServiceCard
            icon={<AlertCircle className="h-6 w-6 text-saudi-primary" />}
            title="المخالطين"
            description="الإبلاغ عن مخالطة شخص مصاب بكوفيد-١٩"
            buttonText="إبلاغ عن مخالطة"
            path="/covid/contact"
          />
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Covid;
