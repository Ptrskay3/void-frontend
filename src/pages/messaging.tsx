import { withUrqlClient } from "next-urql";
import React from "react";
import { useNewMessageSubscription } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface messagingProps {}

// TODO
const Messaging: React.FC<messagingProps> = ({}) => {
  const [{ data }] = useNewMessageSubscription();

  return <div>Not implemented</div>;
};

export default withUrqlClient(createUrqlClient)(Messaging);
