import React, { PureComponent } from 'react';
import { View, FlatList, ListRenderItem, ActivityIndicator, Image } from 'react-native';
import { createMaterialTopTabNavigator, NavigationComponent, NavigationScreenProps } from 'react-navigation';
import ArticleCard from './ArticleCard';
import { NewsCategory, fetchTopHeadlines, Article } from '../api/news';

type PropTypes = NavigationScreenProps;
interface State {
    articles: Article[] | null;
    refreshing: boolean;
    // focus: boolean;
}

class TopHeadlines extends PureComponent<PropTypes, State> {
    public state: State = {
        articles: null,
        refreshing: false,
    };

    public componentDidMount() {
        this.fetchTopHeadlines();
    }

    // public componentDidUpdate(prevProps: PropTypes) {
    //     if (this.getCategory(prevProps) !== this.getCategory(this.props)) {
    //         this.fetchTopHeadlines();
    //     }
    // }

    public render() {
        return (
            <>
                {
                    this.state.articles ? (
                        <FlatList
                            data={this.state.articles}
                            renderItem={this.renderArticle}
                            keyExtractor={this.keyExtractor}
                            contentContainerStyle={{ paddingBottom: 40 }}
                            refreshing={this.state.refreshing}
                            onRefresh={this.fetchTopHeadlines}
                        />
                    )
                    : (
                        <View style={{ marginTop: 100 }}>
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

const TopHeadlinesTab = createMaterialTopTabNavigator(
    {
        general: {
            screen: TopHeadlines,
            navigationOptions: {
                title: '最新',
            },
        },
        business: {
            screen: TopHeadlines,
            navigationOptions: {
                title: '商業',
            },
        },
        science: {
            screen: TopHeadlines,
            navigationOptions: {
                title: '科學',
            },
        },
        technology: {
            screen: TopHeadlines,
            navigationOptions: {
                title: '科技',
            },
        },
        entertainment: {
            screen: TopHeadlines,
            navigationOptions: {
                title: '娛樂',
            },
        },
        health: {
            screen: TopHeadlines,
            navigationOptions: {
                title: '健康',
            },
        },
        sports: {
            screen: TopHeadlines,
            navigationOptions: {
                title: '體育',
            },
        },
    } as { [category in NewsCategory]: NavigationComponent },
    {
        swipeEnabled: true,
        optimizationsEnabled: true,
        lazy: true,
        tabBarOptions: {
            scrollEnabled: true,
            activeTintColor: '#007AFF',
            inactiveTintColor: '#000',
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
            style: {
                backgroundColor: 'white',
            },
        },
    } as any,
);

TopHeadlinesTab.navigationOptions = {
    title: '頭條新聞',
};

export default TopHeadlinesTab;
