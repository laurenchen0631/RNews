import { useCallback, useEffect, useState } from "react";
import { Article, NewsCategory } from "../model/article";
import { getHeadlines } from "../api";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import ArticleItem from "./ArticleItem";

interface ArticlesState {
  data: Article[];
  page: number;
  totalPages: number;
}

export default function newsListCreator(category: NewsCategory, fetchSize = 20) {
  return function NewsScreen() {
    const [articles, setArticles] = useState<ArticlesState>({
      data: [],
      page: 1,
      totalPages: 0,
    });
    const [loading, setLoading] = useState(false);

    const fetchNews = useCallback(async (page: number = 1) => {
      setLoading(true);
      getHeadlines({ page, category, pageSize: fetchSize })
        .then((res) => {
          setArticles((articles) => ({
            data: [
              ...articles.data,
              ...res.articles.filter((item) => item.title !== "[Removed]"),
            ],
            page,
            totalPages: Math.ceil(res.totalResults / fetchSize),
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
          <ArticleItem
            article={item}
            onPress={() => Linking.openURL(item.url)}
          />
        )}
        keyExtractor={(item) => item.url}
        contentContainerStyle={styles.flatListContentContainer}
        refreshing={loading}
        onRefresh={fetchNews}
        onEndReachedThreshold={2}
        onEndReached={articles.page < articles.totalPages ? loadMore : null}
      />
    );
  };
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
