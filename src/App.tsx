import React, { useState, useEffect } from 'react';
import { LineChart, Activity, Search } from 'lucide-react';
import KeywordInput from './components/KeywordInput';
import KeywordList from './components/KeywordList';
import TrendChart from './components/TrendChart';

async function fetchTrendData(keywords: string[]) {
  if (keywords.length === 0) return [];
  const response = await fetch(`/api/trends?keywords=${encodeURIComponent(keywords.join(','))}`);
  return response.json();
}

function App() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (keywords.length > 0) {
        setLoading(true);
        try {
          const data = await fetchTrendData(keywords);
          setTrendData(data);
        } catch (error) {
          console.error('Error fetching trend data:', error);
        }
        setLoading(false);
      } else {
        setTrendData([]);
      }
    }
    loadData();
  }, [keywords]);

  const handleAddKeyword = (keyword: string) => {
    if (keywords.length < 5 && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  return (
    <div className="min-h-screen bg-[#070616]">
      <header className="bg-[#8a77eb] border-b border-[#ed3b49]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">Tableau de Bord des Tendances</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">Ajouter des Mots-clés</h2>
            <KeywordInput onAddKeyword={handleAddKeyword} />
            <div className="mt-4">
              <KeywordList keywords={keywords} onRemoveKeyword={handleRemoveKeyword} />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8a77eb] mx-auto"></div>
              <p className="text-white mt-4">Chargement des données...</p>
            </div>
          ) : keywords.length > 0 ? (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-4">Évolution des Tendances</h2>
                <TrendChart data={trendData} keywords={keywords} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keywords.map(keyword => {
                  const keywordData = trendData.filter(d => d.keyword === keyword);
                  const lastValue = keywordData[keywordData.length - 1]?.value || 0;
                  return (
                    <div key={keyword} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-2">{keyword}</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">Score de tendance</p>
                          <p className="text-2xl font-bold text-[#8a77eb]">
                            {lastValue}
                          </p>
                        </div>
                        <LineChart className="h-12 w-12 text-[#ed3b49]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Aucun mot-clé ajouté
              </h3>
              <p className="text-gray-400">
                Commencez par ajouter des mots-clés pour voir leurs tendances
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;