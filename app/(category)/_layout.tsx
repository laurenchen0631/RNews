import { Tabs } from "expo-router";
import { Text } from "../../components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome5";

export default function CategoryLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "General",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="business"
        options={{
          title: "Business",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sports"
        options={{
          title: "Sports",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="futbol" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tech"
        options={{
          title: "Technology",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="microchip" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
