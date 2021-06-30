import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
// import { useRouter } from "next/router";
import { Card } from "../../components/profile/Card";
import { CardContent } from "../../components/profile/CardContent";
import { CardHeader } from "../../components/profile/CardHeader";
import { Property } from "../../components/profile/Property";
import { HiPencilAlt } from "react-icons/hi";
import { useMeQuery, useNumberOfPostsQuery } from "../../generated/graphql";
import { Layout } from "../../components/Layout";

interface idProps {}

const idPage: React.FC<idProps> = () => {
  // const router = useRouter();
  // const { id } = router.query;
  const [{ data }] = useMeQuery();
  const [{ data: numberOfPosts }] = useNumberOfPostsQuery({
    variables: { userid: data?.me?.id },
  });

  console.log(numberOfPosts);

  if (!data?.me?.username) {
    return <Layout>{"You're not logged in."}</Layout>;
  }

  return (
    <Layout>
      <Box
        as="section"
        bg={useColorModeValue("gray.100", "inherit")}
        py="12"
        px={{ md: "8" }}
      >
        <Card maxW="3xl" mx="auto">
          <CardHeader
            title="Account Info"
            action={
              <Button
                variant="outline"
                minW="20"
                isDisabled={true}
                leftIcon={<HiPencilAlt />}
              >
                Edit
              </Button>
            }
          />
          <CardContent>
            <Property label="Name" value={data?.me?.username} />
            <Property label="Email" value={data?.me?.email} />
            <Property
              label="Number of posts"
              value={numberOfPosts?.numberOfPosts as unknown as string}
            />
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(idPage);
