import Grid from "@mui/material/Grid2";
import { Item } from "../MaterialSnippets/MaterialSnippets";

const InProgress = () => {
    return (
        <Grid container size={{ xs: 12, sm: 12, md: 4 }} >
            <Grid size={12}>
                <Item>size=2</Item>
            </Grid>
            <Grid size={12}>
                <Item>size=2</Item>
            </Grid>
        </Grid>
    );
};

export default InProgress;