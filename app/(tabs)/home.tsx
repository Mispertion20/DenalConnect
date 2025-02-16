import React, {useState, useRef, useCallback} from "react";
import { View, Text, StyleSheet, ScrollView, ViewToken, Image, FlatList, TouchableOpacity, Dimensions, Modal, TextInput, Linking } from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Fonts } from "@/constants/Fonts";
import Entypo from '@expo/vector-icons/Entypo';
import articles  from '@/constants/Articles';

const images = [
    require('@/assets/images/ArticlePlaceholder.png'),
    require('@/assets/images/VideoPlaceholder.png'),
    require('@/assets/images/TeethTips.jpg'),
]
const carouselItems = [
    { id: "1", image: images[2] },
    { id: "2", image: images[2] },
    { id: "3", image: images[2] },
];

const videoGuides = [
  { id: "1", title: "Guide 1", author: "Askar Akezhan gay gay suck", image: 1 },
  { id: "2", title: "Guide 2", author: "Askar Akezhan porno ", image: 1 },
];

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
  

export default function HomePage() {
    const [chosenArticle, setChosenArticle] = useState(-1);
    const onPressArticle = (index:number) => {
        setChosenArticle(index);
    };
    const cancelReadingArticle = () => {
        setChosenArticle(-1);
    }
  const renderCarouselItem = ({ item } : { item : { id:string, image:number} }) => (
    <View style={styles.carouselItem} key={item.id}>
      <Image source={item.image} style={styles.carouselImage}/>
    </View>
  );

  const renderArticle = ({ item }: { item: { id: string, title: string; author: string, image: number } }) => (
    <TouchableOpacity style={styles.card} onPress={() => onPressArticle(Number(item.id) - 1)}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardAuthor}>by {item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderVideo = ({ item }: { item: { title: string, author: string, image: number } }) => (
    <TouchableOpacity style={styles.card} onPress={()=>alert(`you pressed ${item.title}`)}>
      <Image source={images[item.image]} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardAuthor}>by {item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Daily Tips Section */}
          <Text style={[styles.sectionTitle, {marginHorizontal:'auto'}]}>Daily Tips</Text>
            <FlatList data={carouselItems} renderItem={renderCarouselItem} 
                    horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled/>
            <View style={styles.mainContent}>
                {/* Articles Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Articles</Text>
                    <TouchableOpacity onPress={()=>alert("Wow")}>
                    <Text style={styles.seeMore}>See more</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={articles}
                    renderItem={renderArticle}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginBottom: 30,
                    }}
                />
                <Modal transparent={true} visible={(chosenArticle != -1)} animationType="slide">
                    <View style={styles.modalArticleContainer}>
                        <Image source={(chosenArticle !== -1 ? articles[chosenArticle].image : require('@/assets/images/ArticlePlaceholder.png'))} style={styles.modalArticleImage}/>
                        <View style={styles.modalArticleMain}>
                            <View style={styles.modalArticleTop}> 
                                <View style={styles.modalArticleHeader}>
                                    <View style={styles.modalArticleTitle}>
                                        <Text style={styles.modalAticleTitleText}>{(chosenArticle !== -1 ? articles[chosenArticle].title : '---')}</Text>
                                        <Text style={styles.modalAticleAuthorText}>by {(chosenArticle !== -1 ? articles[chosenArticle].author : '---')}</Text>
                                    </View>
                                    <TouchableOpacity onPress={cancelReadingArticle}>
                                        <Entypo name="circle-with-cross" size={30} color='black' style={{zIndex:10}}/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.modalArticleDescription}>
                                    {(chosenArticle !== -1 ? articles[chosenArticle].description : '---')}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.modalArticleBottom} onPress={()=>Linking.openURL((chosenArticle !== -1 ? articles[chosenArticle].url : '---'))}>
                                <Text style={styles.modalArticleBottomText}>Read the article</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Video Guides</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeMore}>See more</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={videoGuides}
                    renderItem={renderVideo}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.neutral.light.l5,
  },
  mainContent: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: "column",
    alignItems: "stretch",
  },
  scrollContainer: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Fonts.i800,
    color: Colors.neutral.dark.l1,
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  seeMore: {
    color: Colors.highlight.l1,
    fontSize: 12,
    fontFamily: Fonts.i600,
  },
  carouselItem: {
    width: width,
    height: 214,
    backgroundColor: Colors.neutral.light.l3,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  card: {
    width: 200,
    backgroundColor: Colors.neutral.light.l3,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  cardInfo: {
    width: '100%',
    flexDirection: 'column',
    padding: 16,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: Fonts.i400,
    color: Colors.neutral.dark.l1,
    marginTop: 4,
  },
  cardAuthor: {
    fontSize: 14,
    fontFamily:Fonts.i800,
    color: Colors.neutral.dark.l3,
  },
  paginationContainer: {
    position: "absolute",
    top: 230, // Move dots above the carousel
    alignSelf: "center",
    flexDirection: 'row',
    gap: 8,
    zIndex: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: Colors.highlight.l1,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.neutral.dark.l3,
  },
  modalArticleContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.neutral.light.l5,
    flexDirection: 'column',
  },
  modalArticleMain: {
    height: 5 * height / 9,
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalArticleImage: {
    width: '100%',
    height: 4 * height / 9,
    resizeMode: 'stretch',
  },
  modalArticleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  modalArticleTop: {
    flexDirection: 'column',
  },
  modalArticleTitle: {    
    maxWidth: '70%',
  },
  modalAticleTitleText: {
    fontFamily: Fonts.i800,
    fontSize: 18,
    color: Colors.neutral.dark.l1,
    marginBottom: 8,
  },
  modalAticleAuthorText: {
    fontSize: 16,
    fontFamily: Fonts.i400,
    color: Colors.neutral.dark.l1,
  },
  modalArticleDescription: {
    fontFamily: Fonts.i400,
    fontSize: 12,
    color:Colors.neutral.dark.l4,
  },
  modalArticleBottom: {
    backgroundColor: Colors.highlight.l1,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalArticleBottomText: {
    color: Colors.neutral.light.l5,
    fontFamily: Fonts.i600,
    fontSize: 16,
  }
});
