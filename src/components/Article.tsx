import React, { PureComponent } from 'react';
import { View, Text, Dimensions, Image, ScrollView, Button, Modal, WebView, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationScreenProps, SafeAreaView } from 'react-navigation';
import { Article } from '../api/news';
import { getTimeDiffOfLocaleString } from '../utils/time';

type PropTypes = NavigationScreenProps<{ article: Article }>;
interface State {
    imageRatioByWidth: number | null;
    showMore: boolean;
}

const deviceWidth: number = Dimensions.get('window').width;

export default class ArticlePage extends PureComponent<PropTypes, State> {
    public state: State = {
        imageRatioByWidth: 0,
        showMore: false,
    };

    public componentDidMount() {
        const article = this.getArticle();
        if (!article) {
            this.props.navigation.goBack();
        }
        if (article.urlToImage) {
            Image.getSize(
                article.urlToImage,
                (width, height) => {
                    this.setState({ imageRatioByWidth: height / width });
                },
                () => {
                    this.setState({ imageRatioByWidth: null });
                },
            );
        }
    }

    public render() {
        const article = this.getArticle();
        if (!article) return null;

        const { imageRatioByWidth } = this.state;
        return (
            <ScrollView style={styles.container}>
                {
                    article.urlToImage &&
                    typeof imageRatioByWidth === 'number' &&
                    <Image
                        source={{ uri: article.urlToImage }}
                        style={{ width: deviceWidth, height: imageRatioByWidth ? imageRatioByWidth * deviceWidth : 200 }}
                    />
                }
                <View style={styles.contentWrapper}>
                    <Text style={styles.titleText}>
                        {article.title}
                    </Text>

                    <View style={styles.infoRow}>
                        <View style={styles.authorBlock}>
                            <Text style={styles.sourceText}>
                                {article.source.name && article.source.name.split('.')[0]}
                            </Text>
                            <Text style={styles.authorText}>
                                {article.author && article.author.split('/').splice(-1)}
                            </Text>
                        </View>

                        <Text style={styles.timeText}>{getTimeDiffOfLocaleString(article.publishedAt)}</Text>
                    </View>

                    <Text style={styles.contentText}>
                        {article.content && article.content.replace(/\[.+\]/g, '')}
                    </Text>
                </View>

                <Button
                    title="閱讀更多"
                    onPress={this.showMore}
                />
                {this.renderFullArticle()}
            </ScrollView>
        );
    }

    public renderFullArticle() {
        const article = this.getArticle();
        return (
            <Modal
                animationType="slide"
                visible={this.state.showMore}
                onRequestClose={this.closeFullArticle}
            >
                <SafeAreaView>
                    <TouchableOpacity onPress={this.closeFullArticle}>
                        <Text style={styles.headerTintText}>關閉</Text>
                    </TouchableOpacity>
                </SafeAreaView>
                <WebView
                    source={{ uri: article.url }}
                />
            </Modal>
        );
    }

    private getArticle(): Article {
        return this.props.navigation.getParam('article');
    }

    private showMore = () => {
        this.setState({ showMore: true });
    }

    private closeFullArticle = () => {
        this.setState({ showMore: false });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
    },
    contentWrapper: {
        padding: 10,
    },
    titleText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
        lineHeight: 24,
    },
    infoRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 20,
    },
    authorBlock: {
        flexDirection: 'row',
    },
    sourceText: {
        color: '#616161',
        fontSize: 12,
        marginRight: 10,
    },
    authorText: {
        color: '#000',
        fontSize: 12,
    },
    timeText: {
        color: '#616161',
        fontSize: 12,
    },
    contentText: {
        color: '#000',
        fontSize: 14,
        lineHeight: 18,
    },
    headerTintText: {
        fontSize: 17,
        color: '#007AFF',
        marginLeft: 10,
        marginVertical: 12,
    },
});
