"use strict";
// @flow

import {Component} from "react";
import React from "react";
import {Text, TouchableHighlight, View} from "react-native";

type FakeFlowProps = {
    videoId: number,
    userId: number,
    itemId: string,
    navigateBack: Function,
}

export default class FakeFlow extends Component<FakeFlowProps> {
    render() {
        return (
            <View>
                <View>
                    <Text>The user id: {this.props.userId}</Text>
                    <Text>The item id to buy: {this.props.itemId}</Text>
                    <Text>The video id: {this.props.videoId}</Text>
                </View>
                <TouchableHighlight
                    onPress={
                        () => {
                            const recordUserPurchaseURL = "http://localhost:8082/purchases";

                            fetch(recordUserPurchaseURL, {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    userId: this.props.userId,
                                    productId: this.props.itemId,
                                }),
                            }).then((response) => {
                                // @todo wrap the video id and navigate call in a closure so they just have to blindly call a function homie
                                this.props.navigateBack(this.props.videoId);
                            }).catch((error) => {
                                console.log("Error saving the purchase: ", error);
                                this.props.navigateBack(this.props.videoId);
                            });
                        }
                    }
                >
                    <Text>Touch me to complete purchase</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={
                        () => {
                            this.props.navigateBack(this.props.videoId);
                        }
                    }
                >
                    <Text>Cancel</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
