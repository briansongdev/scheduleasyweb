import Head from "next/head";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Box,
  Stack,
  StackDivider,
  Divider,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import { format } from "date-fns";

const inter = Inter({ subsets: ["latin"] });

const getTime = (time) => {
  const arr = time.split(":");
  let suffix = "AM";
  let hours = Number(arr[0]);
  if (hours > 12) suffix = "PM";
  hours = ((hours + 11) % 12) + 1;
  return hours.toString() + ":" + arr[1] + " " + suffix;
};

const getDistanceTime = async (url) => {
  let finlObj = {};
  await axios.post(url).then((res) => {
    const elem = res.data.rows[0].elements[0];
    if (res.data) {
      finlObj.dist = elem.distance.value / parseFloat(1609);
      finlObj.duration = Math.ceil(elem.duration.value / 60);
    }
  });
  return finlObj;
};

const getTotalMin = (time) => {
  const arr = time.split(":");
  return Number(arr[0]) * 60 + Number(arr[1]);
};

const getSec = (timeStr) => {
  let secTotal = 0;
  const arr = timeStr.split(":");
  secTotal += Number(arr[0]) * 60 + Number(arr[1]);
  return secTotal;
};
const timeOp = (timeStr, origDate, amt) => {
  let arr = timeStr.split(":"),
    dat = origDate;
  dat.setHours(dat.getHours() + Number(arr[0]));
  dat.setMinutes(dat.getMinutes() + Number(arr[1]) + amt);
  return dat;
};

let arr = ["4321 Walnut Ave, Irvine, CA"],
  currInd = 1;

export default function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  function delay(i, go) {
    setTimeout(async () => {
      let str1 = arr[currInd - 1],
        str2 = go[i].venueLocation,
        time1 = Math.ceil(
          getSec(go[i].startTime) + Date.parse(go[i].date) / 1000
        ),
        time2 = Math.ceil(
          getSec(go[i].endTime) + Date.parse(go[i].date) / 1000
        );
      const finlRes = await getDistanceTime(
        "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=" +
          str1 +
          "&destinations=" +
          str2 +
          "&departure_time=" +
          time1 +
          "&key=gUMnRMNMdNtBmKkeQYwSSD6GNcRds"
      );
      if (go[i].nextHome) {
        const finlRes1 = await getDistanceTime(
          "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=" +
            str2 +
            "&destinations=" +
            "4321 Walnut Avenue, Irvine, CA" +
            "&departure_time=" +
            time2 +
            "&key=gUMnRMNMdNtBmKkeQYwSSD6GNcRds"
        );
        go[i].nextAdjustments = {
          dist: finlRes1.dist,
          duration: finlRes1.duration,
        };
      }
      go[i].adjustments = {
        dist: finlRes.dist,
        duration: finlRes.duration,
      };
      arr.push(go[i].venueLocation);
      currInd += 1;
      if (go[i].nextHome) {
        arr.push("4321 Walnut Ave, Irvine, CA");
        currInd += 1;
      }
      setEvents(go);
      if (go.length - 1 == i) setLoading(false);
      return go;
    }, 2000);
  }
  useEffect(() => {
    let go =
      localStorage.getItem("schedule") != null
        ? JSON.parse(localStorage.getItem("schedule"))
        : [];
    for (let i = 0; i < go.length; i++) {
      delay(i, go);
    }
  }, []);
  return loading ? (
    <>
      <Head>
        <title>SchedulEasy</title>
      </Head>
      <Center>Loading, please wait...</Center>
    </>
  ) : (
    <>
      <Head>
        <title>SchedulEasy</title>
      </Head>
      <Container m="10px" w="100vw">
        <HStack align="center" justify="space-between" w="95vw">
          <VStack alignItems="left">
            <Heading>SchedulEasy</Heading>
            <Text>The only accurate, all-in-one scheduler you'll need.</Text>
          </VStack>
          <Button
            colorScheme="teal"
            leftIcon={<AddIcon />}
            onClick={() => router.push("/create")}
            variant="solid"
          >
            Add event
          </Button>
        </HStack>
        <VStack w="100vw" spacing={2}>
          <Center>
            <Text>
              <span style={{ fontWeight: "bold" }}>Welcome Demo User!</span>{" "}
              Take a peek at your schedule for today,{" "}
              <span style={{ fontWeight: "bold" }}>May 13</span>.
            </Text>
          </Center>
          <Center>
            <Text mb="10px">
              Your home address is set to{" "}
              <span style={{ fontWeight: "bold" }}>
                4321 Walnut Ave, Irvine, CA
              </span>
              .
            </Text>
          </Center>
          {events
            .slice()
            .filter(
              (el) =>
                new Date(el.date).setHours(0, 0, 0, 0) ==
                new Date().setHours(0, 0, 0, 0)
            )
            .sort(function (a, b) {
              return getTotalMin(a.startTime) - getTotalMin(b.startTime);
            })
            .map((e) => {
              return (
                <Stack direction="row" h="350px" spacing={3} p="4px">
                  <VStack spacing={0}>
                    <Text fontWeight="bold">
                      {format(
                        timeOp(
                          e.startTime,
                          new Date(new Date(e.date).toDateString()),
                          -1 * (e.adjustments.duration + e.walking.time)
                        ),
                        "h:mm a"
                      )}
                    </Text>
                    <Text>{e.adjustments.duration} min driving</Text>
                    <Text>{e.walking.time} min walking</Text>
                    <Divider
                      orientation="vertical"
                      borderColor="teal"
                      borderWidth="3px"
                      borderRadius="10px"
                    />
                    {e.nextAdjustments.duration ? (
                      <Text>{e.nextAdjustments.duration} min driving</Text>
                    ) : (
                      <></>
                    )}
                    <Text>{e.walking.time} min walking</Text>
                    <Text fontWeight="bold">
                      {format(
                        timeOp(
                          e.endTime,
                          new Date(new Date(e.date).toDateString()),
                          e.nextAdjustments.duration + e.walking.time
                        ),
                        "h:mm a"
                      )}
                    </Text>
                  </VStack>
                  <Card variant="filled">
                    <CardHeader>
                      <HStack>
                        <Heading size="md">{e.name}</Heading>
                        <Button size="xs" colorScheme="red">
                          Delete
                        </Button>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <Stack divider={<StackDivider />} spacing="4" mt="-20px">
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            {e.venueLocation}
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {getTime(e.startTime)} - {getTime(e.endTime)}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Adjustments
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            Calculated from realtime geolocation data. ✅
                          </Text>
                          <Text pt="2" fontSize="sm">
                            <Text>
                              {e.adjustments.duration} min |{" "}
                              {e.adjustments.dist.toFixed(1)} mi TO event
                            </Text>
                            {e.nextAdjustments ? (
                              <Text>
                                {e.nextAdjustments.duration} min |{" "}
                                {e.adjustments.dist.toFixed(1)} mi FROM event{" "}
                              </Text>
                            ) : (
                              <></>
                            )}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Notes
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {e.notes ? e.notes : ""}
                          </Text>
                        </Box>
                      </Stack>
                    </CardBody>
                  </Card>
                </Stack>
              );
            })}
        </VStack>
      </Container>
    </>
  );
}
