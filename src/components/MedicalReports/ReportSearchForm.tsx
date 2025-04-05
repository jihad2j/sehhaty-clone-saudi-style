
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";

interface ReportSearchFormProps {
  nationalId: string;
  setNationalId: (value: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
}

const ReportSearchForm: React.FC<ReportSearchFormProps> = ({
  nationalId,
  setNationalId,
  handleSearch,
  isLoading,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">أدخل رقم الهوية للبحث عن التقارير</h2>
      <div className="flex gap-3 items-center">
        <Input
          type="text"
          placeholder="رقم الهوية"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
          className="flex-1 border-gray-300"
        />
        <Button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Search className="h-4 w-4 ml-2" />
              بحث
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReportSearchForm;
