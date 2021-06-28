import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import MathInputArea from "../../components/MathInputArea";
import UpdootSection from "../../components/UpdootSection";
import { useMeQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post: React.FC<{}> = ({}) => {
  const [{ data: isThisMeData }] = useMeQuery();
  const [{ data, error, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div> loading.. </div>
      </Layout>
    );
  }

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>
          Unless you have a time machine, this content is no longer available.
        </Box>
      </Layout>
    );
  }
  return (
    <Layout>
      <Flex align="center">
        <Box flex={1}>
          <Heading mb="4">{data.post?.title}</Heading>
        </Box>
        <Box ml="auto">
          <UpdootSection
            post={data.post}
            disableVoting={isThisMeData?.me?.id === data.post.creator.id}
          ></UpdootSection>
        </Box>
      </Flex>
      <Text mb="4">{"posted by " + data.post?.creator.username}</Text>
      <Flex mx="auto">
        {isThisMeData?.me?.id === data.post?.creator.id ? (
          <Box flex={1} ml="auto">
            <EditDeletePostButtons
              id={data.post.id}
              creatorId={data.post.creator.id}
              inDetailedView
            />
          </Box>
        ) : null}
      </Flex>
      <Box mt="2" overflow="hidden">
        <MathInputArea children={data?.post.text} />
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
