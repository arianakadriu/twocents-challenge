export type NetWorthTier = "bronze" | "silver" | "gold" | "platinum";

export function getNetWorthTier(balance: number): {
    tier: NetWorthTier;
    colorClasses: string;  
    borderColor: string;
  } {
    if (balance >= 100001) {
      return { tier: "platinum", colorClasses: "from-blue-600 to-blue-300", borderColor: "border-blue-500" };
    }
    if (balance >= 50001) {
      return { tier: "gold", colorClasses: "from-yellow-400 to-yellow-200", borderColor: "border-yellow-400" };
    }
    if (balance >= 10001) {
      return { tier: "silver", colorClasses: "from-gray-400 to-gray-200", borderColor: "border-gray-400" };
    }
    return { tier: "bronze", colorClasses: "from-yellow-800 to-yellow-500", borderColor: "border-yellow-700" };
  }


 export function timeAgo(dateString: string) {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  
  
