import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { Control, UseFormWatch } from "react-hook-form";
import { Offering, CashNotes, CashValues } from "../../types/offering";
import CashField from "../form-elements/CashField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMemo, useState } from "react";
import { formatter } from "../../helpers/currency-formatter";

type Props = {
  defaultOpen?: boolean;
  control: Control<Offering>;
  watch: UseFormWatch<Offering>;
};

export const calculateTotalCash = (cash: Offering["cash"]): number => {
  let total = 0;
  Object.values(CashNotes).forEach((cashType) => {
    total += Number(CashValues[cashType]) * Number(cash[cashType]);
  });
  return total;
};

export const CashForm = ({ defaultOpen, control, watch }: Props) => {
  const cashWatch = Object.values(CashNotes).reduce(
    (a, v) => ({ ...a, [v]: watch(`cash.${v}`) }),
    {} as Offering["cash"]
  );
  const totalCash = useMemo(() => {
    const total = calculateTotalCash(cashWatch);
    return formatter.format(total);
  }, [cashWatch]);

  const [expanded, setExpanded] = useState(defaultOpen ?? false);

  return (
    <Accordion
      expanded={expanded}
      variant="outlined"
      onChange={() => setExpanded((old) => !old)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Cash: {totalCash}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={2}>
          <Stack gap={2} direction="row" flexWrap="wrap">
            {Object.values(CashNotes).map((name) => (
              <CashField
                key={name}
                control={control}
                name={name}
                watch={watch}
              />
            ))}
          </Stack>
          <Stack direction="row" gap={2}>
            <Typography variant="caption" flex={1}>
              Please count the number of notes and coins and input the counts
              above
            </Typography>
            <Typography variant="h5" textAlign="right">
              Total: {totalCash}
            </Typography>
          </Stack>
          <Button onClick={() => setExpanded(false)}>Close</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
