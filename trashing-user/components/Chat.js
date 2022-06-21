import * as TalkRn from "@talkjs/expo";
import { useEffect, useState } from "react";
import axios from "axios";
import storage from "../storage";
import { Text, View } from "react-native";

export default function Chat({ route }) {
  const { data, access_token } = route.params;
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
    console.log(data);
    // let temp;
    // temp = data;
    // axios
    //   .get(
    //     `https://2235-2001-448a-4044-6908-754b-26cd-b980-5835.ap.ngrok.io/orders/${order.id}`,
    //     { headers: { access_token } }
    //   )
    //   .then((response) => {
    //     const { data } = response;
    //     return storage.load({ key: "loginState" });
    //   })
    //   .then((loggedUser) => {
    // const [me] = temp.filter((user) => user.id === loggedUser.id);
    // const [other] = temp.filter((user) => user.id !== loggedUser.id);
    // setMe(me);
    // setOther(other);
    // console.log(temp, "CHAT");
    // setMe(temp.userId);
    // setMe({id: temp.userChatId, name: temp.User.username, email: temp.User.email, photoUrl});
    // setOther(temp.collectorId);
    setOther({
      id: data.collectorChatId,
      name: data.Collector.username,
      email: data.Collector.email,
      photoUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      welcomeMessage: "Hello",
      role: "default",
    });
    setMe({
      id: data.userChatId,
      name: data.User.username,
      email: data.User.email,
      photoUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      welcomeMessage: "Hello",
      role: "default",
    });
    setLoading(false);
  }, []);
  // .catch((err) => {
  //   console.log("ERROR");
  //   console.warn(err.message);
  //   switch (err.name) {
  //     case "NotFoundError":
  //       navigation.navigate("Login");
  //       break;
  //     case "ExpiredError":
  //       navigation.navigate("Login");
  //       break;
  //   }
  // });
  // }, []);

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
