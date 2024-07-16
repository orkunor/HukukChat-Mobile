import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { blueColor, orangeColor } from '../../../../statics/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';


const CreditItem = ({ item }) => {
  return (
    <LinearGradient
      colors={[orangeColor, 'black']}
      style={{ borderRadius: 15, marginHorizontal: 10, minHeight: 300, minWidth: 300,padding:10 }}
    >
      <TouchableOpacity style={{ padding: 20, borderRadius: 15, minHeight: 300, minWidth: 300, paddingVertical: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth: 2, borderRadius: 12, paddingHorizontal: 17, paddingVertical: 7, display: 'flex', marginHorizontal: 20 }}>
          <Ionicons name="diamond-outline" size={22} color={blueColor} />
          <Text style={{ fontSize: 22, fontWeight: '600', color: blueColor, marginLeft: 18 }}>{item.packageName}</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 22 }}>
          <Text style={{ fontSize: 25, fontWeight: '700', color: 'white' }}>{item.packagePrice}</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <Text style={{ fontSize: 25, fontWeight: '700', color: 'white' }}>Kontör: {item.count}</Text>
        </View>

        <View style={{ flex: 1, marginTop: 50 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical:5 }}>
            <Ionicons name="checkmark-outline" size={22} color="white" />
            <Text style={{ fontSize: 14, color: 'white', marginLeft: 6 }}>Yapay Zeka Desteğiyle Soru Cevap</Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical:5}}>
            <Ionicons name="checkmark-outline" size={22} color="white" />
            <Text style={{ fontSize: 14, color: 'white', marginLeft: 6 }}>Webde Arama</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical:5}}>
            <Ionicons name="checkmark-outline" size={22} color="white" />
            <Text style={{ fontSize: 14, color: 'white', marginLeft: 6 }}>GPT-4, Gemini, Claude 3 Destekli</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical:5}}>
            <Ionicons name="checkmark-outline" size={22} color="white" />
            <Text style={{ fontSize: 14, color: 'white', marginLeft: 6 }}>Güncel Hukuk Dökümanları ile Geliştirilmiş</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical:5 }}>
            <Ionicons name="checkmark-outline" size={22} color="white" />
            <Text style={{ fontSize: 14, color: 'white', marginLeft: 6 }}>Binlerce Hukuk Dökümanına Kolay Erişim</Text>
          </View>
          <TouchableOpacity style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center', borderRadius: 7, paddingHorizontal: 20, marginTop: 35 }}>
            <Text style={{ color: blueColor, fontWeight: '600', fontSize: 22 }}>Paketi Seç</Text>
            <Ionicons name="arrow-forward-outline" size={27} color={blueColor} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CreditItem;

const styles = StyleSheet.create({});
