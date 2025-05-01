import React from 'react';

type Props = {
  setChartColor: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
};
const displayingColors = [
  '#EB6477',
  '#0886C9',
  '#1c252e',
  '#F2C85C',
  '#548587',
  '#6D4C41',
  '#21518F',
];

export const ChartColorPicker: React.FC<Props> = ({ setChartColor, label }) => (
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
      {displayingColors?.map((color) => (
        <div
          key={color}
          role="button"
          tabIndex={0}
          onClick={() => {
            let shades = [];

            switch (color) {
              case '#EB6477':
                shades = [
                  '#EB6477',
                  '#ED7586',
                  '#EF8695',
                  '#F298A4',
                  '#F4A9B3',
                  '#F6BAC3',
                  '#F8CBD2',
                  '#FBDDE1',
                  '#FDEEF0',
                ];

                break;

              case '#0886C9':
                shades = [
                  '#0886C9',
                  '#099BE9',
                  '#1EABF6',
                  '#3EB7F7',
                  '#5EC3F9',
                  '#7ECFFA',
                  '#9FDBFB',
                  '#BFE7FC',
                  '#DFF3FE',
                ];

                break;

              case '#1c252e':
                shades = [
                  '#1c252e',
                  '#2E3D4C',
                  '#41556A',
                  '#536E88',
                  '#6886A3',
                  '#879EB6',
                  '#A5B6C8',
                  '#C3CFDA',
                  '#E1E7ED',
                ];

                break;

              case '#F2C85C':
                shades = [
                  '#F2C85C',
                  '#F3CE6E',
                  '#F5D480',
                  '#F6DA92',
                  '#F8E0A4',
                  '#F9E7B7',
                  '#FBEDC9',
                  '#FCF3DB',
                  '#FEF9ED',
                ];
                break;

              case '#548587':
                shades = [
                  '#548587',
                  '#60999B',
                  '#73A6A8',
                  '#87B3B5',
                  '#9BC0C1',
                  '#AFCCCD',
                  '#C3D9DA',
                  '#D7E6E6',
                  '#EBF2F3',
                ];

                break;

              case '#6D4C41':
                shades = [
                  '#402f29',
                  '#4f3831',
                  '#5e4239',
                  '#85594d',
                  '#997267',
                  '#ad8b80',
                  '#c1a39a',
                  '#d4bcb4',
                  '#6D4C41',
                ];

                break;

              case '#21518F':
                shades = [
                  '#21518F',
                  '#2965B1',
                  '#3378D0',
                  '#558FD8',
                  '#77A5E0',
                  '#99BCE8',
                  '#BBD2EF',
                  '#DDE9F7',
                  '#F0F6FC',
                ];
                break;

              default:
                return null;
            }

            return setChartColor(shades);
          }}
          onKeyDown={(e) => e.key === 'Enter'}
          className="color-box"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: color,
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  </div>
);
