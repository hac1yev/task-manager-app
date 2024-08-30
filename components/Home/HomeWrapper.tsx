"use client";

import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import FindReplaceOutlinedIcon from '@mui/icons-material/FindReplaceOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StatCard from "./StatCard";
import './Home.css';
import PageViewsBarChart from "./PageViewsBarChart";
import CustomizedDataGrid from "./CustomizedDataGrid";
import Users from "./Users";

const data: StatCardProps[] = [
  {
    id: "total",
    title: "TOTAL TASKS",
    count: 9,
    logo_img: <ListAltIcon sx={{ color: '#fff' }} />,
    palette: '#1D53E3'
  },
  {
    id: "total",
    title: "COMPLETED TASKS",
    count: 1,
    logo_img: <EventAvailableOutlinedIcon sx={{ color: '#fff' }} />,
    palette: '#0B6F70'
  },
  {
    id: "total",
    title: "TASKS IN PROGRESS",
    count: 3,
    logo_img: <FindReplaceOutlinedIcon sx={{ color: '#fff' }} />,
    palette: '#FDA003'
  },
  {
    id: "total",
    title: "TODOS",
    count: 5,
    logo_img: <DriveFileMoveOutlinedIcon sx={{ color: '#fff' }} />,
    palette: '#C52E5C'
  },
];

const HomeWrapper = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
      <Grid
        container
        spacing={1}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard 
                logo_img={card.logo_img} 
                count={card.count} 
                title={card.title} 
                palette={card.palette}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        spacing={1}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={12} sx={{ mb: (theme) => theme.spacing(2) }}>
          <PageViewsBarChart />
        </Grid>
        <Grid size={{ sm: 7 }} sx={{ mb: (theme) => theme.spacing(2) }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ sm: 5 }} sx={{ mb: (theme) => theme.spacing(2) }}>
          <Users />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeWrapper;
