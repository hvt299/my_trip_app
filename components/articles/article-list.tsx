import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../configs/FirebaseConfig";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 40,
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "red",
  },
  heading: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  description: {
    color: "gray",
    fontWeight: 300,
    marginBottom: 10,
  },
});

const ArticleListScreen = () => {
  const navigation: any = useNavigation();
  const route: RouteProp<RootStackParamList, "article-list"> = useRoute();
  const arts: any = route.params;
  const [articleList, setArticleList] = useState<any[]>([]);

  const [loadingArticle, setLoadingArticle] = useState(false);

  const getArticles = async () => {
    setLoadingArticle(true);
    setArticleList([]);
    const querySnapshot = await getDocs(collection(db, "Article"));
    querySnapshot.forEach((doc) => {
      setArticleList((prev) => [...prev, { docID: doc.id, ...doc.data() }]);
    });
    setLoadingArticle(false);
  };

  useEffect(() => {
    setArticleList(arts);
  }, []);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={articleList}
          keyExtractor={(item) => item.docID + ""}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("article", item)}
              >
                <View style={{ alignItems: "center", marginBottom: 30 }}>
                  <Image
                    style={{
                      width: 250,
                      height: 200,
                      marginBottom: 10,
                      borderRadius: 10,
                    }}
                    source={{
                      uri: item.imageURL,
                    }}
                  ></Image>
                  <Text
                    style={{ fontSize: 15, fontWeight: 500 }}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{ color: "gray", fontWeight: 300 }}
                    numberOfLines={1}
                  >
                    Written by {item.author}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={loadingArticle}
              onRefresh={getArticles}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ArticleListScreen;
