import { useState } from 'react';
import Button from '../../shared/ui/Button';

const ExamFilters = ({ onFilterChange, onSortChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('date-desc');

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleSortChange = (sort) => {
    setActiveSort(sort);
    onSortChange(sort);
  };

  const filterButtons = [
    { id: 'all', label: 'Alla prov', icon: '📊' },
    { id: 'passed', label: 'Godkända', icon: '✅' },
    { id: 'failed', label: 'Underkända', icon: '❌' }
  ];

  const sortButtons = [
    { id: 'date-desc', label: 'Senaste först', icon: '🕐' },
    { id: 'date-asc', label: 'Äldsta först', icon: '🕐' },
    { id: 'score-desc', label: 'Högsta poäng', icon: '⭐' },
    { id: 'score-asc', label: 'Lägsta poäng', icon: '⭐' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
      {/* Filter sektion */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
          <span>🔍</span>
          Filtrera resultat
        </h3>
        <div className="flex flex-wrap gap-3">
          {filterButtons.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`
                px-5 py-2.5 rounded-xl font-medium transition-all duration-300
                flex items-center gap-2 text-sm
                ${activeFilter === filter.id
                  ? 'bg-traffic-yellow text-traffic-black shadow-md scale-105 ring-2 ring-traffic-yellow ring-offset-2'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                }
              `}
            >
              <span className="text-lg">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sortering sektion */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
          <span>⬆️</span>
          Sortera
        </h3>
        <div className="flex flex-wrap gap-3">
          {sortButtons.map(sort => (
            <button
              key={sort.id}
              onClick={() => handleSortChange(sort.id)}
              className={`
                px-5 py-2.5 rounded-xl font-medium transition-all duration-300
                flex items-center gap-2 text-sm
                ${activeSort === sort.id
                  ? 'bg-traffic-black text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                }
              `}
            >
              <span className="text-lg">{sort.icon}</span>
              {sort.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamFilters;
