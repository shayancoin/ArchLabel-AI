import React from 'react';
import { UnitSpec } from '../types';

interface UnitVisualizerProps {
  unit: UnitSpec;
  scale?: number;
}

const UnitVisualizer: React.FC<UnitVisualizerProps> = ({ unit, scale = 0.15 }) => {
  const { width, height } = unit.dimensions;
  
  // Calculate scaled dimensions for SVG
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  
  // Internal logic to visualize features based on text
  const hasPocketDoor = unit.features.some(f => f.toLowerCase().includes('pocket'));
  const isShelving = !hasPocketDoor;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <svg 
          width={scaledWidth + 20} 
          height={scaledHeight + 20} 
          className="overflow-visible drop-shadow-2xl"
        >
            {/* Dimensions Lines - Height */}
            <line x1="-10" y1="0" x2="-10" y2={scaledHeight} stroke="#64748b" strokeWidth="1" />
            <text x="-15" y={scaledHeight / 2} textAnchor="end" className="text-[10px] fill-slate-400 font-mono" transform={`rotate(-90, -15, ${scaledHeight/2})`}>{height}</text>

            {/* Dimensions Lines - Width */}
            <line x1="0" y1={scaledHeight + 10} x2={scaledWidth} y2={scaledHeight + 10} stroke="#64748b" strokeWidth="1" />
            <text x={scaledWidth / 2} y={scaledHeight + 25} textAnchor="middle" className="text-[10px] fill-slate-400 font-mono">{width}</text>

            {/* Main Cabinet Body */}
            <rect 
                x="0" 
                y="0" 
                width={scaledWidth} 
                height={scaledHeight} 
                fill="#1e293b" 
                stroke="#94a3b8" 
                strokeWidth="2"
            />

            {/* Internal Visualization Logic */}
            {isShelving && (
                <>
                    {/* Shelves lines */}
                    <line x1="5" y1={scaledHeight * 0.2} x2={scaledWidth - 5} y2={scaledHeight * 0.2} stroke="#334155" strokeWidth="1" />
                    <line x1="5" y1={scaledHeight * 0.4} x2={scaledWidth - 5} y2={scaledHeight * 0.4} stroke="#334155" strokeWidth="1" />
                    <line x1="5" y1={scaledHeight * 0.6} x2={scaledWidth - 5} y2={scaledHeight * 0.6} stroke="#334155" strokeWidth="1" />
                    <line x1="5" y1={scaledHeight * 0.8} x2={scaledWidth - 5} y2={scaledHeight * 0.8} stroke="#334155" strokeWidth="1" />
                    {/* Door Split if applicable (single unit usually one door) */}
                    <line x1={scaledWidth} y1="0" x2={scaledWidth} y2={scaledHeight} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" />
                </>
            )}

            {hasPocketDoor && (
                <>
                   {/* Internal Niche Area */}
                   <rect 
                        x={scaledWidth * 0.1} 
                        y={scaledHeight * 0.3} 
                        width={scaledWidth * 0.8} 
                        height={scaledHeight * 0.4} 
                        fill="#334155" 
                        opacity="0.5"
                    />
                    {/* Pocket Door Cavities */}
                    <rect x="2" y="0" width="10" height={scaledHeight} fill="#0f172a" stroke="#475569" />
                    <rect x={scaledWidth - 12} y="0" width="10" height={scaledHeight} fill="#0f172a" stroke="#475569" />
                    
                    {/* Countertop Line */}
                    <line x1={scaledWidth * 0.1} y1={scaledHeight * 0.55} x2={scaledWidth * 0.9} y2={scaledHeight * 0.55} stroke="#cbd5e1" strokeWidth="2" />
                </>
            )}
        </svg>
      </div>
      <div className="text-center">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">
          {unit.dimensions.width} x {unit.dimensions.depth} x {unit.dimensions.height}
        </div>
      </div>
    </div>
  );
};

export default UnitVisualizer;