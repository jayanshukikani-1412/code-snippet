import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { fromUnixTime } from "date-fns";
import { format } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ========== remove empty from object ==========
export const removeEmptyFromObject = <T extends Record<string, any>>(
  obj: T
) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      return value === 0 || Boolean(value);
    })
  ) as T;
};

// ========== format date ==========
export function formatDate(epochTime: number): string {
  if (!epochTime) return "N/A";
  // const date = toZonedTime(fromUnixTime(epochTime), "UTC")
  return format(fromUnixTime(epochTime), "MMM d, yyyy, hh:mm a", {
    timeZone: "UTC",
  });
}

// ========== format currency ==========
export const formatCurrency = (amount: number) => {
  const adjustedAmount = amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(adjustedAmount);
};

// ========== prevent negative numbers ==========
export const preventNegativeNumbers = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const value = event.target.value;
  if (value.startsWith("-")) {
    event.target.value = value.slice(1);
  }
};

// ========== parse key to title ==========
export const parseKeyToTitle = (key: string): string => {
  return key
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters in camelCase
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

// ========== get nested value ==========
export const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

// ========== convert seconds to milliseconds ==========
export const convertSecondsToMs = (seconds: number) =>
  Math.floor(seconds * 1000);

// ========== convert milliseconds to seconds ==========
export const convertMsToSeconds = (milliseconds: number) =>
  Math.floor(milliseconds / 1000);

// ========== convert milliseconds to human readable time ==========
export const msToHumanReadable = (ms: number): string => {
  if (!ms || ms < 0) return "Invalid time";

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  const parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (seconds > 0) parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);

  return parts.length > 0 ? parts.join(", ") : "less than a second";
};

// ========== convert seconds to human readable time ==========
export const secondsToHumanReadable = (seconds: number): string => {
  if (!seconds || seconds < 0) return "Invalid time";

  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const remainingSeconds = seconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (remainingSeconds > 0)
    parts.push(`${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`);

  return parts.length > 0 ? parts.join(", ") : "less than a second";
};

// ========== generate random password ==========
export function generatePassword(length: number = 8): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "$!@%";
  const allChars = letters + numbers + specialChars;

  if (length < 8) {
    throw new Error("Password length must be at least 8 characters.");
  }

  let password = "";

  // Ensure at least one letter, one number, and one special character
  password += letters[Math.floor(Math.random() * letters.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill the rest of the password length with random characters
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to randomize character positions
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}
