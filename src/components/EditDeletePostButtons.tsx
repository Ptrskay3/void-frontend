import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
  inDetailedView?: boolean;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
  inDetailedView = false,
}) => {
  const [{}, deletePost] = useDeletePostMutation();
  const [{ data: isThisMe }] = useMeQuery();

  if (isThisMe?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink
        href={inDetailedView ? "edit/[id]" : "post/edit/[id]"}
        as={`/post/edit/${id}`}
      >
        <IconButton
          as={Link}
          mr="4"
          ml="auto"
          aria-label="edit post"
          icon={<EditIcon />}
        ></IconButton>
      </NextLink>
      <IconButton
        ml="auto"
        onClick={() => {
          deletePost({ id });
        }}
        aria-label="delete post"
        icon={<DeleteIcon />}
      ></IconButton>
    </Box>
  );
};
