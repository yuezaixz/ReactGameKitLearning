import React, { Component } from 'react';
import { Image, Dimensions, PanResponder, View } from 'react-native';
import {
    Body,
    Loop,
    Stage,
    World,
} from 'react-game-kit/native';

import Matter from 'matter-js';

export default class Game extends Component {

    handleUpdate = () => {
        this.setState({
            ballPosition: this.body.body.position,
            ballAngle: this.body.body.angle,
        });
    }

    physicsInit = (engine) => {

        const dimensions = Dimensions.get('window');

        const ground = Matter.Bodies.rectangle(
            dimensions.width / 2, dimensions.height + 5-75/2,
            dimensions.width, 5,
            {
                isStatic: true,
            },
        );

        const ceiling = Matter.Bodies.rectangle(
            dimensions.width / 2, -75/2,
            dimensions.width, 1,
            {
                isStatic: true,
            },
        );

        const leftWall = Matter.Bodies.rectangle(
            -75/2, dimensions.height / 2,
            1, dimensions.height,
            {
                isStatic: true,
            },
        );

        const rightWall = Matter.Bodies.rectangle(
            dimensions.width-75/2, dimensions.height / 2,
            1, dimensions.height - 5,
            {
                isStatic: true,
            },
        );

        const frontBacket = Matter.Bodies.rectangle(
            dimensions.width-195, 195,
            5, 5,
            {
                isStatic: true,
            },
        );

        const backBacket = Matter.Bodies.rectangle(
            dimensions.width-50, 195,
            50, 5,
            {
                isStatic: true,
            },
        );

        Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling, frontBacket, backBacket]);
    }

    constructor(props) {
        super(props);

        this.state = {
            gravity: 1,
            ballPosition: {
                x: 0,
                y: 0,
            },
            ballAngle: 0,
        };
    }

    clickTime = 0

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                // this.setState({
                //     gravity: 0,
                // });
                //
                Matter.Body.setAngularVelocity(this.body.body, -0.1);
                Matter.Body.setVelocity(this.body.body, {x: 3, y: -20});
                //
                // this.startPosition = {
                //     x: this.body.body.position.x,
                //     y: this.body.body.position.y,
                // }
            },
            onPanResponderMove: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // this.setState({
                //     gravity: 1,
                // });
                //
                // Matter.Body.applyForce(this.body.body, {
                //     x: this.body.body.position.x,
                //     y: this.body.body.position.y,
                // }, {
                //     x: gestureState.vx,
                //     y: gestureState.vy,
                // });
            },
        });

        // this._panResponder = PanResponder.create({
        //     onStartShouldSetPanResponder: (evt, gestureState) => true,
        //     onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        //     onMoveShouldSetPanResponder: (evt, gestureState) => true,
        //     onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        //     onPanResponderGrant: (evt, gestureState) => {
        //         this.setState({
        //             gravity: 0,
        //         });
        //
        //         Matter.Body.setAngularVelocity(this.body.body, 0);
        //         Matter.Body.setVelocity(this.body.body, {x: 0, y: 0});
        //
        //         this.startPosition = {
        //             x: this.body.body.position.x,
        //             y: this.body.body.position.y,
        //         }
        //     },
        //     onPanResponderMove: (evt, gestureState) => {
        //         Matter.Body.setPosition(this.body.body, {
        //             x: this.startPosition.x + gestureState.dx,
        //             y: this.startPosition.y + gestureState.dy,
        //         });
        //     },
        //     onPanResponderRelease: (evt, gestureState) => {
        //         this.setState({
        //             gravity: 1,
        //         });
        //
        //         Matter.Body.applyForce(this.body.body, {
        //             x: this.body.body.position.x,
        //             y: this.body.body.position.y,
        //         }, {
        //             x: gestureState.vx,
        //             y: gestureState.vy,
        //         });
        //     },
        // });
    }

    getBallStyles() {
        return {
            height: 75,
            width: 75,
            position: 'absolute',
            transform: [
                { translateX: this.state.ballPosition.x },
                { translateY: this.state.ballPosition.y },
                { rotate: (this.state.ballAngle * (180 / Math.PI)) + 'deg'}
            ],
        };
    }

    render() {
        const dimensions = Dimensions.get('window');
        return (
            <Loop>
                <Stage
                    width={dimensions.width}
                    height={dimensions.height}
                    style={{ backgroundColor: '#3a9bdc' }}
                >
                    <World
                        onInit={this.physicsInit}
                        onUpdate={this.handleUpdate}
                        gravity={{ x: 0, y: this.state.gravity, scale: 0.001 }}
                    >
                        <Body
                            shape="circle"
                            args={[dimensions.width/2-75/2, dimensions.height/2 - 75/2, 75/2]}//[初始x坐标，初始y坐标，半径] 因为是圆，所以是3个参数
                            density={0.003}
                            friction={1}
                            frictionStatic={0}
                            restitution={0.5}
                            ref={(b) => { this.body = b; }}
                        >
                            <View
                                style={this.getBallStyles()} {...this._panResponder.panHandlers}
                            >
                                <Image
                                    source={require('./assets/basketball.png')}
                                    height={75}
                                    width = {75}
                                />
                            </View>
                        </Body>
                        <View
                            style={{
                                height:160,
                                width:160,
                                position:'absolute',
                                right:0,
                                top:200
                            }}
                        >
                            <Image
                                source={require('./assets/backet_100.png')}
                                height={160}
                                width = {160}
                            />
                        </View>

                    </World>
                </Stage>
            </Loop>
        );
    }
}
