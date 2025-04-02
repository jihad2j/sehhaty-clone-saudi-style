
import React, { useState } from "react";
import { Calendar, ChevronRight, Search, Filter } from "lucide-react";
import Header from "../components/Layout/Header";
import BottomNavigation from "../components/Layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Sample appointments data
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "د. محمد العمري",
      specialty: "طب عام",
      hospital: "مستشفى الملك فهد",
      date: "٢٢ أبريل ٢٠٢٣",
      time: "٠٩:٣٠ ص",
      status: "confirmed",
    },
    {
      id: 2,
      doctorName: "د. سارة الأحمد",
      specialty: "طب أسنان",
      hospital: "مستشفى الملك خالد",
      date: "٢٤ أبريل ٢٠٢٣",
      time: "١١:٠٠ ص",
      status: "pending",
    },
  ];
  
  const pastAppointments = [
    {
      id: 3,
      doctorName: "د. أحمد الشمري",
      specialty: "أمراض باطنية",
      hospital: "مستشفى الملك فيصل التخصصي",
      date: "١٠ مارس ٢٠٢٣",
      time: "١٠:١٥ ص",
      status: "completed",
    },
    {
      id: 4,
      doctorName: "د. نورة السعيد",
      specialty: "جلدية",
      hospital: "مجمع الأمل الطبي",
      date: "٥ فبراير ٢٠٢٣",
      time: "٠٢:٠٠ م",
      status: "completed",
    },
  ];
  
  const AppointmentCard = ({ appointment, isPast = false }: { appointment: any, isPast?: boolean }) => {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold text-gray-800">{appointment.doctorName}</h3>
            <p className="text-sm text-gray-500">{appointment.specialty}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isPast
              ? 'bg-gray-100 text-gray-600'
              : appointment.status === 'confirmed'
                ? 'bg-saudi-lighter text-saudi-primary'
                : 'bg-amber-100 text-amber-700'
          }`}>
            {isPast
              ? 'مكتمل'
              : appointment.status === 'confirmed'
                ? 'مؤكد'
                : 'قيد الانتظار'}
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 ml-2 text-gray-400" />
            <span>{appointment.date} • {appointment.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <span>{appointment.hospital}</span>
          </div>
        </div>
        
        {!isPast && (
          <div className="mt-4 flex justify-between">
            <Button variant="outline" size="sm" className="text-sm">
              إلغاء
            </Button>
            <Button size="sm" className="bg-saudi-primary hover:bg-saudi-dark text-sm">
              تعديل
            </Button>
          </div>
        )}
        
        {isPast && (
          <div className="mt-4">
            <Button variant="outline" size="sm" className="text-sm w-full">
              عرض التفاصيل
            </Button>
          </div>
        )}
      </div>
    );
  };

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
          <h1 className="text-xl font-bold">المواعيد الطبية</h1>
        </div>
        
        <div className="flex mb-4 space-x-2 space-x-reverse">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث عن موعد..."
              className="pl-3 pr-10"
            />
          </div>
          
          <Button variant="outline" className="p-2">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">المواعيد القادمة</TabsTrigger>
            <TabsTrigger value="past">المواعيد السابقة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="animate-fade-in">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">لا توجد مواعيد قادمة</p>
              </div>
            )}
            
            <Button className="mt-4 w-full bg-saudi-primary hover:bg-saudi-dark">
              حجز موعد جديد
            </Button>
          </TabsContent>
          
          <TabsContent value="past" className="animate-fade-in">
            {pastAppointments.length > 0 ? (
              pastAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} isPast={true} />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">لا توجد مواعيد سابقة</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Appointments;
