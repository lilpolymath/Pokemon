import React, {Component} from 'react';
import {Text, FlatList, Image, TouchableOpacity, View} from 'react-native';

import {AppContext} from '../../../App';
import styles from './styles';

export class Pokemon extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({name, pic, types, desc, onPress}) => (
          <TouchableOpacity onPress={onPress}>
            <View style={styles.mainDetails}>
              <Image
                source={{uri: pic}}
                style={styles.image}
                resizeMode={'contain'}
              />
              <Text style={styles.mainText}>{name}</Text>

              <FlatList
                columnWrapperStyle={styles.types}
                data={types}
                numColumns={2}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                  return (
                    <View style={[styles[item.name], styles.type]}>
                      <Text style={styles.typeText}>{item.name}</Text>
                    </View>
                  );
                }}
              />

              <View style={styles.description}>
                <Text>{desc}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Pokemon;
