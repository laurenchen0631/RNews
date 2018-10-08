import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator, NavigationComponent, NavigationScreenProps, NavigationNavigateActionPayload } from 'react-navigation';
import { NewsCategory, fetchTopHeadlines, Article } from '../api/news';

type PropTypes = NavigationScreenProps;
type State = { articles: Article[] | null, focus: boolean }

class TopHeadlines extends PureComponent<PropTypes, State> {
    public state: State = {
        articles: null,
        focus: false,
    }

    static navigationOptions = {
        title: '頭條新聞',
    };

    public componentDidMount() {
        this.fetchTopHeadlines();
        // this.props.navigation.addListener(
        //     'willFocus',
        //     () => {
        //         console.log('willFocus', this.getCategory(this.props))
        //     }
        // )
    }

    public componentDidUpdate(prevProps: PropTypes) {
        if (this.getCategory(prevProps) !== this.getCategory(this.props)) {
            this.fetchTopHeadlines();
        }
    }

    public render() {
        return (
            <View>
                <Text>TopHeadlines</Text>
                <Text>TopHeadlines</Text>
                <Text>TopHeadlines</Text>
                <Text>TopHeadlines</Text>
                <Text>TopHeadlines</Text>
                <Text>TopHeadlines</Text>
                <Text>TopHeadlines</Text>
                <Text>TopHeadlines</Text>
                <Text>TopHeadlines</Text>
                <Text>TopHeadlines</Text>
            </View>
        )
    }

    private getCategory(props: PropTypes): NewsCategory {
        return props.navigation.state.routeName as NewsCategory;
    }

    private fetchTopHeadlines() {
        const category = this.props.navigation!.state.routeName as NewsCategory;
        fetchTopHeadlines(category)
            .then((res) => {
                this.setState({
                    articles: res.articles.filter(article => Boolean(article.urlToImage)),
                })
                console.log(res)
            });
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
            scrollEnabled: false,
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
            }
        }
    }
)

TopHeadlinesTab.navigationOptions = {
    title: '頭條新聞',
};

export default TopHeadlinesTab;