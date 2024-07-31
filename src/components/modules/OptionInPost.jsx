import { useState } from "react";

import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import ThumbUpIconAlt from "@mui/icons-material/ThumbUp";
import ThumbDownIconAlt from "@mui/icons-material/ThumbDown";

function OptionInPost() {
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);

  const likeHandler = () => {
    if (disLike) return;

    setLike((value) => !value);
  };

  const disLikeHandler = () => {
    if (like) return;

    setDisLike((value) => !value);
  };

  return (
    <>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="یادداشت شما..."
      />
      <Typography
        mt={1}
        mb={2}
        component="p"
        variant="p"
        color="secondary"
        fontSize="0.7rem"
        textAlign="right"
        width="100%"
      >
        یادداشت ها فقط برای شما قابل دیدن است و پس از حذف آگهی پاک خواهند شد.
      </Typography>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography component="p" variant="p">
          بازخورد شما از این آگهی چیست؟
        </Typography>

        <Box>
          <IconButton onClick={disLikeHandler}>
            <ThumbDownIconAlt sx={disLike ? { color: "red" } : null} />
          </IconButton>
          <IconButton onClick={likeHandler}>
            <ThumbUpIconAlt sx={like ? { color: "green" } : null} />
          </IconButton>
        </Box>
      </Box>
      <Divider component="li" sx={{ width: "100%", margin: "16px auto" }} />{" "}
    </>
  );
}

export default OptionInPost;
