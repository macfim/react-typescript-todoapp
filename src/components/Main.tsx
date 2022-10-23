import { useState } from "react";
import {
  Flex,
  Box,
  Container,
  Divider,
  Stack,
  Input,
  Text,
  Button,
  IconButton,
  HStack,
  CloseButton,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

import { useAlert } from "../hooks/useAlert";

import { PlusIcon } from "@heroicons/react/24/outline";
import AlertItem from "./AlertItem";

interface ITodo {
  id: number;
  body: string;
}

const Main: React.FC = () => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const { alerts, removeAlert, notifie } = useAlert();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo) return notifie("Form", "Should Not Be Empty.", "error");

    setTodoList((prev) => [
      ...prev,
      { id: new Date().getTime(), body: newTodo },
    ]);
    notifie("Task", `Added \"${newTodo}\".`, "success");
    setNewTodo("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleRemove = (id: number) => {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
    notifie(
      "Task",
      `Removed \"${todoList.find((item) => item.id === id)?.body}\".`,
      "success"
    );
  };

  const removeAll = () => {
    setTodoList([]);
    notifie("Task", "Removed All Tasks.", "success");
  };

  return (
    <Container minH="100vh" textAlign="center" paddingTop="10%">
      <Text fontSize="5xl" fontWeight="bold">
        Todo App
      </Text>
      <Flex minW="10rem" p="1rem" direction="column">
        <form onSubmit={handleSubmit}>
          <HStack>
            <Input
              variant="filled"
              placeholder="Enter your task"
              onChange={handleChange}
              value={newTodo}
              autoFocus
            />
            <IconButton
              aria-label="add something to do"
              type="submit"
              p=".3rem"
              icon={<PlusIcon width="100%" height="100%" />}
            />
          </HStack>
        </form>
        <AnimatePresence>
          {todoList.length > 0 && (
            <Stack
              as={motion.div}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              layout
              direction="column"
              spacing="1rem"
              paddingBlock="1rem"
            >
              <AnimatePresence>
                {todoList
                  .slice(0)
                  .reverse()
                  .map((item) => (
                    <Box
                      key={item.id}
                      as={motion.div}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      layout
                    >
                      <Flex justify="space-between" align="center" p=".5rem">
                        <Text>{item.body}</Text>
                        <CloseButton onClick={() => handleRemove(item.id)} />
                      </Flex>
                      <Divider />
                    </Box>
                  ))}
              </AnimatePresence>
              <Button
                colorScheme="red"
                _dark={{ backgroundColor: "red.600", color: "white" }}
                onClick={removeAll}
              >
                delete all
              </Button>
            </Stack>
          )}
        </AnimatePresence>
      </Flex>
      <Stack pos="absolute" left="1" top="1" right={{ base: "1", md: "unset" }}>
        <AnimatePresence>
          {alerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} removeAlert={removeAlert} />
          ))}
        </AnimatePresence>
      </Stack>
    </Container>
  );
};

export default Main;
