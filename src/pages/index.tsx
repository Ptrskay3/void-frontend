import {
  Box,
  Center,
  createStandaloneToast,
  Flex,
  Heading,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import Footer from "../components/Footer";
import { Layout } from "../components/Layout";
import MathInputArea from "../components/MathInputArea";
import UpdootSection from "../components/UpdootSection";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as string | null,
  });
  const [{ data, fetching, error }] = usePostsQuery({
    variables,
  });

  const [{ data: isThisMeData }] = useMeQuery();

  const toast = createStandaloneToast();

  useEffect(() => {
    var isFirstView = localStorage.getItem("isFirstView") || "";
    if (isFirstView !== "y") {
      /* Show message to user if this is the first view. */
      localStorage.setItem("isFirstView", "y");
      toast({
        title: "Tip",
        description: "Click on a post's title to see its full content.",
        status: "info",
        duration: 10000,
        isClosable: true,
      });
    }
  }, []);

  // TODO: handle more elegantly
  if (!fetching && !data) {
    return (
      <Layout>
        <div>
          Query failed... That's probably because you're on
          https://www.voidphysics.com. Remove the www from url.
        </div>
        <div>{error?.message}</div>
      </Layout>
    );
  }

  return !data && fetching ? (
    // TODO
    <Layout>
      <Box>
        <Center>
          <Text>
            <Spinner color="black" size="xl" />
          </Text>
        </Center>
      </Box>
    </Layout>
  ) : (
    <Layout>
      <InfiniteScroll
        dataLength={data?.posts.posts.length as number}
        next={() => {
          setVariables({
            limit: variables.limit,
            cursor: data!.posts.posts[data!.posts.posts.length - 1].createdAt,
          });
        }}
        hasMore={data!.posts.hasMore}
        loader={<h4>Loading posts... </h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <br />
            <b>That was all it, check back later!</b>
          </p>
        }
      >
        {data!.posts.posts.map((p) =>
          !p ? null : ( // this handles the deleted post logic
            <Flex
              key={p.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              overflow="scroll"
              mb={4}
            >
              <UpdootSection
                post={p}
                disableVoting={isThisMeData?.me?.id === p.creator.id}
              />
              <Box flex={1}>
                <Flex>
                  <Box flex={1}>
                    <NextLink href="post/[id]" as={`/post/${p.id}`}>
                      <Link>
                        <Heading fontSize="xl">{p.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text flex={1}>{"posted by " + p.creator.username}</Text>
                  </Box>
                  <Box ml="auto" mx={4}>
                    <EditDeletePostButtons id={p.id} creatorId={p.creator.id} />
                  </Box>
                </Flex>
                <Flex align="center">
                  <Text flex={1} mt={4}>
                    <MathInputArea children={p.textSnippet + "..."} />
                  </Text>
                </Flex>
              </Box>
            </Flex>
          )
        )}
      </InfiniteScroll>
      <Footer></Footer>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
