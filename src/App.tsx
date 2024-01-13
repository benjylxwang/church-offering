import OfferingForm from "./components/forms/OfferingForm";
import { Container, Stack } from "@mui/material";
import Header from "./components/Header";

function App() {
  return (
    <Container>
      <Stack gap={4} mb={4}>
        <Header />
        <OfferingForm />
      </Stack>
    </Container>
  );
}

export default App;
