import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

function PageNotFound() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const text = "صفحه مورد نظر پیدا نشد!!";

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      typeAnimation();
    }, 100);
    return () => clearTimeout(timer);
  }, [index]);

  const typeAnimation = () => {
    if (index < text.length) {
      setDisplayText((prevText) => prevText + text[index]);
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      <Typography component="h2" variant="h2" color="primary" my={3}>
        404
      </Typography>
      <Typography component="p" variant="h5" color="secondary" my={2}>
        {displayText}
      </Typography>

      <Button
        variant="outlined"
        sx={{ width: "180px", marginTop: "32px" }}
        onClick={() => navigate("/", { once: true, replace: true })}
      >
        بازگشت به صفحه اصلی
      </Button>
    </Box>
  );
}

export default PageNotFound;
