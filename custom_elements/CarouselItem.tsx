import React from "react";
import {View, Text, StyleSheet, Image, useWindowDimensions} from "react-native";

const { width } = useWindowDimensions();
const CarouselItem = ({ item } : any) => {
    return (
        <View style={styles.carouselItem}>
            <Image source={item.image} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    carouselItem: {
        width:width,
        justifyContent: "center",
        alignItems: "center",
        flex:1,
        backgroundColor: 'black',
      },
      image: {
        flex:1,
        resizeMode: "cover",
      },
});

export default CarouselItem;