import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [{}, register] = useRegisterMutation();
  const [{}, login] = useLoginMutation();
  return (
    <Layout>
      <Wrapper variant="small">
        <Box mb={5} mt={5}>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Warning!</AlertTitle>
            <AlertDescription>Do not use real credentials!</AlertDescription>
          </Alert>
        </Box>
        <Formik
          initialValues={{ username: "", password: "", email: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register(values);
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              // worked
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="Your name"
                label="Username"
              />
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="your@email.com"
                  label="Email"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="Your password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Flex mt={2}>
                <NextLink href="/login">
                  <Link ml="auto">Already have an account?</Link>
                </NextLink>
              </Flex>
              <Box mt="4">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  Register
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Box mt={4}>
          <Button
            type="submit"
            colorScheme="teal"
            onClick={async () => {
              const response = await login({
                usernameOrEmail: "user",
                password: "user",
              });
              if (response.data?.login.errors) {
                // this is unreachable
              } else if (response.data?.login.user) {
                if (typeof router.query.next === "string") {
                  router.push(router.query.next);
                } else {
                  router.push("/");
                }
              } else {
                // unreachable
              }
            }}
          >
            I'm just testing, give me an account!
          </Button>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Register);
