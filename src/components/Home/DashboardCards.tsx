
import React from "react";
import { Link } from "react-router-dom";
import { FileText, Heart, CalendarCheck, Activity, Users } from "lucide-react";

const DashboardCards = () => {
  const services = [
    {
      id: 1,
      title: "المواعيد",
      description: "حجز وإدارة المواعيد الطبية",
      icon: <CalendarCheck className="h-6 w-6 text-saudi-primary" />,
      link: "/appointments"
    },
    {
      id: 2,
      title: "التقارير الطبية",
      description: "عرض وتحميل التقارير والإجازات الطبية",
      icon: <Activity className="h-6 w-6 text-saudi-primary" />,
      link: "/medical-reports"
    },
    {
      id: 3,
      title: "عائلتي",
      description: "إدارة الملفات الطبية للعائلة",
      icon: <Users className="h-6 w-6 text-saudi-primary" />,
      link: "/documents"
    },
    {
      id: 4,
      title: "جودة الحياة",
      description: "معلومات وخدمات صحية",
      icon: <Heart className="h-6 w-6 text-saudi-primary" />,
      link: "/covid"
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <Link key={service.id} to={service.link} className="service-card">
            <div className="flex flex-col items-center text-center">
              {service.icon}
              <h3 className="mt-3 font-bold text-gray-800">{service.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;
