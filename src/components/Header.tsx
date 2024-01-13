import { Stack, Typography } from "@mui/material";

function Header() {
  return (
    <Stack
      mt={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h3">Offering</Typography>
      <img
        alt="logo"
        src="https://standrewsbaptist.org.uk/wp-content/uploads/2021/11/cropped-SABC-logo-colour.png"
        height={80}
      />
    </Stack>
  );
}

export default Header;
