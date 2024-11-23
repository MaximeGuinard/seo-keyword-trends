import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

interface KeywordInputProps {
  onAddKeyword: (keyword: string) => void;
}

export default function KeywordInput({ onAddKeyword }: KeywordInputProps) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onAddKeyword(keyword.trim());
      setKeyword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Entrez un mot-clé..."
          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a77eb] text-white placeholder-gray-400"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-[#8a77eb] text-white rounded-lg hover:bg-[#8a77eb]/90 transition-colors flex items-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Ajouter
      </button>
    </form>
  );
}