import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SearchContext from "./SearchContext";

function SearchHeader( ){
    const {width} = useWindowDimensions();
    const [keyword, onChangeText] = useContext(SearchContext);

    return (<View style={[styles.block, {width: width-32}]}>
        <TextInput style={styles.input} placeholder="검색어를 입력하세요" autoFocus
        value={keyword} onChangeText={onChangeText}
        />
    <Pressable style={styles.button}
    onPress={()=> onChangeText('')}>
        <Icon name="cancel" color={"#9e9e9e"} size={20} />
    </Pressable>
    </View>
    );
}


const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
    },
    button: {
        marginLeft: 8,
    }
    
});

export default SearchHeader;