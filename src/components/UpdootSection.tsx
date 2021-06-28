import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment | {}; // ugly, but pages/post/[id] needs the full post, not the fragment
  disableVoting?: boolean;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({
  post,
  disableVoting = false,
}) => {
  const [loadingState, setLoadingState] =
    useState<"updoot-loading" | "downdoot-loading" | "not-loading">(
      "not-loading"
    );
  const [{}, vote] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr="4">
      <IconButton
        onClick={async () => {
          // if (post.voteStatus === 1) {
          //   return;
          // }
          setLoadingState("updoot-loading");
          await vote({ postId: (post as PostSnippetFragment).id, value: 1 });
          setLoadingState("not-loading");
        }}
        aria-label="upvote"
        isLoading={loadingState === "updoot-loading"}
        icon={<ChevronUpIcon />}
        colorScheme={
          (post as PostSnippetFragment).voteStatus === 1 ? "green" : undefined
        }
        isDisabled={disableVoting}
      />
      <Text>{(post as PostSnippetFragment).points}</Text>
      <IconButton
        aria-label="downvote"
        onClick={async () => {
          // if (post.voteStatus === -1) {
          //   return;
          // }
          setLoadingState("downdoot-loading");
          await vote({ postId: (post as PostSnippetFragment).id, value: -1 });
          setLoadingState("not-loading");
        }}
        icon={<ChevronDownIcon />}
        isLoading={loadingState === "downdoot-loading"}
        colorScheme={
          (post as PostSnippetFragment).voteStatus === -1 ? "red" : undefined
        }
        isDisabled={disableVoting}
      />
    </Flex>
  );
};

export default UpdootSection;
