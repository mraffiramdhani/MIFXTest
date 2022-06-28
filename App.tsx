import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, FlatList} from 'react-native';
import {PixelRatio, StatusBar, StyleSheet} from 'react-native';
import {Text, TouchableOpacity, View, ListRenderItem} from 'react-native';
import {Rating} from 'react-native-ratings';

import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

const apiUrl = 'https://fe.dev.dxtr.asia/api';
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODJhZjVmMGNmMjY2MmFjNDY2YjgwYTkyMDMxZDcyMjdjZjA4YzM3ZWU1Mzc1MzY1ODJkZDcyOTFlMjZhMjI3MDBjYWNhYzVkMWY2YWI3NzAiLCJpYXQiOjE2NTY0MTI0OTUsIm5iZiI6MTY1NjQxMjQ5NSwiZXhwIjoxNjg3OTQ4NDk1LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.rRGevp-GHGEFiN1zvXqHUzqVIRlCgAG13x9ldSgQ5MKiyFAs9eAwCS22Tu1UjbDOqW2dvW9V9duW6IqxG7jad74pZ-U46JIB1HpTWQHUXct6YxUPTKFsTeH2ZgfIAmjThsErgDLHMbz6g-dzv0YbI0omaZ3ZwWyznsyO4MYGyf002zFzxcEfva9DaOgVPn2JPnxsl9tz3PFxwSCBPuHoyWCa1Fe4Gpm3ZMFX_bA1I12tg9qTStmwLBn9eJ-K22ku8sNgLirvQm5c6lnCuIrzpUVB1a1dRzHwrXAwZUmmLNzeh6S8_OPV3EYCJa1D-gXIrOAkpHZ4caijoC9yTjo_iSZ7Aawa5OGAQgh-Iy_PklmB7VLwxjJPuWT-8G4J1lUzlaI8mEmsdwhRdpKVLSbs4Y8TtZsXJPRH-0K1CQKSrh_CBkV57rOVK_Yb-xiOPzW2Ot-BGAC43nzf6Ox0C4UVfak3N2B9aZfyDVjunXgWXqhifJXrD5JDs2oadBGDmLr67fdyRBRFvYS4Rq1DWTr3InTiQtez8VsDrGkLAKJp_kzDGD3S_acMlvrqkOQRGaNBJKHHBHCSAIqY666xe4wPVWC9STDhJM-JSpWEyZLVAQUu73KN53hQfguad_BTG-9gHByngyZc1d0e-Nzh3Dp4aYdkTceE_qsb5XEFw0dfh3k';

type CategoryType = {
  id: string;
  name: string;
};

type ProductType = {
  [k: string]: any;
};

