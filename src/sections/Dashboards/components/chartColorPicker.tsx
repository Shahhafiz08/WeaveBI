import React from 'react';

type Props = {
  setChartColor: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
};
const defaultChartColors = [
  '#EB6477',
  '#81D4FA',
  '#BA68C8',
  '#FFB74D',
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
      {defaultChartColors?.map((color) => (
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
                  '#FAD4D9',
                  '#F7B3BC',
                  '#F5919E',
                  '#F27081',
                  '#D85A6B',
                  '#C3505F',
                  '#AD4653',
                  '#973C47',
                ];
                break;

              case '#81D4FA':
                shades = [
                  '#81D4FA',
                  '#E1F5FE',
                  '#B3E5FC',
                  '#4FC3F7',
                  '#29B6F6',
                  '#03A9F4',
                  '#039BE5',
                  '#0288D1',
                  '#0277BD',
                ];
                break;

              case '#BA68C8':
                shades = [
                  '#BA68C8',
                  '#F3E5F5',
                  '#E1BEE7',
                  '#CE93D8',
                  '#AB47BC',
                  '#9C27B0',
                  '#8E24AA',
                  '#7B1FA2',
                  '#6A1B9A',
                ];
                break;

              case '#FFB74D':
                shades = [
                  '#FFB74D',
                  '#FFF3E0',
                  '#FFE0B2',
                  '#FFCC80',
                  '#FFA726',
                  '#FF9800',
                  '#FB8C00',
                  '#F57C00',
                  '#EF6C00',
                ];
                break;

              case '#548587':
                shades = [
                  '#548587',
                  '#a3c4c5',
                  '#8fb2b3',
                  '#7ba1a2',
                  '#679090',
                  '#4b7779',
                  '#426a6b',
                  '#395d5e',
                  '#305051',
                ];
                break;

              case '#6D4C41':
                shades = [
                  '#6D4C41',
                  '#d4bcb4',
                  '#c1a39a',
                  '#ad8b80',
                  '#997267',
                  '#85594d',
                  '#5e4239',
                  '#4f3831',
                  '#402f29',
                ];
                break;

              case '#21518F':
                shades = [
                  '#21518F',
                  '#DDE9F7',
                  '#BBD2EF',
                  '#99BCE8',
                  '#77A5E0',
                  '#558FD8',
                  '#3378D0',
                  '#2965B1',
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
