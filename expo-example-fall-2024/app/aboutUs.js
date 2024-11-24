import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function AboutUs() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About Our Recipe App</Text>
      <Text style={styles.paragraph}>
        Welcome to our Recipe App! This app is your go-to resource for discovering, saving, and organizing a wide variety of recipes. Whether you're looking for inspiration for your next meal or want to try something completely new, we've got you covered.
      </Text>
      <Text style={styles.paragraph}>
        Explore a diverse collection of recipes from cuisines around the world. Each recipe includes a detailed list of ingredients and clear instructions to help you create delicious dishes with ease. You can browse through recipes, find your favorites, and keep track of them for future use.
      </Text>
      <Text style={styles.paragraph}>
        In addition to discovering new recipes, you can also add your own! Whether it's a family favorite, an original creation, or a recipe you've modified to perfection, this app allows you to store and organize your personal recipes alongside those you find.
      </Text>
      <Text style={styles.paragraph}>
        We believe that cooking should be fun, inspiring, and accessible to everyone. Our goal is to make it simple for you to explore new dishes and preserve the recipes you love. Happy cooking, and thank you for being a part of our community!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
});
