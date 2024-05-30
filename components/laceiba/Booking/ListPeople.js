import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import ItemListPeople from "./ListPeopleItem";
import { useSelector } from "react-redux";

const ListPeople = ({people, selectedPerson, peopleSelected, countPlayers, txt, type}) => {
    const user = useSelector(state => state.appDuck.user)

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

            ):peopleSelected.length > 0 && txt===''  ? 
                type===0 && peopleSelected.filter(item => item?.user && item?.user?.id !== user?.id).length > 0 ? (
                    <FlatList 
                    data={peopleSelected.filter(item => item?.userId && item?.userId !== user?.id)}
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
                ): type===1 && peopleSelected.filter(item => item?.idInvitado).length > 0 && (
                    <FlatList 
                    data={peopleSelected.filter(item => item?.idInvitado)}
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
                )
            :(
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