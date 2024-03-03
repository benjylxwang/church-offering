import OfferingForm from "./components/forms/OfferingForm";
import { Container, Stack } from "@mui/material";

function App() {
  return (
    <Container>
      <Stack gap={4} mb={4} mt={4}>
        <OfferingForm />
      </Stack>
    </Container>
  );
}

export default App;
