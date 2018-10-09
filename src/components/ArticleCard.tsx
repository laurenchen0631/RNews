import React, { PureComponent } from 'react';
import { View, Image, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Article } from '../api/news';
import { getTimeDiffOfLocaleString } from '../utils/time';

const deviceWidth: number = Dimensions.get('window').width;

interface PropTypes {
    article: Article;
    onPress: (article: Article) => void;
}

export default class ArticleCard extends PureComponent<PropTypes> {
    public render() {
        return (
            <TouchableOpacity
                onPress={this.handleOnPress}
            >
                <View style={styles.card}>
                    {
                        this.props.article.urlToImage &&
                        <Image
                            style={styles.image as any}
                            source={{ uri: this.props.article.urlToImage! }}
                            resizeMode="cover"
                            resizeMethod="scale"
                        />
                    }
                    <View style={styles.contentWrapper}>
                        <View style={styles.infoRow}>
                            <Text style={styles.sourceText}>{this.props.article.source.name.split('.')[0]}</Text>
                            <Text style={styles.timeText}>{getTimeDiffOfLocaleString(this.props.article.publishedAt)}</Text>
                        </View>
                        <Text style={styles.titleText}>
                            {this.props.article.title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    private handleOnPress = () => {
        this.props.onPress(this.props.article);
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        marginTop: 15,
    },
    image: {
        width: deviceWidth,
        height: 200,
    },
    contentWrapper: {
        padding: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    sourceText: {
        color: '#000035',
        fontSize: 14,
        fontWeight: 'bold',
    },
    timeText: {
        color: '#616161',
        fontSize: 12,
    },
    titleText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
        lineHeight: 24,
    },
});
