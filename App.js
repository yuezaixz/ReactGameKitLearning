/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
    TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types'

import Matter from 'matter-js'

import {
    Loop,
    Stage,
    Sprite,
    TileMap,
    Body,
    World
} from 'react-game-kit/native'

type Props = {};
export default class App extends Component<Props> {
    static contextTypes = {
        loop: PropTypes.object,
    };

    loop = () => {
        //Do stuff here
    };

    physicsInit = (engine) => {
        console.log(engine)
        const ground = Matter.Bodies.rectangle(
            512, 448,
            1024, 64,
            {
                isStatic: true,
            },
        );

        Matter.World.addBody(engine.world, ground);
    }

    moveTest = () => {
        const { body } = this.body;
        console.log("1")
        console.log(body.position)
        Matter.Body.setVelocity(body, { x:5, y: 0 });
    }

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
                    <World onInit={this.physicsInit} >
                        <TileMap
                            style={{ top: Math.floor(-63*0.3) }}
                            src={require('./assets/buildings.png')}
                            rows={1}
                            columns={6}
                            tileSize={512/3}
                            sourceWidth={3014/3}
                            layers={[
                                [1, 2, 3, 4, 5, 6],
                            ]}
                        />
                        <TileMap
                            src={require('./assets/boardwalktile.png')}
                            tileSize={128}
                            columns={24}
                            rows={4}
                            sourceWidth={128}
                            layers={[
                                [
                                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                ],
                            ]}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this.moveTest.bind(this)}
                        >
                            <Body
                                args={[0, 384, 64, 64]}
                                inertia={Infinity}
                                ref={b => {
                                    this.body = b;
                                }}
                            >
                            <Sprite
                                repeat={true}
                                src={require('./assets/character-sprite.png')}
                                scale={0.5 * 2}
                                state={0}
                                steps={[9, 9, 0, 4, 5]}
                            />
                            </Body>

                        </TouchableOpacity>
                    </World>
                </Stage>
            </Loop>
        );
    }
}