export type NetWorthTier = "bronze" | "silver" | "gold" | "platinum";

export function getNetWorthTier(balance: number): {
  tier: NetWorthTier;
  colorClasses: string;
  textColor: string;
  borderColor: string;
} {
  if (balance >= 100001) {
    return {
      tier: "platinum",
      colorClasses: "from-black via-[#1a1a1a] to-[#2c2c2c]",
      textColor: "text-[#cb8823]",
      borderColor: "border-[#999]",
    };
  }
  if (balance >= 50001) {
    return {
      tier: "gold",
      colorClasses: "from-[#d4a72a] to-[#f4d200]",
      textColor: "text-black",
      borderColor: "border-[#d4a72a]"
    };
  }
  if (balance >= 10001) {
    return {
      tier: "silver",
      colorClasses: "from-[#7f7f7d] to-gray-400",
      textColor: "text-white",
      borderColor: "border-[#7f7f7d]"
    };
  }
  return {
    tier: "bronze",
    colorClasses: "from-[#aa8b51] to-[#875a16]",
    textColor: "text-white",
    borderColor: "border-[#875a16]"
  };
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


