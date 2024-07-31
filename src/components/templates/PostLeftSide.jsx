import { Box } from "@mui/material";
import OptionInPost from "../modules/OptionInPost";
import styles from "../../styles/postLeftSide.module.css";
import divarImage from "../../assets/image/DivarLogo.png";

function PostLeftSide({ data }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <picture
        style={{
          width: "100%",
          marginBottom: "8px",
          padding: "5px",
          borderRadius: "4px",
        }}
      >
        <img
          // src={`${BASE_URL}${data.images[0]}`} cant show the image
          src={divarImage}
          alt={`${data.options.title} image`}
          style={{ width: "100%", borderRadius: "4px" }}
        />
      </picture>

      <Box component="div" className={styles.left_side_container}>
        <OptionInPost />
      </Box>
    </>
  );
}

export default PostLeftSide;
