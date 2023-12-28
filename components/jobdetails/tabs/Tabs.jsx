import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import styles from "./tabs.style";

const TabButton = ({ name, activeTabs, onhandleSearchType }) => {
  <TouchableOpacity>
    <Text>{name}</Text>
  </TouchableOpacity>;
};

const Tabs = ({ tab, activeTabs, setActiveTabs }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tab}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTabs={activeTabs}
            onhandleSearchType={() => setActiveTabs(item)}
          />
        )}
      />
    </View>
  );
};

export default Tabs;
