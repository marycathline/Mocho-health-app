import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

// Mock health education data
const healthArticles = {
  contraception: [
    {
      id: 1,
      title: 'Understanding Birth Control Options',
      summary: 'Learn about different contraceptive methods and their effectiveness.',
      content: 'There are many birth control options available including pills, condoms, IUDs, and implants. Each has different effectiveness rates and side effects. It\'s important to discuss with a healthcare provider to find the best option for you.',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Emergency Contraception',
      summary: 'What to do when regular contraception fails.',
      content: 'Emergency contraception can prevent pregnancy after unprotected sex. It\'s most effective when taken within 72 hours. There are several types available including morning-after pills.',
      readTime: '3 min'
    }
  ],
  maternal: [
    {
      id: 3,
      title: 'Prenatal Care Essentials',
      summary: 'Important steps for a healthy pregnancy.',
      content: 'Regular prenatal checkups are crucial for monitoring both mother and baby\'s health. This includes taking folic acid, avoiding alcohol and smoking, and maintaining a healthy diet.',
      readTime: '7 min'
    },
    {
      id: 4,
      title: 'Preparing for Childbirth',
      summary: 'What to expect during labor and delivery.',
      content: 'Understanding the stages of labor can help you prepare for childbirth. Learn about pain management options, when to go to the hospital, and what to pack in your hospital bag.',
      readTime: '6 min'
    }
  ],
  nutrition: [
    {
      id: 5,
      title: 'Healthy Eating During Pregnancy',
      summary: 'Nutritional needs for expecting mothers.',
      content: 'Pregnant women need extra nutrients like folic acid, iron, and calcium. Focus on eating a variety of fruits, vegetables, whole grains, and lean proteins.',
      readTime: '4 min'
    },
    {
      id: 6,
      title: 'Menstrual Health and Nutrition',
      summary: 'Foods that can help with period symptoms.',
      content: 'Certain foods can help reduce menstrual cramps and other period symptoms. Iron-rich foods help prevent anemia, while calcium and magnesium can reduce cramping.',
      readTime: '5 min'
    }
  ],
  mental: [
    {
      id: 7,
      title: 'Managing Stress and Anxiety',
      summary: 'Techniques for mental well-being.',
      content: 'Stress and anxiety are common, especially during reproductive health changes. Deep breathing, meditation, exercise, and talking to trusted friends can help manage these feelings.',
      readTime: '6 min'
    },
    {
      id: 8,
      title: 'Postpartum Mental Health',
      summary: 'Understanding emotions after childbirth.',
      content: 'It\'s normal to feel emotional after having a baby. However, persistent sadness, anxiety, or thoughts of harm may indicate postpartum depression and should be discussed with a healthcare provider.',
      readTime: '8 min'
    }
  ]
};

const categories = [
  { key: 'contraception', title: 'Contraception', icon: 'shield', color: '#E91E63' },
  { key: 'maternal', title: 'Maternal Care', icon: 'heart', color: '#9C27B0' },
  { key: 'nutrition', title: 'Nutrition', icon: 'nutrition', color: '#4CAF50' },
  { key: 'mental', title: 'Mental Health', icon: 'happy', color: '#FF9800' }
];

