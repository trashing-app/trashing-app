import * as TalkRn from "@talkjs/expo";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { baseUrl } from "../baseUrl";

export default function Chat({ route }) {
  const { data } = route.params;
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
  } else {
    return (
      <TalkRn.Session appId="tAFwv4ga" me={me}>
        <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
      </TalkRn.Session>
    );
  }
}
