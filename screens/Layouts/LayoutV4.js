import React from 'react';
import {ScrollView, View} from "native-base";

const LayoutV4 = ({children, overlay = false}) => {
    return (
        <ScrollView flexGrow={1}>
            <View style={{flex: 1}}>
                {children}
            </View>
        </ScrollView>

    )
}

export default LayoutV4