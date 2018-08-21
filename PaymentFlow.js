"use strict";
// @flow

import {Component} from "react";
import React from "react";
import {Text, TouchableHighlight, View} from "react-native";

type PaymentFlowProps = {
    videoId: number,
    userId: number,
    productId: string,
    navigateBack: Function,
}

type PaymentFlowState = {
    showSomeOtherFlow: boolean,
}

export default class PaymentFlow extends Component<PaymentFlowProps, PaymentFlowState> {
    state: PaymentFlowState = {
        showSomeOtherFlow: false
    };

    render() {
        return (
            <View>
                {!this.state.showSomeOtherFlow &&
                    <View>
                        <View>
                            <Text>The user id: {this.props.userId}</Text>
                            <Text>The item id to buy: {this.props.productId}</Text>
                            <Text>The video id: {this.props.videoId}</Text>
                        </View>
                        <TouchableHighlight
                            onPress={
                                () => {
                                    // we could inject this URL, but I don't imagine that your JS package will be making this call,
                                    // i imagine some backend service will be.
                                    const recordUserPurchaseURL = "http://localhost:8082/purchases";

                                    fetch(recordUserPurchaseURL, {
                                        method: 'post',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            userId: this.props.userId,
                                            productId: this.props.productId,
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
                        <TouchableHighlight
                            onPress={
                                () => {
                                    this.setState({showSomeOtherFlow: true});
                                }
                            }
                        >
                            <Text>View some other flow</Text>
                        </TouchableHighlight>
                    </View>
                }

                {this.state.showSomeOtherFlow &&
                    <View>
                        <Text>Some other flow</Text>
                        <TouchableHighlight
                            onPress={
                                () => {
                                    this.setState({showSomeOtherFlow: false});
                                }
                            }
                        >
                            <Text>Go Back</Text>
                        </TouchableHighlight>
                    </View>
                }
            </View>
        )
    }
}
