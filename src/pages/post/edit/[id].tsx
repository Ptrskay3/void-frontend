import { Box, Button, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { useRouter } from "next/router";
import MathInputArea from "../../../components/MathInputArea";
import { useIsAuth } from "../../../utils/useIsAuth";

const EditPost: React.FC<{}> = ({}) => {
  useIsAuth();

  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [{}, updatePost] = useUpdatePostMutation();

  const [textInput, setTextInput] = useState("");
  const [titleInput, setTitleInput] = useState("");

  useEffect(() => {
    setTextInput(data?.post?.text || "");
    setTitleInput(data?.post?.title || "");
  }, [data]);

  if (fetching) {
    return (
      <Layout>
        <div>Loading post..</div>
      </Layout>
    );
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
    <Layout variant="regular">
      <Formik
        enableReinitialize={true}
        initialValues={{ title: titleInput, text: textInput }}
        onSubmit={async (values) => {
          await updatePost({ id: intId, ...values });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              value={titleInput}
              name="title"
              placeholder="Your post's title"
              label="title"
              onChange={(e) => {
                setTitleInput(e.target.value);
              }}
            />
            <Box mt={4}>
              <InputField
                height="160px"
                value={textInput}
                name="text"
                placeholder="text..."
                label="body"
                textarea
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
              />
            </Box>
            <Box mt="4">
              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                Update Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Heading mt={2} size="md">
        Body preview:
      </Heading>
      <Box mt="4">
        <MathInputArea children={textInput} />
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditPost);
