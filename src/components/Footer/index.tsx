import { Box, Divider, Typography } from "@mui/material";

interface FooterProps {
  role?: string;
  mini?: boolean;
}

const Footer = (props: FooterProps) => {
  const { mini } = props;
  const currentYear = new Date().getFullYear();

  return (
    <Box>
      <Divider />

      <Typography variant="caption" textAlign={"center"}>
        {!mini && `© ${currentYear} All rights reserved.`}
      </Typography>
    </Box>
  );
};

export default Footer;
