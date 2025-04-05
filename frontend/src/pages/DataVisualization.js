import React, { useState, useRef } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Button, 
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import * as XLSX from 'xlsx';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import html2canvas from 'html2canvas';

// Register Chart.js components
Chart.register(...registerables);

// Visualization type options
const VISUALIZATION_OPTIONS = [
  { value: 'bar', label: 'Bar Chart' },
  { value: 'line', label: 'Line Graph' },
  { value: 'pie', label: 'Pie Chart' },
  { value: 'doughnut', label: 'Doughnut Chart' },
  { value: 'polarArea', label: 'Polar Area Chart' },
];

const DataVisualization = () => {
  // Reference to the chart container for export
  const chartRef = useRef(null);
  
  // State for data table
  const [tableData, setTableData] = useState([
    { id: 1, x: '', y: '' },
    { id: 2, x: '', y: '' }
  ]);
  
  // State for visualization options
  const [visualizationType, setVisualizationType] = useState('bar');
  const [chartData, setChartData] = useState(null);
  const [chartTitle, setChartTitle] = useState('');
  const [xAxisLabel, setXAxisLabel] = useState('X Axis');
  const [yAxisLabel, setYAxisLabel] = useState('Y Axis');
  
  // Error handling
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  
  // Add a new row to the table
  const handleAddRow = () => {
    const newId = tableData.length > 0 ? Math.max(...tableData.map(row => row.id)) + 1 : 1;
    setTableData([...tableData, { id: newId, x: '', y: '' }]);
  };
  
  // Remove a row from the table
  const handleRemoveRow = (id) => {
    setTableData(tableData.filter(row => row.id !== id));
  };
  
  // Handle changes to the table data
  const handleTableCellChange = (id, field, value) => {
    const updatedTableData = tableData.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    );
    setTableData(updatedTableData);
  };
  
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length === 0) {
          setError('The uploaded file has no data.');
          return;
        }
        
        // Check if we have proper x and y columns
        const firstRow = jsonData[0];
        const keys = Object.keys(firstRow);
        
        if (keys.length < 2) {
          setError('The uploaded file must have at least two columns.');
          return;
        }
        
        // Map the data to our format
        const mappedData = jsonData.map((row, index) => ({
          id: index + 1,
          x: row[keys[0]].toString(),
          y: parseFloat(row[keys[1]])
        }));
        
        setTableData(mappedData);
        setXAxisLabel(keys[0]);
        setYAxisLabel(keys[1]);
        setError('');
      } catch (err) {
        setError('Error processing file. Please check the file format.');
        console.error('Error processing file:', err);
      }
    };
    reader.readAsArrayBuffer(file);
    
    // Reset the input
    event.target.value = null;
  };
  
  // Generate chart data from table data
  const generateChartData = () => {
    // Validate data
    if (tableData.length === 0) {
      setError('No data available to visualize.');
      return;
    }
    
    const invalidData = tableData.some(row => !row.x || row.y === '');
    if (invalidData) {
      setError('Please fill in all cells in the table.');
      return;
    }
    
    // Create labels and data arrays
    const labels = tableData.map(row => row.x);
    const data = tableData.map(row => parseFloat(row.y));
    
    // Random colors for each data point
    const backgroundColor = tableData.map(() => 
      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
    );
    
    const newChartData = {
      labels,
      datasets: [
        {
          label: yAxisLabel,
          data,
          backgroundColor,
          borderColor: backgroundColor.map(color => color.replace('0.6', '1')),
          borderWidth: 1,
        },
      ],
    };
    
    setChartData(newChartData);
    setShowPreview(true);
    setError('');
  };
  
  // Export chart as PNG
  const exportChartAsPNG = () => {
    if (!chartData) {
      setError('Please generate a chart first.');
      return;
    }
    
    const chartElement = chartRef.current;
    if (!chartElement) {
      setError('Chart container not found.');
      return;
    }
    
    setError(''); // Clear any previous errors
    
    // Use html2canvas to capture the chart container
    html2canvas(chartElement, {
      backgroundColor: '#f9f9f9',
      scale: 2, // Higher scale for better quality
      logging: false,
      useCORS: true // To handle cross-origin images
    }).then(canvas => {
      // Create a temporary link to download the image
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${chartTitle || 'chart'}-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(err => {
      console.error('Error exporting chart:', err);
      setError('Failed to export chart as PNG. Please try again.');
    });
  };
  
  // Reset the form
  const handleReset = () => {
    setTableData([
      { id: 1, x: '', y: '' },
      { id: 2, x: '', y: '' }
    ]);
    setChartData(null);
    setShowPreview(false);
    setChartTitle('');
    setXAxisLabel('X Axis');
    setYAxisLabel('Y Axis');
    setError('');
  };
  
  // Render the appropriate chart component based on the selected visualization type
  const renderChart = () => {
    if (!chartData) return null;
    
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: !!chartTitle,
          text: chartTitle,
        },
      },
      scales: visualizationType !== 'pie' && visualizationType !== 'doughnut' && visualizationType !== 'polarArea' ? {
        x: {
          title: {
            display: true,
            text: xAxisLabel,
          },
        },
        y: {
          title: {
            display: true,
            text: yAxisLabel,
          },
        },
      } : undefined,
    };
    
    switch (visualizationType) {
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'line':
        return <Line data={chartData} options={options} />;
      case 'pie':
        return <Pie data={chartData} options={options} />;
      case 'doughnut':
        return <Pie data={chartData} options={{...options, cutout: '50%'}} />;
      case 'polarArea':
        return <Pie data={chartData} options={{...options, cutout: '0%'}} />;
      default:
        return <Bar data={chartData} options={options} />;
    }
  };
  
  return (
    <>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Data Visualization
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Upload your data or enter it manually to create visualizations for your speech.
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        {/* Data Input Section */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Data Input
          </Typography>
          
          {/* File Upload */}
          <Box mb={3}>
            <Typography variant="body2" color="textSecondary" paragraph>
              Upload a CSV or Excel file with your data. The first column will be used for labels (X-axis) and the second column for values (Y-axis).
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<FileUploadIcon />}
              sx={{ mr: 2 }}
            >
              Upload File
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleReset}
              sx={{ mr: 2 }}
            >
              Reset
            </Button>
          </Box>
          
          {/* Manual Data Entry */}
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Manual Data Entry
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Enter your data manually in the table below.
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Chart Title"
                  value={chartTitle}
                  onChange={(e) => setChartTitle(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="X-Axis Label"
                  value={xAxisLabel}
                  onChange={(e) => setXAxisLabel(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Y-Axis Label"
                  value={yAxisLabel}
                  onChange={(e) => setYAxisLabel(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
            
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width="50">#</TableCell>
                    <TableCell>Label (X-Axis)</TableCell>
                    <TableCell>Value (Y-Axis)</TableCell>
                    <TableCell width="50">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <TextField
                          value={row.x}
                          onChange={(e) => handleTableCellChange(row.id, 'x', e.target.value)}
                          size="small"
                          fullWidth
                          placeholder="Enter label"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={row.y}
                          onChange={(e) => handleTableCellChange(row.id, 'y', e.target.value)}
                          size="small"
                          fullWidth
                          placeholder="Enter value"
                          type="number"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => handleRemoveRow(row.id)}
                          disabled={tableData.length <= 1}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={handleAddRow}
              sx={{ mb: 2 }}
            >
              Add Row
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {/* Visualization Options */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Visualization Options
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Select the type of visualization you want to create.
          </Typography>
          
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="visualization-type-label">Visualization Type</InputLabel>
                <Select
                  labelId="visualization-type-label"
                  id="visualization-type"
                  value={visualizationType}
                  label="Visualization Type"
                  onChange={(e) => setVisualizationType(e.target.value)}
                >
                  {VISUALIZATION_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<BarChartIcon />}
                  onClick={generateChartData}
                >
                  Visualize
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CloudDownloadIcon />}
                  onClick={exportChartAsPNG}
                  disabled={!chartData}
                >
                  Export as PNG
                </Button>
              </Box>
            </Grid>
          </Grid>
          
          {error && (
            <Box mt={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
        </Box>
        
        {/* Chart Preview */}
        {showPreview && chartData && (
          <Box mb={4}>
            <Typography variant="h5" gutterBottom>
              Chart Preview
            </Typography>
            <Paper 
              elevation={2} 
              sx={{ p: 3, backgroundColor: '#f9f9f9' }}
            >
              <Box id="chart-container" ref={chartRef} sx={{ height: 400 }}>
                {renderChart()}
              </Box>
            </Paper>
          </Box>
        )}
      </Paper>
    </>
  );
};

export default DataVisualization; 