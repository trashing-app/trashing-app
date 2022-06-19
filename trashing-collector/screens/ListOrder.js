import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ListOrder({ navigation }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(
      "https://e920-2001-448a-10a8-362f-c9c4-4172-268e-d605.ap.ngrok.io/orders/nearestOrder",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjU1NjQwMDQyfQ.LWIrX8MBB8DM69SbB8PhZIAJIQx4UfRD-vkqB7skTtQ",
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
        // console.log(data);
        setOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        "https://e920-2001-448a-10a8-362f-c9c4-4172-268e-d605.ap.ngrok.io/orders/nearestOrder",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjU1NjQwMDQyfQ.LWIrX8MBB8DM69SbB8PhZIAJIQx4UfRD-vkqB7skTtQ",
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
          setOrders(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 60000);
    return () => clearInterval(interval);
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <Text
          style={{
            textAlign: "center",
            marginBottom: "10%",
          }}
        >
          List Order
        </Text>
        {orders.map((el) => {
          return (
            <TouchableOpacity
              style={{
                borderWidth: 3,
                alignItems: "center",
                marginBottom: 20,
              }}
              key={el.id}
              onPress={() => {
                navigation.navigate("DetailOrder", {
                  orderId: el.id,
                });
              }}
            >
              <Text>See detail order from id {el.id}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
export default ListOrder;
