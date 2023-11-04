import { Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Article } from "../model/article";
import { Text, View } from "./Themed";
import { getTimeDiffOfLocaleString } from "../utils/time";
import { Link } from "expo-router";

export interface ArticleItemProps {
  article: Article;
  onPress: () => void;
}

export default function ArticleItem({ article, onPress }: ArticleItemProps) {
  return (
    <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]} onPress={onPress}>
      <View style={styles.card}>
        {article.urlToImage && (
          <Image
            style={styles.image}
            source={{ uri: article.urlToImage }}
            resizeMode="cover"
            resizeMethod="scale"
          />
        )}
        <View style={styles.contentWrapper}>
          <View style={styles.infoRow}>
            <Text>{article.source.name.split(".")[0]}</Text>
            <Text style={styles.timeText}>
              {getTimeDiffOfLocaleString(article.publishedAt)}
            </Text>
          </View>
          <Text style={styles.titleText}>{article.title}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: '#FFF',
    marginTop: 15,
  },
  image: {
    // width: deviceWidth,
    height: 200,
  },
  contentWrapper: {
    padding: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  sourceText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 12,
  },
  titleText: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 24,
  },
});
