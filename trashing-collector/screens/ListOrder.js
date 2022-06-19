import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ListOrder() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(
      "https://9202-2001-448a-10a9-3a83-ec98-93a0-fa06-791.ap.ngrok.io/orders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjU1NjE3MzMzfQ.BhrdaSPHzaz7vR0v-RNOV5-Lp-PM1P3_W0kSj4BU4pc",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "<<<<<<<<<");
        setOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {orders.map((el) => {
          return (
            <TouchableOpacity key={el.id}>
              <Text>{el.id}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
export default ListOrder;
