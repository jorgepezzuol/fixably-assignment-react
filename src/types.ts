export interface Order {
  id: number;
  deviceType: string;
  deviceManufacturer: string;
  deviceBrand: string;
  technician?: string;
  status: number;
  created: string;
}
