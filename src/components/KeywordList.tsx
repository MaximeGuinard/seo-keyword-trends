import React from 'react';
import { X, TrendingUp } from 'lucide-react';

interface KeywordListProps {
  keywords: string[];
  onRemoveKeyword: (keyword: string) => void;
}

export default function KeywordList({ keywords, onRemoveKeyword }: KeywordListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword) => (
        <div
          key={keyword}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
        >
          <TrendingUp className="h-4 w-4 text-[#ed3b49]" />
          <span className="text-white">{keyword}</span>
          <button
            onClick={() => onRemoveKeyword(keyword)}
            className="p-0.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      ))}
    </div>
  );
}