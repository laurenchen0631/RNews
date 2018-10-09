import React, { PureComponent } from 'react';
import { View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
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
                <View style={{ backgroundColor: 'white', marginTop: 15 }}>
                    {
                        this.props.article.urlToImage &&
                        <Image
                            style={{ width: deviceWidth, height: 200 }}
                            source={{ uri: this.props.article.urlToImage! }}
                            resizeMode="cover"
                            resizeMethod="scale"
                        />
                    }
                    <View style={{ padding: 10  }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text style={{ color: '#000035', fontSize: 14, fontWeight: 'bold' }}>{this.props.article.source.name.split('.')[0]}</Text>
                            <Text style={{ color: '#616161', fontSize: 12 }}>{getTimeDiffOfLocaleString(this.props.article.publishedAt)}</Text>
                        </View>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#000', lineHeight: 24 }}>
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
