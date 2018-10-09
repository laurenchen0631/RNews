import React, { PureComponent } from 'react';
import { View, Text, Dimensions, Image, ScrollView, Button, Modal, WebView, TouchableOpacity } from 'react-native';
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
            <ScrollView style={{ backgroundColor: '#FFF', flex: 1 }}>
                {
                    article.urlToImage &&
                    typeof imageRatioByWidth === 'number' &&
                    <Image
                        source={{ uri: article.urlToImage }}
                        style={{ width: deviceWidth, height: imageRatioByWidth ? imageRatioByWidth * deviceWidth : 200 }}
                    />
                }
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#000', lineHeight: 24 }}>
                        {article.title}
                    </Text>

                    <View style={{ flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', marginTop: 10, marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#616161', fontSize: 12, marginRight: 10 }}>
                                {article.source.name && article.source.name.split('.')[0]}
                            </Text>
                            <Text style={{ color: '#000', fontSize: 12 }}>
                                {article.author && article.author.split('/').splice(-1)}
                            </Text>
                        </View>

                        <Text style={{ color: '#616161', fontSize: 12 }}>{getTimeDiffOfLocaleString(article.publishedAt)}</Text>
                    </View>

                    <Text style={{ color: '#000', fontSize: 14, lineHeight: 18 }}>
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
                        <Text style={{ fontSize: 17, color: '#007AFF', marginLeft: 10, marginVertical: 12 }}>關閉</Text>
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
