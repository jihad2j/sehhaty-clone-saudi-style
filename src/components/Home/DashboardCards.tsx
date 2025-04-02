
import React from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Syringe, 
  FileText, 
  User, 
  HeartPulse, 
  Pill, 
  Stethoscope,
  BadgeCheck
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, path, color }) => {
  return (
    <Link to={path}>
      <div className="service-card">
        <div className={`rounded-full p-3 mb-3 w-14 h-14 flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <h3 className="font-medium text-gray-800">{title}</h3>
      </div>
    </Link>
  );
};

const DashboardCards = () => {
  const services = [
    {
      icon: <Calendar className="h-7 w-7 text-white" />,
      title: "حجز المواعيد",
      path: "/appointments",
      color: "bg-saudi-primary",
    },
    {
      icon: <Syringe className="h-7 w-7 text-white" />,
      title: "التطعيمات",
      path: "/vaccinations",
      color: "bg-blue-500",
    },
    {
      icon: <HeartPulse className="h-7 w-7 text-white" />,
      title: "المؤشرات الصحية",
      path: "/health-metrics",
      color: "bg-red-500",
    },
    {
      icon: <FileText className="h-7 w-7 text-white" />,
      title: "التقارير الطبية",
      path: "/documents",
      color: "bg-amber-500",
    },
    {
      icon: <Stethoscope className="h-7 w-7 text-white" />,
      title: "خدمات كوفيد-19",
      path: "/covid",
      color: "bg-violet-500",
    },
    {
      icon: <User className="h-7 w-7 text-white" />,
      title: "الملف الصحي",
      path: "/profile",
      color: "bg-green-500",
    },
    {
      icon: <Pill className="h-7 w-7 text-white" />,
      title: "الأدوية",
      path: "/medications",
      color: "bg-cyan-500",
    },
    {
      icon: <BadgeCheck className="h-7 w-7 text-white" />,
      title: "الشهادات",
      path: "/certificates",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">الخدمات الصحية</h2>
        <Link to="/all-services" className="text-saudi-primary text-sm font-medium">
          عرض الكل
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            path={service.path}
            color={service.color}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;