export default function LibraryScreen() {
  const [selectedCategory, setSelectedCategory] = useState('contraception');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [language, setLanguage] = useState('en'); // en, sw (Swahili), dh (Dholuo)

  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
    { code: 'dh', name: 'Dholuo', flag: '🇰🇪' }
  ];

  const getTranslatedText = (key) => {
    const translations = {
      'Health Education Library': {
        en: 'Health Education Library',
        sw: 'Maktaba ya Elimu ya Afya',
        dh: 'Ot puonj mar chuny'
      },
      'Select Language': {
        en: 'Select Language',
        sw: 'Chagua Lugha',
        dh: 'Yer dhok'
      },
      'Categories': {
        en: 'Categories',
        sw: 'Makundi',
        dh: 'Migepe'
      },
      'Back to Categories': {
        en: 'Back to Categories',
        sw: 'Rudi kwa Makundi',
        dh: 'Dog ir migepe'
      },
      'Read Time': {
        en: 'Read Time',
        sw: 'Muda wa Kusoma',
        dh: 'Kinde mar somo'
      },
      'Contraception': {
        en: 'Contraception',
        sw: 'Uzazi wa Mpango',
        dh: 'Gengʼo mar nywol'
      },
      'Maternal Care': {
        en: 'Maternal Care',
        sw: 'Huduma za Mama',
        dh: 'Rito min'
      },
      'Nutrition': {
        en: 'Nutrition',
        sw: 'Lishe',
        dh: 'Chiemo'
      },
      'Mental Health': {
        en: 'Mental Health',
        sw: 'Afya ya Akili',
        dh: 'Chuny maber'
      }
    };
    
    return translations[key]?.[language] || key;
  };

  if (selectedArticle) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.articleHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedArticle(null)}
          >
            <Ionicons name="arrow-back" size={24} color={theme.primary} />
            <Text style={styles.backText}>{getTranslatedText('Back to Categories')}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.articleContent}>
          <Text style={styles.articleTitle}>{selectedArticle.title}</Text>
          <View style={styles.articleMeta}>
            <Ionicons name="time" size={16} color={theme.textSecondary} />
            <Text style={styles.readTime}>
              {getTranslatedText('Read Time')}: {selectedArticle.readTime}
            </Text>
          </View>
          <Text style={styles.articleText}>{selectedArticle.content}</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{getTranslatedText('Health Education Library')}</Text>
      </View>

      <View style={styles.languageSelector}>
        <Text style={styles.sectionTitle}>{getTranslatedText('Select Language')}</Text>
        <View style={styles.languageButtons}>
          {languageOptions.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageButton,
                language === lang.code && styles.selectedLanguageButton
              ]}
              onPress={() => setLanguage(lang.code)}
            >
              <Text style={styles.languageFlag}>{lang.flag}</Text>
              <Text style={[
                styles.languageText,
                language === lang.code && styles.selectedLanguageText
              ]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getTranslatedText('Categories')}</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryCard,
                selectedCategory === category.key && styles.selectedCategoryCard,
                { borderLeftColor: category.color }
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Ionicons 
                name={category.icon} 
                size={24} 
                color={selectedCategory === category.key ? '#fff' : category.color} 
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.key && styles.selectedCategoryText
              ]}>
                {getTranslatedText(category.title)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <FlatList
          data={healthArticles[selectedCategory]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.articleCard}
              onPress={() => setSelectedArticle(item)}
            >
              <View style={styles.articleHeader}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <View style={styles.articleMeta}>
                  <Ionicons name="time" size={14} color={theme.textSecondary} />
                  <Text style={styles.articleMetaText}>{item.readTime}</Text>
                </View>
              </View>
              <Text style={styles.articleSummary}>{item.summary}</Text>
              <View style={styles.readMoreContainer}>
                <Text style={styles.readMore}>Read More</Text>
                <Ionicons name="chevron-forward" size={16} color={theme.primary} />
              </View>
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    padding: 20,
    backgroundColor: theme.surface,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
  },
  languageSelector: {
    margin: 15,
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  languageButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.textSecondary,
  },
  selectedLanguageButton: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  languageFlag: {
    fontSize: 20,
    marginBottom: 5,
  },
  languageText: {
    fontSize: 12,
    color: theme.text,
  },
  selectedLanguageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCategoryCard: {
    backgroundColor: theme.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.text,
    marginLeft: 10,
    flex: 1,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  articleCard: {
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    flex: 1,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  articleMetaText: {
    fontSize: 12,
    color: theme.textSecondary,
    marginLeft: 4,
  },
  readTime: {
    fontSize: 14,
    color: theme.textSecondary,
    marginLeft: 4,
  },
  articleSummary: {
    fontSize: 14,
    color: theme.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  readMore: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: '500',
    marginRight: 5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backText: {
    fontSize: 16,
    color: theme.primary,
    marginLeft: 8,
  },
  articleContent: {
    padding: 20,
    backgroundColor: theme.surface,
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleText: {
    fontSize: 16,
    color: theme.text,
    lineHeight: 24,
    marginTop: 15,
  },
});