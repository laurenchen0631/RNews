import { useCallback, useEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { getHeadlines } from "../api";
import { Article } from "../model/article";
import ArticleItem from "../components/ArticleItem";

interface ArticlesState {
  data: Article[];
  page: number;
  totalPages: number;
}

const FETCH_SIZE = 20;

export default function HeadlineScreen() {
  const [articles, setArticles] = useState<ArticlesState>({
    data: [],
    page: 1,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchNews = useCallback(async (page: number = 1) => {
    setLoading(true);
    getHeadlines({ page, category: "general", pageSize: FETCH_SIZE })
      .then((res) => {
        setArticles(articles => ({
          data: [...articles.data, ...res.articles.filter(item => item.title !== '[Removed]')],
          page,
          totalPages: Math.ceil(res.totalResults / FETCH_SIZE),
        }));
      })
      .finally(() => setLoading(false));
  }, []);

  const loadMore = useCallback(() => {
    fetchNews(articles.page + 1);
  }, [articles.page]);

  useEffect(() => {
    fetchNews();
  }, []);

  console.log(articles.data);

  if (articles.totalPages === 0) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <FlatList
      data={articles.data}
      renderItem={({ item }) => (
        <ArticleItem article={item} onPress={() => Linking.openURL(item.url)} />
      )}
      keyExtractor={(item) => item.url}
      contentContainerStyle={styles.flatListContentContainer}
      refreshing={loading}
      onRefresh={fetchNews}
      onEndReachedThreshold={2}
      onEndReached={articles.page < articles.totalPages ? loadMore : null}
    />
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    paddingVertical: 6,
    width: 80,
  },
  labelStyle: {
    fontSize: 14,
  },
  tabContainerStyle: {
    backgroundColor: "white",
  },
  flatListContentContainer: {
    paddingBottom: 40,
  },
  loaderContainer: {
    marginTop: 100,
  },
});
