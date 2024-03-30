import { GLView } from "expo-gl";
import React from "react";
import Expo2DContext from "expo-2d-context";

export default class Canvas extends React.Component {
    render() {
        console.log("render");
        return (

                <GLView style={{ flex: 1 }}
                        onStartShouldSetResponder={() => true}
                        onContextCreate={this._onGLContextCreate}
                        onResponderGrant={this._onResponderGrant}
                />
        );
    }
    _onGLContextCreate = (gl) => {
        const ctx = new Expo2DContext(gl);
        ctx.translate(0, 0);
        ctx.scale(1, 1);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 500, 500);
        ctx.fillStyle = "white";
        ctx.fillRect(50, 50, 400, 400);
        //ctx.stroke();
        //ctx.flush();
    };
    _onResponderGrant = (event) => {
        console.log(event.nativeEvent.locationX, event.nativeEvent.locationY)
        console.log(`_onResponderGrant`);
    }

}

