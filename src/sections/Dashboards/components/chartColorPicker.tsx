import React from 'react';

type Props = {
  label: string;
  defaultColors: string[];
  selectedColor: string;

  setChartColor: React.Dispatch<React.SetStateAction<string>>;
};

export const ChartColorPicker: React.FC<Props> = ({
  label,
  defaultColors,
  selectedColor,
  setChartColor,
}) => (
  <div style={{ marginBottom: '20px' }}>
    <div style={{ fontWeight: 500, marginBottom: '5px' }}>{label}</div>
    <div
      style={{
        display: 'flex',
        gap: '8px',
        border: '1px solid #eee',
        borderRadius: '12px',
        width: 'fit-content',
      }}
    >
      {defaultColors.map((color) => (
        <div
          key={color}
          role="button"
          tabIndex={0}
          onClick={() => setChartColor(color)}
          onKeyDown={(e) => e.key === 'Enter' && setChartColor(color)}
          className="color-box"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: color,
            cursor: 'pointer',
            border: selectedColor === color ? '2px solid #02254d' : '2px solid transparent',
          }}
        />
      ))}
    </div>
  </div>
);
