import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { useNewMessageSubscription } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface messagingProps {}

const Messaging: React.FC<messagingProps> = ({}) => {
  const [{ data }] = useNewMessageSubscription();
  const [messages, setMessages] = useState(null);

  //   useEffect(() => {
  //     // setMessages(data);
  //   }, [data]);
  console.log(data);
  return (
    <div>{/* {messages?.map((m) => (
        <div>m</div>
      ))} */}</div>
  );
};

export default withUrqlClient(createUrqlClient)(Messaging);
