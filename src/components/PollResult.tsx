"use client";
import { IPollResults } from "@/interfaces/pollResults";
import { useEffect, useState } from "react";

interface PollResultProps {
  options: string[];
  results: IPollResults["results"];
}

export default function PollResult({
  options,
  results,
}: PollResultProps) {
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const voteCounts = options.map((_, index) => results?.[index]?.votes ?? 0);
  const totalVotes = voteCounts.reduce((sum, v) => sum + v, 0);

  useEffect(() => {
    if (!hasAnimated) {
      const percents = voteCounts.map((v) =>
        totalVotes ? Math.round((v / totalVotes) * 100) : 0
      );
      setTimeout(() => {
        setAnimatedPercentages(percents);
        setHasAnimated(true);
      }, 100);
    }
  }, [hasAnimated, totalVotes]);

  return (
    <div className="border-gray-400 border text-white p-6 rounded-xl max-w-xl mr-auto">
      {options.map((label, index) => {
        const votes = results?.[index]?.votes ?? 0;
        const avgBalance = results?.[index]?.average_balance ?? 0;
        const percent = animatedPercentages[index] ?? 0;

        return (
          <div key={index} className={`${index !== options.length - 1 ? "mb-4" : ""} relative`}>
            <div className="w-full bg-zinc-700 h-10 rounded-lg overflow-hidden relative">
              <div
                className="h-full bg-[#f3a456] transition-all duration-1000 ease-out rounded-lg"
                style={{
                  width: hasAnimated ? `${percent}%` : `0%`,
                }}
              ></div>

              <div className="absolute inset-0 flex items-center justify-between px-4 text-sm font-medium z-10">
                <span>{label}</span>
                <div className="flex items-center gap-3 text-sm text-zinc-200">
                  <span>{votes}</span>

                  <div
                    className={`inline-flex items-center gap-2 rounded-full pl-1 pr-3 py-1 bg-gradient-to-r text-[#ccccce] border-2 border-[#8e8e90] bg-clip-text font-semibold border-2`}
                  >
                    <div
                      className={`w-4 h-4 flex items-center justify-center rounded-full border-2 text-xs bg-clip-text bg-gradient-to-r text-[#ccccce] border-2 border-[#8e8e90]`}
                    >
                      $
                    </div>
                    <span className="text-xs">
                      {Number(avgBalance).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
