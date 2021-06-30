import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  Spacer,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link"; // client-side routing
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";
import { WhatIsThis } from "./WhatIsThis";
import { AddIcon } from "@chakra-ui/icons";
import Image from "next/image";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [isLargeScreen] = useMediaQuery("(min-width: 500px)");
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  // loading data
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr="4" color="white">
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white" mr="4">
            Register
          </Link>
        </NextLink>
      </>
    );
    // user logged in
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button as={Link} mr="4">
            <AddIcon /> &nbsp; Create
          </Button>
        </NextLink>
        <NextLink href="/profile/me">
          <Link color="white" mr="4">
            <Box mr="2" color="lightgray">
              {data.me.username}
            </Box>
          </Link>
        </NextLink>
        <Button
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
          variant="link"
          color="white"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="black" p="4">
      <Flex flex="1" m="auto" align="center" maxW={800}>
        {isLargeScreen ? (
          <NextLink href="/">
            <Link>
              <Image
                src="/logo_transparent.png"
                alt="voidphysics"
                width="170"
                height="50"
              />
            </Link>
          </NextLink>
        ) : (
          <NextLink href="/">
            <Link>
              <Heading color="white">V</Heading>
            </Link>
          </NextLink>
        )}
        <Spacer />
        <Box mr="4" ml="4">
          <WhatIsThis />
        </Box>
        <Box ml="auto">{body}</Box>
      </Flex>
    </Flex>
  );
};
