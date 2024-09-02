import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function PageViewsBarChart() {
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
          series={[
            {
              id: 'page-views',
              label: 'Page views',
              data: [2234, 3872, 2998],
              stack: 'A',
            },
            {
              id: 'downloads',
              label: 'Downloads',
              data: [3098, 4215, 2384],
              stack: 'A',
            },
            {
              id: 'conversions',
              label: 'Conversions',
              data: [4051, 2275, 3129],
              stack: 'A',
            },
          ]}
          height={360}
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