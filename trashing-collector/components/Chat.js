import * as TalkRn from '@talkjs/expo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import storage from '../storage';
import { Text, View } from 'react-native';
const BASE_URL = "https://c9ab-125-160-217-65.ap.ngrok.io/"

export default function Chat(props) {
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
    let temp
    axios.get(BASE_URL+'orders/') // <---- butuh order id
    .then(response => {
      const { data } = response
      temp = data
      return storage.load({key: 'loginState'})
    })
    .then(loggedUser => {
      const [ me ] = temp.filter(user => user.id === loggedUser.id)
      const [ other ] = temp.filter(user => user.id !== loggedUser.id)
      setMe(me)
      setOther(other)
      setLoading(false)
    })
    .catch(err => {
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          navigation.navigate('Login')
          break
        case 'ExpiredError':
          navigation.navigate('Login')
          break
      }
    })
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