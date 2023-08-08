import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView>
      <FlashList
	data={[{ name: "Dogs" }, { name: "Fido" }, { name: "Spot"}]}
	renderItem={({ item }) => <Text>{item.name}</Text>}
	estimatedItemSize={100}
      />
    </SafeAreaView>
  );
};export default Home;