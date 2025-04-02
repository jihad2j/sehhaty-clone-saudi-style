
import React from "react";
import { Activity, TrendingUp, Weight, Heart } from "lucide-react";

const HealthMetricCard = ({ 
  icon, 
  title, 
  value, 
  unit, 
  trend 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  unit: string; 
  trend: "up" | "down" | "stable"; 
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center">
        <div className="bg-saudi-lighter p-2 rounded-full mr-3">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-800">{value}</span>
            <span className="text-xs text-gray-500 mr-1">{unit}</span>
            
            {trend === "up" && (
              <TrendingUp className="h-4 w-4 text-saudi-primary mr-2" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const HealthMetrics = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">المؤشرات الصحية</h2>
        <a href="/health-metrics" className="text-saudi-primary text-sm font-medium">
          التفاصيل
        </a>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <HealthMetricCard
          icon={<Heart className="h-5 w-5 text-saudi-primary" />}
          title="معدل ضربات القلب"
          value="72"
          unit="نبضة/د"
          trend="stable"
        />
        
        <HealthMetricCard
          icon={<Weight className="h-5 w-5 text-saudi-primary" />}
          title="الوزن"
          value="75.2"
          unit="كجم"
          trend="down"
        />
        
        <HealthMetricCard
          icon={<Activity className="h-5 w-5 text-saudi-primary" />}
          title="معدل التنفس"
          value="18"
          unit="نفس/د"
          trend="stable"
        />
        
        <HealthMetricCard
          icon={<TrendingUp className="h-5 w-5 text-saudi-primary" />}
          title="مؤشر السكر"
          value="5.4"
          unit="mmol/L"
          trend="up"
        />
      </div>
    </div>
  );
};

export default HealthMetrics;
