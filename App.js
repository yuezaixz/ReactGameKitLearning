/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';

import PropTypes from 'prop-types'

import {
    Loop,
    Stage,
    Sprite
} from 'react-game-kit/native'

type Props = {};
export default class App extends Component<Props> {
    static contextTypes = {
        loop: PropTypes.object,
    };

    loop = () => {
        //Do stuff here
    };

    componentDidMount() {
        // this.loopID = this.context.loop.subscribe(this.loop);
    }

    componentWillUnmount() {
        // this.context.loop.unsubscribe(this.loopID);
    }

    render() {
        return (
            <Loop>
                <Stage width={1024} height={576}>
                    <Sprite
                        repeat={true}
                        src={require('./assets/character-sprite.png')}
                        scale={0.5 * 2}
                        state={0}
                        steps={[9, 9, 0, 4, 5]}
                    />
                </Stage>
            </Loop>
        );
    }
}