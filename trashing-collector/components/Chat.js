import * as TalkRn from '@talkjs/expo';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function Chat({ route }) {
  const { order } = route.params
  console.log(order);
  const [me, setMe] = useState({
      id: '',
      name: '',
      email: '',
      photoUrl: '',
      welcomeMessage: '',
      role: '',
  })

  const [other, setOther] = useState({
    id: '',
    name: '',
    email: '',
    photoUrl: '',
    welcomeMessage: '',
    role: '',
  })

  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setMe({
      id:order.collectorChatId,
      name:order.Collector.username,
      email:order.Collector.email,
      photoUrl:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      welcomeMessage: "Hello",
      role:"default"
    })
    setOther({
      id:order.userChatId,
      name:order.User.username,
      email:order.User.email,
      photoUrl:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      welcomeMessage: "Hello",
      role:"default"
    })
    setLoading(false)
  },[])

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  if(loading){
    return <View style={{height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}><Text>Loading ...</Text></View>
  }

  return (
    <TalkRn.Session appId='tAFwv4ga' me={me}>
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
  );
}