const App = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const init = async () => {
      const categoryFetch = fetch(`${apiUrl}/category`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then(res => res.json());
      const productFetch = fetch(`${apiUrl}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then(res => res.json());
      Promise.all([categoryFetch, productFetch]).then(values => {
        setCategories(values[0]);
        setProducts(values[1]);
      });
    };

    init();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f6f6f6" barStyle="dark-content" />
      <View
        style={[
          styles.flexRow,
          styles.itemsCenter,
          styles.justifyBetween,
          styles.header,
        ]}>
        <View style={[styles.flexRow, styles.itemsCenter]}>
          <TouchableOpacity
            style={[
              styles.itemsCenter,
              styles.bgWhite,
              styles.roundedBorder,
              styles.navButton,
            ]}>
            <Octicons name="arrow-left" size={24} color="#212121" />
          </TouchableOpacity>
          <Text style={[styles.colorDarkGray, styles.title]}>Shoes</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.itemsCenter,
            styles.bgWhite,
            styles.roundedBorder,
            styles.navButton,
          ]}>
          <FontAwesome name="sliders" size={24} color="#212121" />
        </TouchableOpacity>
      </View>
      {Array.isArray(categories) && categories.length ? (
        <FlatList
          style={{marginTop: 32, marginBottom: 16, flexGrow: 0, flexShrink: 0}}
          contentContainerStyle={{paddingHorizontal: 12}}
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={CategoryItem}
          ItemSeparatorComponent={() => <View style={{width: 16}} />}
        />
      ) : (
        <View
          style={[
            styles.itemsCenter,
            {marginTop: 32, marginBottom: 16, justifyContent: 'center'},
          ]}>
          <ActivityIndicator size="small" color="#212121" />
        </View>
      )}
      <FlatList
        key={2}
        data={products}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 8}}
        showsVerticalScrollIndicator={false}
        renderItem={ProductItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const CategoryItem: ListRenderItem<CategoryType> = ({item}) => (
  <TouchableOpacity style={[styles.bgWhite, styles.categoryItemContainer]}>
    <Text
      allowFontScaling={false}
      style={[styles.fontRegular, styles.fontW700, styles.colorDarkGray]}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

const ProductItem: ListRenderItem<ProductType> = ({item, index}) => {
  const imageWidth =
    PixelRatio.roundToNearestPixel(Dimensions.get('window').width / 2) - 48;

  return (
    <View key={index.toString()} style={styles.productItemContainer}>
      <TouchableOpacity style={[styles.bgWhite, styles.productItemCard]}>
        <View>
          {item.out_of_stock ? (
            <View
              style={[
                styles.absolute,
                styles.productStatusBadge,
                {backgroundColor: '#ff0028'},
              ]}>
              <Text style={[styles.fontW500, {color: 'white', fontSize: 10}]}>
                Out of stock
              </Text>
            </View>
          ) : item.new ? (
            <View
              style={[
                styles.absolute,
                styles.bgWhite,
                styles.productStatusBadge,
              ]}>
              <Text
                style={[
                  styles.fontRegular,
                  styles.colorDarkGray,
                  styles.fontW500,
                ]}>
                New
              </Text>
            </View>
          ) : null}
          <TouchableOpacity
            style={[
              styles.absolute,
              styles.bgWhite,
              styles.roundedBorder,
              styles.favoriteButton,
            ]}>
            <FontAwesome name="heart-o" size={16} color="#817e84" />
          </TouchableOpacity>
          <FastImage
            source={{
              uri: item.image,
              cache: FastImage.cacheControl.immutable,
              priority: FastImage.priority.high,
            }}
            style={{width: imageWidth, height: imageWidth}}
            onLoad={e => console.warn(e.nativeEvent)}
            resizeMode="contain"
          />
        </View>
        <Rating
          imageSize={12}
          showRating={false}
          readonly
          jumpValue={0.5}
          startingValue={item.rating}
          style={{alignSelf: 'flex-start'}}
        />
        <Text
          style={[
            styles.fontRegular,
            styles.fontW700,
            {color: '#878490', marginVertical: 4},
          ]}>
          {item.name}
        </Text>
        <View
          style={[
            styles.flexRow,
            styles.justifyBetween,
            {alignItems: 'flex-start'},
          ]}>
          <Text
            style={[styles.colorDarkGray, {fontSize: 14, fontWeight: '800'}]}>
            {item.price}
          </Text>
          {item.off ? (
            <Text style={[styles.fontW500, {color: '#7760ab', fontSize: 10}]}>
              {item.off}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  categoryItemContainer: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#efefef',
  },
  colorDarkGray: {
    color: '#212121',
  },
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 24,
  },
  favoriteButton: {
    top: 0,
    right: 0,
    padding: 8,
    zIndex: 2,
  },
  flexRow: {
    flexDirection: 'row',
  },
  fontRegular: {
    fontSize: 12,
  },
  fontW500: {
    fontWeight: '500',
  },
  fontW700: {
    fontWeight: '700',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 24,
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  roundedBorder: {
    borderRadius: 100,
  },
  navButton: {
    justifyContent: 'center',
    width: 36,
    height: 36,
    shadowColor: '#424242',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 9.22,
    elevation: 12,
  },
  productItemCard: {
    shadowColor: '#424242',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 10,
    padding: 8,
    borderRadius: 8,
  },
  productItemContainer: {
    padding: 10,
    paddingTop: 4,
    flex: 1 / 2,
  },
  productStatusBadge: {
    zIndex: 2,
    top: 2,
    left: 2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 16,
  },
});
