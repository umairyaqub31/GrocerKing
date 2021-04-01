import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SECTIONS = [
  {
    title: 'How many orders can I place in a month?',
    content:
      'Because we value our customers so much, we are giving you unlimited orders throghout the month without any delivery charges.*',
  },
  {
    title: 'Can I use the same membership account for different locations?',
    content:
      'Place your orders at your convience and without the worry of a specific address. Just make sure you update the location prior to placing the order.',
  },
];

class FAQsView extends Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.content}>
        <Text style={{margin: wp('3%')}}>{section.content}</Text>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        // renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}

export default FAQsView;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    height: hp('7%'),
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    // marginLeft: wp('3%'),
  },
  content: {backgroundColor: '#ffffff', height: hp('7%')},
  headerText: {marginLeft: wp('4%')},
});
