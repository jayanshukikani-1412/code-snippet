import { fromUnixTime } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";


// ========== format date ==========
export function formatDate(epochTime: number): string {
    if (!epochTime) return "N/A";
    // const date = toZonedTime(fromUnixTime(epochTime), "UTC")
    return format(fromUnixTime(epochTime), "MMM d, yyyy, hh:mm a", {
      timeZone: "UTC",
    });
  }
  
  // ========== timezone date and time formatter ==========
  export const formatDateTimeForTimeZone = (
    date: Date,
    timeZone: string
  ): string => {
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, "MMM dd, yyyy h:mm a", { timeZone });
  };
  
  // ========== format currency ==========
  export const formatCurrency = (amount: number) => {
    const adjustedAmount = amount;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(adjustedAmount);
  };