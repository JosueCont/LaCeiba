import React from 'react';
import {View} from "native-base";
import {Colors} from "../../Colors";

const LayoutV5 = ({children, overlay = false, white = false, bounces = false}) => {
    return (
        <View flex={1} bgColor={white ? '#fff' : Colors.greenLight}>
            <View style={{flex: 1}}>
                {children}
            </View>
        </View>

    )
}

export default LayoutV5