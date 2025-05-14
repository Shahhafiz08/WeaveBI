import React from 'react';

type Props = {
  label: string;

  selectedColor: string;
  incommingTitleColor: string;

  setTitleColor: React.Dispatch<React.SetStateAction<string>>;
};

export const TitleColorPicker: React.FC<Props> = ({
  label,

  selectedColor,
  setTitleColor,
  incommingTitleColor,
}) => {
  const titleColors = ['#ef8695', '#2965b1', '#000000', '#d98311', '#73a6a8', '#99523A', '#0886c9'];

  return (
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
        {titleColors.map((color) => (
          <div
            key={color}
            role="button"
            tabIndex={0}
            onClick={() => setTitleColor(color)}
            onKeyDown={(e) => e.key === 'Enter' && setTitleColor(color)}
            className="color-box"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: color,
              cursor: 'pointer',
              border: selectedColor === color ? '2px solid black' : '2px solid transparent',
            }}
          />
        ))}
      </div>
    </div>
  );
};
