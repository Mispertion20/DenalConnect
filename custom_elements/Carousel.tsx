import React, { useRef, useState } from "react";
import { View, ScrollView, Image, Dimensions, StyleSheet, FlatList } from "react-native";
import CarouselItem from "@/custom_elements/CarouselItem";

const { width } = Dimensions.get("window");

const CustomCarousel = ({ images }: { images: any[] }) => {
    return (
        <View style={styles.carouselContainer}>
            <FlatList data={images} renderItem={CarouselItem} horizontal/>
        </View>
    )
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },    
});

export default CustomCarousel;
