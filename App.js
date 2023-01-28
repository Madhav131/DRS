import React from 'react';
import {
  SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View,
} from 'react-native';
import Navigation from './Src/navigation'
import { ProductProvider } from './Src/Context/product_context'
import { CartProvider } from './Src/Context/cart_context'
import { ThemeProvider } from './Src/Context/them_context';

const App = () => {

  return (
    <ThemeProvider>
      <ProductProvider>
        <CartProvider>
          <Navigation />
        </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
};


export default App;
