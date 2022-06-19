import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
function DetailOrder({ route, navigation }) {
  console.log(route);
  const { orderId } = route.params;
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetch(
      `https://e920-2001-448a-10a8-362f-c9c4-4172-268e-d605.ap.ngrok.io/orders/${orderId}`,
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
        setOrder(data);
        setIsLoading(true);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text>Username: {order.User.username}</Text>
        <Text>Phonenumber: {order.User.phoneNumber}</Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 3,
              width: "15%",
              marginHorizontal: 10,
            }}
            onPress={() => {
              navigation.navigate("HomePage", {
                longitude: order.location.coordinates[0],
                latitude: order.location.coordinates[1],
              });
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 3,
              width: "15%",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default DetailOrder;
