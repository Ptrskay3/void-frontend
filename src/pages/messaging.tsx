import { withUrqlClient } from "next-urql";
import React from "react";
import { useNewMessageSubscription } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface messagingProps {}

const Messaging: React.FC<messagingProps> = ({}) => {
  const [{ data }] = useNewMessageSubscription();

  console.log(data);
  return (
    <div>
      {/* {messages?.map((m) => (
        <div>m</div>
      ))} */}
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Messaging);
