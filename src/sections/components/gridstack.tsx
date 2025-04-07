// import 'gridstack/dist/gridstack.min.css';

// import { GridStack } from 'gridstack';
// import React, { useRef, useEffect } from 'react';

// const GridComponent: React.FC = () => {
//   const gridRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (gridRef.current) {
//       const grid = GridStack.init(
//         {
//           cellHeight: 100,
//           draggable,
//           resizable,
//           margin: 10,
//         },
//         gridRef.current
//       );

//       grid.load([
//         { x: 0, y: 0, w: 2, h: 2, content: 'Item 1' },
//         { x: 2, y: 0, w: 2, h: 2, content: 'Item 2' },
//         { x: 4, y: 0, w: 2, h: 2, content: 'Item 3' },
//       ]);
//     }
//   }, []);

//   return (
//     <div ref={gridRef} className="grid-stack">
//       {/* GridStack items */}
//       <div className="grid-stack-item" gs-w="2" gs-h="2">
//         <div className="grid-stack-item-content">Item 1</div>
//       </div>
//       <div className="grid-stack-item" gs-w="2" gs-h="2">
//         <div className="grid-stack-item-content">Item 2</div>
//       </div>
//       <div className="grid-stack-item" gs-w="2" gs-h="2">
//         <div className="grid-stack-item-content">Item 3</div>
//       </div>
//     </div>
//   );
// };

// export default GridComponent;
