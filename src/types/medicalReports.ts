
export interface SickLeave {
  id?: string;
  _id?: string;
  title?: string;
  period?: string;
  issueDate?: string;
  startDate?: string;
  endDate?: string;
  facility?: string;
  leaveNumber?: string;
  inputgsl?: string;
  inputindurationh?: string;
  inputdurationm?: string;
  inputdatefrom?: string;
  inputdateto?: string;
  inputdatehin?: string;
  inputdatemin?: string;
  inputdatehout?: string;
  inputdatemout?: string;
  inputdatesick?: string;
  inputnamear?: string;
  inputnameen?: string;
  inputidentity?: string;
  inputnationalityar?: string;
  inputnationalityen?: string;
  inputworkar?: string;
  inputdoctorar?: string;
  inputdoctoren?: string;
  inputworktypear?: string;
  inputworktypeen?: string;
  inputcentralnamear?: string;
  inputcentralnameen?: string;
  inputcentralid?: string;
  inputcentrallogo?: string;
  inputtimeparint?: string;
  inputdateparint?: string;
  inputdaynum?: string;
  inputNationalCompanion?: string;
  inputPmAmIn?: string;
  inputPmAmout?: string;
  inputTimein?: string;
  inputTimeout?: string;
  inputWaitTimeAr?: string;
  inputWaitTimeEr?: string;
  inputCompanionNameAr?: string;
  inputCompanionNameEn?: string;
  inputsickleaveRelation?: string;
  inputsickleaveRelationAr?: string;
  inputTypeVisitEn?: string;
  inputTypeVisitAr?: string;
  inputworken?: string;
  inputdiagnosis?: string;
}

export interface MedicalReportsApiResponse {
  success?: boolean;
  data?: SickLeave[];
  message?: string;
}

export interface MedicalReportDownloadResponse {
  success: boolean;
  fileUrl?: string;
  message?: string;
}

export interface MedicalReportPrintResponse {
  success: boolean;
  printUrl?: string;
  message?: string;
}
