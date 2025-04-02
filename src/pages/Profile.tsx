
import React from "react";
import { Camera, ChevronRight, User, Mail, Phone, Calendar, IdCard, MapPin, Heart, Shield } from "lucide-react";
import Header from "../components/Layout/Header";
import BottomNavigation from "../components/Layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const ProfileItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => {
  return (
    <div className="flex items-center py-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-saudi-lighter text-saudi-primary ml-3">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-gray-900">{value}</div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
};

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-xl font-bold mb-6">الملف الشخصي</h1>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24 border-4 border-white shadow">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/43.jpg" alt="Profile photo" />
                  <AvatarFallback className="bg-saudi-primary text-white text-xl">عا</AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full w-8 h-8">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <h2 className="text-lg font-bold">عبدالله محمد العتيبي</h2>
              <p className="text-gray-500 text-sm">ID: 1042759834</p>
              
              <Button variant="outline" className="mt-4">
                تعديل الملف الشخصي
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="p-4">
              <h3 className="font-bold">المعلومات الشخصية</h3>
            </div>
            
            <Separator />
            
            <div className="p-4">
              <ProfileItem 
                icon={<User className="h-4 w-4" />} 
                label="الاسم الكامل" 
                value="عبدالله محمد العتيبي" 
              />
              <Separator />
              <ProfileItem 
                icon={<Mail className="h-4 w-4" />} 
                label="البريد الإلكتروني" 
                value="abdullah@example.com" 
              />
              <Separator />
              <ProfileItem 
                icon={<Phone className="h-4 w-4" />} 
                label="رقم الجوال" 
                value="05xxxxxxxx" 
              />
              <Separator />
              <ProfileItem 
                icon={<Calendar className="h-4 w-4" />} 
                label="تاريخ الميلاد" 
                value="15/07/1985" 
              />
              <Separator />
              <ProfileItem 
                icon={<IdCard className="h-4 w-4" />} 
                label="رقم الهوية الوطنية" 
                value="104xxxxxxx" 
              />
              <Separator />
              <ProfileItem 
                icon={<MapPin className="h-4 w-4" />} 
                label="العنوان" 
                value="الرياض، المملكة العربية السعودية" 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="p-4">
              <h3 className="font-bold">المعلومات الصحية</h3>
            </div>
            
            <Separator />
            
            <div className="p-4">
              <ProfileItem 
                icon={<Heart className="h-4 w-4" />} 
                label="فصيلة الدم" 
                value="O+" 
              />
              <Separator />
              <ProfileItem 
                icon={<Shield className="h-4 w-4" />} 
                label="الحساسية والأمراض المزمنة" 
                value="لا يوجد" 
              />
            </div>
          </CardContent>
        </Card>
        
        <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
          تسجيل الخروج
        </Button>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
