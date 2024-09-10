"use client";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import { useTypedTaskSelector } from '@/store/task-slice';

export default function PageViewsBarChart() {
  const tasks = useTypedTaskSelector(state => state.taskReducer.tasks);
  const [data,setData] = React.useState({HIGH: 0, MEDIUM: 0, LOW: 0});
  
  React.useEffect(() => {
    const updatedData = { HIGH: 0, MEDIUM: 0, LOW: 0 };

    tasks.forEach((item) => {
      const { priority_level } = item;

      if (priority_level === 'HIGH' || priority_level === 'MEDIUM' || priority_level === 'LOW') {
        updatedData[priority_level] += 1;
      }
    });

    setData(updatedData);
  }, [tasks])  

  const theme = useTheme();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light, 
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Chart by Priority
        </Typography>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={
            [
              {
                scaleType: 'band',
                categoryGapRatio: 0.5,
                data: ['High', 'Medium', 'Low'],
              },
            ] as any
          }
          yAxis={[
            {
              scaleType: 'linear', 
              max: tasks.length, 
              min: 0, 
            },
          ]}
          series={[
            {
              id: 'task',
              label: 'Task',
              data: Object.values(data),
              stack: 'A',
            },
            
          ]}
          height={380}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}