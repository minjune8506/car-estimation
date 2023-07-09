export function convertPrice(price: number, unit: number = 1): string {
  return (price / unit).toLocaleString("ko-KR");
}
