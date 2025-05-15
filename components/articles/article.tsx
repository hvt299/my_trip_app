import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const ArticleScreen = () => {
  const route: RouteProp<RootStackParamList, "article"> = useRoute();
  const art: any = route.params;
  const [article, setArticle] = useState<any>();

  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  useEffect(() => {
    setArticle(art);
  }, []);

  return (
    article && (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Image
          style={{
            width: "100%",
            height: 330,
          }}
          source={{
            uri: article.imageURL,
          }}
        />
        <View
          style={{
            padding: 15,
            backgroundColor: "#fff",
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            gap: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 500 }}>{article.title}</Text>
          <Text style={{ fontSize: 17, fontWeight: 400 }}>
            Author: {article.author}
          </Text>
          <Text style={{ fontSize: 17, fontStyle: "italic", fontWeight: 300 }}>
            {moment(article.createdAt.toDate()).format("DD MMM yyyy")}
          </Text>
          <Text style={{ fontSize: 16, color: "#333", fontWeight: 300 }}>
            {article.content}
          </Text>
        </View>
      </ScrollView>
    )
  );
};

export default ArticleScreen;
