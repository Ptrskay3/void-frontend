import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";

interface WhatIsThisProps {}

export const WhatIsThis: React.FC<WhatIsThisProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>
        <QuestionIcon /> &nbsp; Help
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>What is this website?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {
                "This is a small web application with basic authentication, a post wall with Markdown and LaTeX integration, voting and commenting. This website was a challange for myself whether I'm capable of creating a fullstack site from scrach to production. Built with: TypeScript, React, Next.js, Node.js, PostgreSQL, Redis, GraphQL, Docker."
              }
            </Text>
            <Text>
              {
                "Where does the name come from? It was the first available domain name I've tried."
              }
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
