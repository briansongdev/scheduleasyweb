import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  HStack,
  Container,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon, MinusIcon } from "@chakra-ui/icons";

export default function Pricing() {
  return (
    <Container h="100vh" mt="20px">
      <VStack>
        <Heading>Subscriptions</Heading>
        <Text>You know yourself best. We&apos;ll do the rest.</Text>
      </VStack>
      <HStack justify="space-evenly" spacing={8}>
        <Center py={6}>
          <Box
            w={"350px"}
            h={"600px"}
            bg={useColorModeValue("gray.50", "gray.900")}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
          >
            <Stack
              textAlign={"center"}
              p={6}
              color={useColorModeValue("gray.800", "white")}
              align={"center"}
            >
              <Text
                fontSize={"sm"}
                fontWeight={500}
                bg={useColorModeValue("gray.50", "gray.900")}
                p={2}
                px={3}
                color={"gray.500"}
                rounded={"full"}
              >
                Personal
              </Text>
              <Stack direction={"row"} align={"center"} justify={"center"}>
                <Text fontSize={"3xl"}>$</Text>
                <Text fontSize={"6xl"} fontWeight={800}>
                  0
                </Text>
                <Text color={"gray.500"}>/month</Text>
              </Stack>
            </Stack>

            <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={2}>
              <Button
                w={"full"}
                mb={6}
                isDisabled={true}
                color={"white"}
                rounded={"xl"}
                bg={"gray.600"}
              >
                Active
              </Button>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Intuitive schedule for events
                </ListItem>
                <ListItem>
                  <ListIcon as={MinusIcon} color="gray.400" />
                  GPS-activated events, 20 days/mo
                </ListItem>
                <ListItem>
                  <ListIcon as={MinusIcon} color="gray.400" />
                  Advertisements included
                </ListItem>
              </List>
            </Box>
          </Box>
        </Center>
        <Center py={6}>
          <Box
            w={"350px"}
            h={"600px"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
          >
            <Stack
              textAlign={"center"}
              p={6}
              color={useColorModeValue("gray.800", "white")}
              align={"center"}
            >
              <Text
                fontSize={"sm"}
                fontWeight={500}
                bg={useColorModeValue("green.50", "green.900")}
                p={2}
                px={3}
                color={"green.500"}
                rounded={"full"}
              >
                NEXT{" "}
              </Text>
              <Stack direction={"row"} align={"center"} justify={"center"}>
                <Text fontSize={"3xl"}>$</Text>
                <Text fontSize={"6xl"} fontWeight={800}>
                  4
                </Text>
                <Text color={"gray.500"}>/month</Text>
              </Stack>
            </Stack>

            <Box px={6} py={2}>
              <Button
                mb={6}
                w={"full"}
                bg={"green.400"}
                color={"white"}
                rounded={"xl"}
                boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
                _hover={{
                  bg: "green.500",
                }}
                _focus={{
                  bg: "green.500",
                }}
              >
                Upgrade to NEXT
              </Button>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Intuitive schedule for events
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  GPS-activated events, all the time
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  No advertisements
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  AI-adaptive walking estimations
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Leave/return push notifications
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Generate custom schedules to maximize your free time
                </ListItem>
              </List>
            </Box>
          </Box>
        </Center>
      </HStack>
    </Container>
  );
}
