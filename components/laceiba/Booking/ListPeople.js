import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import ItemListPeople from "./ListPeopleItem";

const ListPeople = ({people, selectedPerson, peopleSelected, countPlayers}) => {
    return(
        <View style={{marginBottom:10,}}>
            {people.length > 0 ? (
                <FlatList 
                    data={people}
                    contentContainerStyle={{alignItems:'center'}}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_,index) => (index+1).toString()}
                    renderItem={({item, index}) => (
                        <ItemListPeople 
                            item={item} 
                            index={index} 
                            selectPerson={selectedPerson} 
                            peopleSelected={peopleSelected}
                            countPlayers={countPlayers}
                        />

                    )}
                />

            ):(
                <View style={{alignSelf:'center'}}>
                    <Text>No se encontraron personas</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({

})

export default ListPeople