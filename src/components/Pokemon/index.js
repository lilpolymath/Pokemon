import React, {Component} from 'react';
import {Text, FlatList, Image, TouchableOpacity, View} from 'react-native';

import {AppContext} from '../../../App';
import styles from './styles';

export class Pokemon extends Component {
  render() {
    const format = text => {
      return text.replace(/\r?\n|\r/g, ' ');
    };
    return (
      <AppContext.Consumer>
        {({name, pic, types, desc, onPress}) => (
          <TouchableOpacity
            style={[styles.something, styles.pokemon]}
            onPress={onPress}
            activeOpacity={0.3}>
            <View style={styles.mainDetails}>
              <Image
                source={{uri: pic}}
                style={styles.image}
                resizeMode={'cover'}
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
                <Text>{format(desc)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Pokemon;
