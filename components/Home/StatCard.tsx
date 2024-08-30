"use client";

import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";

const StatCard = ({ logo_img, title, count, palette }: Partial<StatCardProps>) => {
  return (
    <Card variant="outlined" sx={{ height: '100%', px: 2, py: 3 }} className="flex-between">
      <CardContent sx={{ p: 0, gap: '25px' }} className="flex-column-between">
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}
        >
          <Stack sx={{ justifyContent: 'space-between' }}>
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="h4" component="p">
                {count}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <CardMedia component={"div"} sx={{ bgcolor: palette, display: 'flex' }} className="stat-card-logo">
        {logo_img}
      </CardMedia>
    </Card>
  )
}

export default StatCard