import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import Layout from "./components/layout/Layout";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Container maxWidth="lg">
            <Box component="main" sx={{ padding: "0 16px" }}>
              <Router />
            </Box>
          </Container>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
