import React from 'react';
import {ScrollView, View} from "native-base";
import {Colors} from "../../Colors";
import { useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const LayoutV4 = ({children, overlay = false, white = false, bounces = false}) => {

    const scrollRef = useRef();

    useFocusEffect(
        React.useCallback(() => {
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
              });
        }, [])
    );

    return (
        <ScrollView ref={scrollRef} bounces={bounces} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} flexGrow={1} bgColor={white ? '#fff' : Colors.gray}>
            <View style={{flex: 1}}>
                {children}
            </View>
        </ScrollView>

    )
}

export default LayoutV4