import { Box, Typography } from "@mui/material";

function NotFoundPosts() {
  return (
    <>
      <Box component="div" sx={{ margin: "24px auto", textAlign: "center" }}>
        <Typography
          component="h6"
          variant="h6"
          display="inline-block"
          sx={{
            borderBottom: "2px solid #A62626",
            padding: "2px 8px",
          }}
        >
          موردی یافت نشد!
        </Typography>
      </Box>
    </>
  );
}

export default NotFoundPosts;
