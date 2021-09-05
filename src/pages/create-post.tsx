import { Box, Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import MathInputArea from "../components/MathInputArea";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const [textInput, setTextInput] = useState("");
  const [titleInput, setTitleInput] = useState("");

  const [, createPost] = useCreatePostMutation();
  return (
    <Layout variant="regular">
      <Formik
        enableReinitialize={true}
        initialValues={{ title: titleInput, text: textInput }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              value={titleInput}
              name="Title"
              placeholder="Your post's title"
              label="Title"
              onChange={(e) => {
                setTitleInput(e.target.value);
              }}
            />
            <Box mt={4}>
              <InputField
                height="160px"
                value={textInput}
                name="Text"
                placeholder="Text.."
                label="Body"
                textarea
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
              />
            </Box>
            <Box mt="4">
              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                Create Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Box mt="4">
        <Heading mt={2} size="md">
          Body preview:
        </Heading>
        <Box mt="4">
          <MathInputArea children={textInput} />
        </Box>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
