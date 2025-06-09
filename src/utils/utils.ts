/**
 * 将格式化时间字符串转换为未来的时间戳（单位：毫秒）
 * @param timeStr 格式化的时间字符串，例如 "2025-06-10 12:30:00"
 * @returns 时间戳（毫秒）
 */
export function parseFutureTimeToTimestamp(timeStr: string): number {
  const formatted = timeStr.replace(/-/g, '/'); // Safari 兼容性处理
  const timestamp = new Date(formatted).getTime();
  if (isNaN(timestamp)) {
    throw new Error(`Invalid time string format: ${timeStr}`);
  }
  if (timestamp <= Date.now()) {
    throw new Error(`Time must be in the future: ${timeStr}`);
  }
  return timestamp;
}
