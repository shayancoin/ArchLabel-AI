import React from 'react';
import { NamingStrategy } from '../types';

interface StrategyCardProps {
  strategy: NamingStrategy;
  index: number;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, index }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-1 block">Option 0{index + 1}</span>
            <h3 className="text-xl font-semibold text-white">{strategy.strategyName}</h3>
          </div>
        </div>
        
        <p className="text-slate-400 text-sm mb-6 italic border-l-2 border-slate-600 pl-3">
          "{strategy.description}"
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
            <span className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-mono">Type 1 (Single)</span>
            <div className="text-lg font-medium text-white group-hover:text-indigo-300 transition-colors">
              {strategy.type1Label}
            </div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
            <span className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-mono">Type 2 (Double)</span>
            <div className="text-lg font-medium text-white group-hover:text-indigo-300 transition-colors">
              {strategy.type2Label}
            </div>
          </div>
        </div>

        <div className="bg-slate-950 rounded-lg p-4">
            <h4 className="text-xs text-slate-400 uppercase font-bold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Strategic Rationale
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
                {strategy.rationale}
            </p>
        </div>
      </div>
    </div>
  );
};

export default StrategyCard;