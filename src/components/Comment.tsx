import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import {
  PostQuery,
  useDeleteMessageMutation,
  useMeQuery,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { Wrapper } from "./Wrapper";

interface CommentProps {
  props: PostQuery["post"]["messages"][number];
}

export const Comment: React.FC<CommentProps> = ({ props }) => {
  const router = useRouter();
  const [{ data: isThisMe }] = useMeQuery();
  const [{}, deleteMessage] = useDeleteMessageMutation();

  const date = new Date(parseInt(props.createdAt));
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <Wrapper>
      <Box>
        <Flex mr="4" mt="2" alignItems="center">
          <Box mb="1" ml="2" flex="1">
            <Text as="em">{props.user.username}</Text>
          </Box>
          <Box>
            <Text as="em">
              {date.toLocaleDateString(undefined, options as any)}
            </Text>
          </Box>

          {isThisMe?.me?.id === props.user.id ? (
            <Flex ml="2" mr="2">
              <IconButton
                ml="auto"
                onClick={() => {
                  deleteMessage({ id: props.id });
                  router.reload();
                }}
                aria-label="delete comment"
                icon={<DeleteIcon />}
              ></IconButton>
            </Flex>
          ) : null}
        </Flex>
        <Flex mb="4" mx="2" mt="2" alignItems="center">
          <Text wordBreak="break-all">{props.text}</Text>
        </Flex>
      </Box>
    </Wrapper>
  );
};
