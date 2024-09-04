interface UDocument<T extends object | string> {
  id: string;
  data: T;
  timestamp: number;
  utimestamp: number;
}
