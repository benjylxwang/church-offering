import GeneralOfferingForm from "./components/forms/GeneralOfferingForm";
import EnvelopesForm from "./components/forms/EnvelopesForm";
import ServiceForm from "./components/forms/ServiceForm";
import { Container, Stack } from "@mui/material";
import Header from "./components/Header";

function App() {
  return (
    <Container>
      <Stack gap={4}>
        <Header />
        <ServiceForm />
        <GeneralOfferingForm />
        <EnvelopesForm />
      </Stack>
    </Container>
  );
}

export default App;
