import { Box, Stack } from "@chakra-ui/react";
import * as React from "react";
import { Copyright } from "./Copyright";
import { SourceLinks } from "./SourceLinks";

export const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    mx="auto"
    maxW="7xl"
    py="12"
    px={{ base: "4", md: "8" }}
  >
    <Stack justifyItems="center" alignContent="center">
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Copyright alignSelf={{ base: "center", sm: "start" }} />
        <SourceLinks />
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
