import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import styles from "./welcome.style";
import { useRouter } from "expo-router";
import { SIZES, icons } from "../../../constants";

const Welcome = () => {
  const router = useRouter();
  const [activeJobTypes, setActiveJobTypes] = useState("Full-Time");
  const jobtypes = ["Full-Time", "Part-Time", "Contractor"];
  useEffect(() => {}, []);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Abdullah</Text>
        <Text style={styles.welcomeMessage}>Find Your Perfect Job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onChange={() => {}}
            placeholder="what are you looking for?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobtypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobTypes, item)}
              onPress={() => {
                setActiveJobTypes(item);
                router.push(`/search/$item`);
              }}
            >
              <Text style={styles.tabText(activeJobTypes, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
