import React, { PureComponent } from 'react';
import { View, FlatList, ListRenderItem, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator, NavigationComponent, NavigationScreenProps } from 'react-navigation';
import ArticleCard from './ArticleCard';
import { NewsCategory, fetchTopHeadlines, Article } from '../api/news';

type PropTypes = NavigationScreenProps;
interface State {
    articles: Article[] | null;
    refreshing: boolean;
}

class TopHeadlines extends PureComponent<PropTypes, State> {
    public state: State = {
        articles: null,
        refreshing: false,
    };

    public componentDidMount() {
        this.fetchTopHeadlines();
    }

    public render() {
        return (
            <>
                {
                    this.state.articles ? (
                        <FlatList
                            data={this.state.articles}
                            renderItem={this.renderArticle}
                            keyExtractor={this.keyExtractor}
                            contentContainerStyle={styles.flatListContentContainer}
                            refreshing={this.state.refreshing}
                            onRefresh={this.fetchTopHeadlines}
                        />
                    )
                    : (
                        <View style={styles.initizeLoader}>
                            <ActivityIndicator
                                size="large"
                            />
                        </View>
                    )
                }
            </>
        );
    }

    private keyExtractor = (item: Article) => item.title;

    private renderArticle: ListRenderItem<Article> = ({ item }) => {
        return (
            <ArticleCard
                article={item}
                onPress={this.navigateToArticle}
            />
        );
    }

    private navigateToArticle = (article: Article) => {
        this.props.navigation.navigate(
            'Article',
            {
                article,
            },
        );
    }

    private fetchTopHeadlines = () => {
        const category = this.getCategory(this.props);
        this.setState({ refreshing: true });
        fetchTopHeadlines(category)
            .then(({ articles }) => {
                this.setState({ articles, refreshing: false });
                articles
                    .filter(article => Boolean(article.urlToImage))
                    .forEach((article) => {
                        Image.prefetch(article.urlToImage!);
                    });
            });
    }

    private getCategory(props: PropTypes): NewsCategory {
        return props.navigation.state.routeName as NewsCategory;
    }
}

const styles = StyleSheet.create({
    tabStyle: {
        paddingVertical: 6,
        width: 80,
    },
    indicatorStyle: {
        backgroundColor: '#007AFF',
        width: 50,
        marginLeft: 15,
    },
    labelStyle: {
        fontSize: 14,
    },
    tabContainerStyle: {
        backgroundColor: 'white',
    },
    flatListContentContainer: {
        paddingBottom: 40,
    },
    initizeLoader: {
        marginTop: 100,
    },
});

const categories: NewsCategory[] = ['general', 'business', 'entertainment', 'science', 'technology', 'health', 'sports'];
const categoryName: { [category in NewsCategory]: string } = {
    general: '最新',
    business: '商業',
    science: '科學',
    technology: '科技',
    entertainment: '娛樂',
    health: '健康',
    sports: '體育',
};

const TopHeadlinesTab = createMaterialTopTabNavigator(
    categories.reduce<{ [category: string]: NavigationComponent }>(
        (route, category) => {
            route[category] = {
                screen: TopHeadlines,
                navigationOptions: {
                    title: categoryName[category],
                },
            };
            return route;
        },
        {},
    ),
    {
        swipeEnabled: true,
        optimizationsEnabled: true,
        lazy: true,
        tabBarOptions: {
            scrollEnabled: true,
            activeTintColor: '#007AFF',
            inactiveTintColor: '#000',
            tabStyle: styles.tabStyle,
            indicatorStyle: styles.indicatorStyle,
            labelStyle: styles.labelStyle,
            style: styles.tabContainerStyle,
        },
    } as any,
);

TopHeadlinesTab.navigationOptions = {
    title: '頭條新聞',
};

export default TopHeadlinesTab;
