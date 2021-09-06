import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import MathInputArea from "../../components/MathInputArea";
import UpdootSection from "../../components/UpdootSection";
import { useCreateMessageMutation, useMeQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { Comment } from "../../components/Comment";
import { Form, Formik } from "formik";
import { InputField } from "../../components/InputField";
import { useRouter } from "next/router";

const Post: React.FC<{}> = ({}) => {
  const [{ data: isThisMeData }] = useMeQuery();
  const [{ data, error, fetching }] = useGetPostFromUrl();
  const [, createMessage] = useCreateMessageMutation();
  const router = useRouter();

  const [commentInput, setCommentInput] = useState("");

  if (fetching) {
    return (
      <Layout>
        <div> loading.. </div>
      </Layout>
    );
  }

  if (!data?.post || error) {
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
      <Divider mt="2" />

      {data?.post?.messages.length > 0 ? (
        <Box mt="auto">
          <Flex>
            <Box flex="1">
              <Text fontSize="xl">Comments:</Text>
            </Box>
          </Flex>
        </Box>
      ) : (
        <Box mt="auto">
          <Flex>
            <Box flex="1">
              <Text fontSize="xl">No comments yet</Text>
            </Box>
          </Flex>
        </Box>
      )}

      <Flex>
        <Box flex="1" mt="auto">
          {data?.post?.messages?.map((message) => (
            <Flex mt="4" shadow="md" borderWidth="1px" overflow="hidden" mb={4}>
              <Box flex="1" alignItems="center">
                <Comment props={message} />
              </Box>
            </Flex>
          ))}
        </Box>
      </Flex>

      {isThisMeData?.me ? (
        <Formik
          enableReinitialize={true}
          initialValues={{ text: commentInput }}
          onSubmit={async ({ text }) => {
            const { error } = await createMessage({
              input: { postId: data?.post?.id, text },
            });
            if (!error) {
              router.reload();
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <InputField
                  // height="160px"
                  value={commentInput}
                  name="text"
                  placeholder="Leave your comment here."
                  label=""
                  onChange={(e) => {
                    setCommentInput(e.target.value);
                  }}
                />
              </Box>
              <Box mt="4" mb="8">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  Comment
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
