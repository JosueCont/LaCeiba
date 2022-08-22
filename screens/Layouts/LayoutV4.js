import React from 'react';
import {ScrollView, View} from "native-base";
import {Colors} from "../../Colors";

const LayoutV4 = ({children, overlay = false, white = false}) => {
    return (
        <ScrollView flexGrow={1} bgColor={white ? '#fff' : Colors.greenLight}>
            <View style={{flex: 1}}>
                {children}
            </View>
        </ScrollView>

    )
}

export default LayoutV4