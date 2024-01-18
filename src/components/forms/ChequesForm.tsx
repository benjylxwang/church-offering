import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Control, UseFormWatch, useFieldArray } from "react-hook-form";
import { Offering } from "../../types/offering";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMemo, useState } from "react";
import { formatter } from "../../helpers/currency-formatter";
import ChequeField from "../form-elements/ChequeField";

export const calculateTotalCheques = (cheques: Offering["cheques"]): number => {
  let total = 0;
  cheques.forEach((cheque) => {
    total += Number(cheque.amount);
  });
  return total;
};

type Props = {
  defaultOpen?: boolean;
  control: Control<Offering>;
  watch: UseFormWatch<Offering>;
};

export const ChequesForm = ({ defaultOpen, control, watch }: Props) => {
  const cheques = watch("cheques");
  const totalCheques = useMemo(() => {
    const total = calculateTotalCheques(cheques);
    return formatter.format(total);
  }, [cheques]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cheques",
  });
  const [expanded, setExpanded] = useState(defaultOpen ?? false);

  return (
    <Accordion
      expanded={expanded}
      variant="outlined"
      onChange={() => setExpanded((old) => !old)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Cheques: {totalCheques}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={2}>
          <Stack gap={2}>
            {fields.map((field, index) => (
              <Stack key={field.id} gap={2}>
                <ChequeField
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
              onClick={() => append({ name: "", amount: "" })}
            >
              Add
            </Button>
          </Stack>
          <Stack direction="row" gap={2}>
            <Typography variant="caption" flex={1}>
              Add the name and value of any cheques above
            </Typography>
            <Typography variant="h5" textAlign="right">
              Total: {totalCheques}
            </Typography>
          </Stack>
          <Button onClick={() => setExpanded(false)}>Close</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
