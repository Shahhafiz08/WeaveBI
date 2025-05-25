// import { z as zod } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';

// import CloseIcon from '@mui/icons-material/Close';
// import { Box, Paper, Button, TextField, Typography, IconButton } from '@mui/material';

// import { Iconify } from 'src/components/iconify';
// import { Form, Field } from 'src/components/hook-form';

// import { DummyChart } from './dummyChart';

// type addWidget = {
//   closeAddWidget: () => void;
//   close: string;
// };
// const AddWidget = ({ closeAddWidget, close }: addWidget) => {
//   const addWegit = zod.object({
//     limit: zod.number().min(1, 'Set an output limit'),
//     query: zod.string().min(1, 'Enter a valid query'),
//     connectionName: zod.string().min(1, 'Enter a valid query'),
//   });
//   type addWedgitSchema = zod.infer<typeof addWegit>;
//   const methods = useForm<addWedgitSchema>({
//     resolver: zodResolver(addWegit),
//     defaultValues: {
//       limit: 0,
//       query: '',
//       connectionName: '',
//     },
//   });

//   return (
//     <Box
//       id="query-section"
//       sx={{
//         userSelect: 'none',

//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '100px',
//         width: '100%',
//         display: `${close}`,
//         // transform: CSSTranslate - moveDown,
//       }}
//     >
//       <Paper
//         elevation={3}
//         id="outer-div"
//         sx={{
//           padding: ' 5px 40px 30px 40px',
//           borderRadius: '20px',
//           border: '2px solid rgb(239, 237, 237)',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'centre',
//           gap: 2,
//           position: 'absolute',
//           width: '106%',
//         }}
//       >
//         {/* Drag Handle */}
//         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//           <Box
//             id="dragable"
//             sx={{
//               width: 100,
//               height: 5,
//               borderRadius: 20,
//               backgroundColor: '#ccc',
//               cursor: 'grab',
//               '&:hover': { backgroundColor: '#797875' },
//             }}
//           />
//         </Box>

//         {/* Header */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography id="title" sx={{ fontSize: '1.1 rem' }}>
//             Create Query
//           </Typography>
//           <IconButton onClick={closeAddWidget} sx={{ padding: '0' }} id="cross">
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         {/* Form and Output */}
//         <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5%' }}>
//           {/* Left: Form */}
//           <Box
//             className="form-side"
//             sx={{
//               p: 2,
//               borderRadius: 2,
//               border: '2px solid rgb(239, 237, 237)',
//               width: '50%',
//             }}
//           >
//             <Form methods={methods}>
//               <TextField
//                 fullWidth
//                 label="Connection Name"
//                 id="connection-name"
//                 variant="outlined"
//                 margin="normal"
//               />

//               {/* <Typography sx={{ fontSize: '1rem', mt: 2, mb: 1 }}>Query Description</Typography> */}
//               <Field.Text
//                 required
//                 name="query"
//                 label="Enter your query..."
//                 minRows={2}
//                 multiline
//                 sx={{ marginBottom: '15px' }}
//               />

//               <TextField
//                 id="limit"
//                 label="Limit"
//                 type="number"
//                 inputProps={{ min: 1, max: 20 }}
//                 sx={{ width: 120 }}
//               />

//               <Box sx={{ display: 'flex', justifyContent: 'end' }}>
//                 <Button variant="contained">Run</Button>
//               </Box>
//             </Form>
//           </Box>

//           {/* Right: Output */}
//           <Box
//             className="output-side"
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '10%',
//               width: '60%',
//             }}
//           >
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 gap: '20px',
//                 justifyContent: 'space-between',
//               }}
//             >
//               <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
//                 <Button style={{ display: 'flex', gap: '10px' }}>
//                   <img src="/public/assets/images/dashboard/chart-icon.svg" alt="Chart Icon" />
//                   <Typography>Charts</Typography>
//                 </Button>
//                 <Button style={{ display: 'flex', gap: '10px' }}>
//                   <img src="/public/assets/images/dashboard/table-icon.svg" alt="Chart Icon" />
//                   <Typography>Table</Typography>
//                 </Button>
//                 <Button style={{ display: 'flex', gap: '10px' }}>
//                   <img src="/public/assets/images/dashboard/text-icon.svg" alt="Chart Icon" />
//                   <Typography>Text</Typography>
//                 </Button>
//               </Box>

//               <Button sx={{ width: 20 }}>
//                 <Iconify icon="uil:ellipsis-v" />
//               </Button>
//             </Box>

//             <Box
//               className="chart"
//               sx={{
//                 height: 250,
//                 width: '100%',
//               }}
//             >
//               <DummyChart color="pink" />
//             </Box>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default AddWidget;
