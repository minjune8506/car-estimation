export function convertPrice(price: number, unit = 1): string {
  return (price / unit).toLocaleString("ko-KR");
}
