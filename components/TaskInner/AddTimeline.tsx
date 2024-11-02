"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";
import { taskDetailSliceActions } from "@/store/taskDetail-slice";
import FormControlLabel from "@mui/material/FormControlLabel";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import FormControl from "@mui/material/FormControl";
import { Button, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import uniqid from "uniqid";

const AddTimeline = ({ taskId }: { taskId: string }) => {
  const [activityData, setActivityData] = useState<
    Partial<{
      _id: string;
      name: string;
      created_at: string;
    }>
  >({});
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");

  const activityNames = useMemo(() => {
    return [
      { name: "Started" },
      { name: "Completed" },
      { name: "In Progress" },
      { name: "Commented" },
      { name: "Bug" },
      { name: "Assigned" },
    ];
  }, []);

  const handleChange = useCallback((name: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if(activityData.name !== name) {
        setActivityData({
            _id: uniqid(),
            name,
            created_at: new Date().toISOString(),
        });
    }else{
        setActivityData({});
    }
  }, [activityData.name]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (activityData.name) {
        
        await axiosPrivate.post(
            `/api/tasks/${taskId}/activity`,
            JSON.stringify({
                name:  activityData.name,
                created_at: activityData.created_at && new Date(activityData.created_at),
                description,
            }),
        {
            headers: {
            "Content-Type": "application/json",
            },
        }
        );

      dispatch(
        taskDetailSliceActions.addActivities({
          ...activityData,
          description,
        })
      );
      setDescription("");
    } else {
      console.log("Please select an activity.");
    }
  }, [activityData, axiosPrivate, description, dispatch, taskId]);

  return (
    <Box className="flex-column">
      <Typography variant={"h6"}>Add Activity</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container sx={{ my: 3 }}>
          {activityNames.map((data) => (
            <Grid size={4} key={data.name}>
              <FormControlLabel
                control={<Checkbox checked={activityData?.name === data.name} onChange={handleChange.bind(null, data.name)} />}
                label={data.name}
              />
            </Grid>
          ))}
        </Grid>
        <FormControl
          component={"textarea"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={17}
          sx={{ width: "100%", border: "1px solid #ccc", p: "5px" }}
        />
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddTimeline;