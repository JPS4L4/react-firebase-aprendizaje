import { Button, Container, Grid, Typography } from "@mui/material";
import { logout } from "../config/firebase";
import { useEffect, useState } from "react";
import fetchData from "../data/fetchData";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData({ link: "https://jsonplaceholder.typicode.com/photos", setData });
  }, []);

  const HandleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Container sx={{ display: "flex", justifyContent:"space-between",textAlign: "center", mx: "auto" }}>
          <Typography variant="h2" sx={{ padding: 4 }}>
            Dashboard
          </Typography>
          <Button
            variant="contained"
            onClick={HandleLogOut}
            sx={{
              ml: 2,
              bgcolor: "red",
              padding: 4,
              margin: 4,
              textAlign: "center",
            }}
          >
            Log Out
          </Button>
        </Container>
        <Grid container spacing={2}>
          {data &&
            data.map((photo) => (
              <Grid
                item
                key={photo.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ textAlign: "center", bgcolor: "#FFF" }}
              >
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <Typography variant="h6">
                    {photo.id} - {photo.title}
                  </Typography>
                </div>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
