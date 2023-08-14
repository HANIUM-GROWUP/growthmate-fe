import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import SearchContext from "./SearchContext";

function SearchScreen({navigation}) {
    const keyword = useContext(SearchContext);
    return <View style={styles.block}>
    <Text>{keyword}</Text></View>
}

const styles = StyleSheet.create({
    block: {
        color: "white",
        backgroundColor : "blue",
    },
});

export default SearchScreen;