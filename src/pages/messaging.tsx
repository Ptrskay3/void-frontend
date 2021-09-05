import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";

interface messagingProps {}

// TODO
const Messaging: React.FC<messagingProps> = ({}) => {
  return <div>Not implemented</div>;
};

export default withUrqlClient(createUrqlClient)(Messaging);
