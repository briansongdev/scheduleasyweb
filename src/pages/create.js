import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
  VStack,
  FormHelperText,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

export default function SignupCard() {
  const [selected, setSelected] = useState(new Date());
  const router = useRouter();
  const [newItem, setNewItem] = useState({
    startTime: "",
    endTime: "",
    name: "",
    venueLocation: "",
    driving: true,
    walking: {
      enabled: false,
      time: 0,
    },
    nextHome: true,
    notes: "",
    notificationEnabled: true,
  });

  let footer = <Center>Please pick a day.</Center>;
  if (selected) {
    footer = (
      <Center fontWeight={"bold"}>Date: {format(selected, "PP")}.</Center>
    );
  }
  return (
    <>
      <Head>
        <title>Create a SchedulEasy</title>
      </Head>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <VStack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Create an event
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Fill in the details below!🪄
            </Text>
          </Stack>
          <HStack align={"center"} spacing={10}>
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              footer={footer}
            />
            <Box
              rounded={"lg"}
              w="500px"
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <HStack justify="space-evenly">
                  <Box>
                    <FormControl id="startTime" isRequired>
                      <FormLabel>Start Time</FormLabel>
                      <Input
                        type="time"
                        onChange={(e) => {
                          setNewItem({
                            ...newItem,
                            startTime: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="endTime" isRequired>
                      <FormLabel>End Time</FormLabel>
                      <Input
                        type="time"
                        onChange={(e) => {
                          setNewItem({
                            ...newItem,
                            endTime: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="name" isRequired>
                  <FormLabel>Name of event</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setNewItem({
                        ...newItem,
                        name: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormControl id="venueLocation">
                  <FormLabel>Venue address</FormLabel>
                  <InputGroup>
                    <Input
                      type={"text"}
                      onChange={(e) => {
                        setNewItem({
                          ...newItem,
                          venueLocation: e.target.value,
                        });
                      }}
                    />
                  </InputGroup>
                  <FormHelperText>Leave blank if at home.</FormHelperText>
                </FormControl>
                <FormControl id="notes">
                  <FormLabel>Extra notes</FormLabel>
                  <InputGroup>
                    <Textarea
                      type={"text"}
                      onChange={(e) => {
                        setNewItem({
                          ...newItem,
                          notes: e.target.value,
                        });
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormLabel>Adjustments</FormLabel>
                <Accordion defaultIndex={[]} allowMultiple>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Driving
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Checkbox
                        defaultChecked
                        onChange={(e) => {
                          setNewItem({
                            ...newItem,
                            driving: e.target.checked,
                          });
                        }}
                      >
                        Include ETA to/from venue?
                      </Checkbox>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Walking
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      How many minutes will it take you to walk after getting
                      off the car? Leave blank if N/A.
                      <InputGroup mt="10px">
                        <Input
                          type={"text"}
                          onChange={(e) => {
                            setNewItem({
                              ...newItem,
                              walking: {
                                enabled: e.target.value == "" ? false : true,
                                time:
                                  e.target.value == ""
                                    ? 0
                                    : parseInt(e.target.value),
                              },
                            });
                          }}
                        />
                      </InputGroup>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Stack spacing={2} pt={2}>
                  <Checkbox
                    defaultChecked
                    onChange={(e) => {
                      setNewItem({
                        ...newItem,
                        notificationEnabled: e.target.checked,
                      });
                    }}
                  >
                    Send me a notification when it's time to leave.
                  </Checkbox>
                  <Checkbox
                    defaultChecked
                    onChange={(e) => {
                      setNewItem({
                        ...newItem,
                        nextHome: e.target.checked,
                      });
                    }}
                  >
                    Going home immediately after this event?
                  </Checkbox>
                  <Button
                    size="lg"
                    bg={"teal.400"}
                    color={"white"}
                    _hover={{
                      bg: "teal.500",
                    }}
                    onClick={() => {
                      newItem.date = selected;
                      if (localStorage.getItem("schedule") == null) {
                        localStorage.setItem(
                          "schedule",
                          JSON.stringify([newItem])
                        );
                      } else {
                        let arr = JSON.parse(localStorage.getItem("schedule"));
                        arr.push(newItem);
                        localStorage.setItem("schedule", JSON.stringify(arr));
                      }
                      router.push("/");
                    }}
                  >
                    Create event
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </HStack>
        </VStack>
      </Flex>
    </>
  );
}
