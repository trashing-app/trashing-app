import * as TalkRn from "@talkjs/expo";
import { useEffect, useState } from "react";
import axios from "axios";
import storage from "../storage";
import { Text, View } from "react-native";
import { baseUrl } from "../baseUrl";

export default function Chat({ route }) {
  const { order, access_token } = route.params;
  // console.log(order, "ORDER");
  const [me, setMe] = useState({
    id: "",
    name: "",
    email: "",
    photoUrl: "",
    welcomeMessage: "",
    role: "",
  });

  const [other, setOther] = useState({
    id: "",
    name: "",
    email: "",
    photoUrl: "",
    welcomeMessage: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let temp;
    axios
      .get(
        `${baseUrl}/orders/${order.id}`,
        { headers: { access_token } }
      ) // <---- butuh order id
      .then((response) => {
        const { data } = response;
        temp = data;
        return storage.load({ key: "loginState" });
      })
      .then((loggedUser) => {
        console.log(temp, "SEE");
        // const [me] = temp.filter((user) => user.id === loggedUser.id);
        // const [other] = temp.filter((user) => user.id !== loggedUser.id);
        // setMe(me);
        // setOther(other);
        setMe(temp.userId);
        setOther(temp.collectorId);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR");
        console.warn(err.message);
        switch (err.name) {
          case "NotFoundError":
            navigation.navigate("Login");
            break;
          case "ExpiredError":
            navigation.navigate("Login");
            break;
        }
      });
  }, []);

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading ...</Text>
      </View>
    );
  }

  return (
    <TalkRn.Session appId="tAFwv4ga" me={me}>
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
  );
}
