import {
  Box,
  Button,
  Card,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

type Props = {
  label: string;
};

export const WitnessForm = ({ label }: Props) => {
  const [open, setOpen] = useState(false);

  const signatureRef = useRef<ReactSignatureCanvas>(null);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Sign {label}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Stack p={2} gap={2}>
          <TextField required label="Name" />
          <Box>
            <Typography>Signature</Typography>
            <Card variant="outlined">
              <ReactSignatureCanvas
                canvasProps={{ width: "300px", height: "150px" }}
                ref={signatureRef}
              />
            </Card>
          </Box>
          <Stack direction="row" gap={2} justifyContent="space-between">
            <Button onClick={() => signatureRef.current?.clear()}>Clear</Button>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};
