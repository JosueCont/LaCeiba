import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import ItemListPeople from "./ListPeopleItem";

const ListPeople = ({people}) => {
    return(
        <View style={{marginBottom:50}}>
            {people.length > 0 ? people.map((item,index) => (
                <ItemListPeople item={item} index={index}/>
            )):(
                <View></View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({

})

export default ListPeople