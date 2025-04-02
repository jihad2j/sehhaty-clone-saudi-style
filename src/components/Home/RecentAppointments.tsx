
import React from "react";
import { Calendar, MapPin, Clock, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample appointment data
const appointments = [
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

const AppointmentCard = ({ appointment }: { appointment: typeof appointments[0] }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-gray-800">{appointment.doctorName}</h3>
          <p className="text-sm text-gray-500">{appointment.specialty}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          appointment.status === 'confirmed' 
          ? 'bg-saudi-lighter text-saudi-primary' 
          : 'bg-amber-100 text-amber-700'
        }`}>
          {appointment.status === 'confirmed' ? 'مؤكد' : 'قيد الانتظار'}
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 ml-2 text-gray-400" />
          <span>{appointment.hospital}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 ml-2 text-gray-400" />
          <span>{appointment.date}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 ml-2 text-gray-400" />
          <span>{appointment.time}</span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <Button variant="outline" size="sm" className="text-sm">
          إلغاء
        </Button>
        <Button size="sm" className="bg-saudi-primary text-white hover:bg-saudi-dark text-sm">
          تعديل
        </Button>
      </div>
    </div>
  );
};

const RecentAppointments = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">المواعيد القادمة</h2>
        <Link to="/appointments" className="flex items-center text-saudi-primary text-sm font-medium">
          عرض الكل
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </div>
      
      {appointments.length > 0 ? (
        <div>
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">لا توجد مواعيد قادمة</p>
          <Button className="mt-4 bg-saudi-primary hover:bg-saudi-dark">
            حجز موعد
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentAppointments;
