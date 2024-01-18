import { Control, UseFormWatch, useFieldArray } from "react-hook-form";
import { Offering } from "../../types/offering";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import { useMemo, useState } from "react";
import { formatter } from "../../helpers/currency-formatter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EnvelopeField from "../form-elements/EnvelopeField";

type Props = {
  control: Control<Offering>;
  watch: UseFormWatch<Offering>;
  defaultOpen?: boolean;
};

export const calculateTotalEnvelopes = (
  envelopes: Offering["envelopes"],
  type?: "cash" | "cheque"
): number => {
  let total = 0;
  envelopes.forEach((envelope) => {
    if (type === "cash") {
      total += Number(envelope.cashAmount);
    } else if (type === "cheque") {
      total += Number(envelope.chequeAmount);
    } else {
      total += Number(envelope.cashAmount) + Number(envelope.chequeAmount);
    }
  });
  return total;
};

function EnvelopesForm({ control, watch, defaultOpen }: Props) {
  const offering = watch();
  const totalEnvelopes = useMemo(() => {
    const total = calculateTotalEnvelopes(offering.envelopes);
    return formatter.format(total);
  }, [offering]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "envelopes",
  });
  const [expanded, setExpanded] = useState(defaultOpen ?? false);

  return (
    <Accordion
      expanded={expanded}
      variant="outlined"
      onChange={() => setExpanded((old) => !old)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Envelopes: {totalEnvelopes}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={2}>
          <Stack gap={2}>
            {fields.map((field, index) => (
              <Stack key={field.id} gap={2}>
                <EnvelopeField
                  key={field.id}
                  control={control}
                  index={index}
                  remove={remove}
                />
                {index < fields.length - 1 && <Divider />}
              </Stack>
            ))}
            <Button
              variant="outlined"
              onClick={() =>
                append({ number: "", chequeAmount: "", cashAmount: "" })
              }
            >
              Add
            </Button>
          </Stack>
          <Stack direction="row">
            <Typography variant="caption" flex={1}>
              Add the amounts in any envelopes above
            </Typography>
            <Typography variant="h5" textAlign="right">
              Total: {totalEnvelopes}
            </Typography>
          </Stack>
          <Button onClick={() => setExpanded(false)}>Close</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default EnvelopesForm;
