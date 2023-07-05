export function convertPrice(price: number, unit: number): string {
  return (price / unit).toLocaleString("ko-KR");
}
