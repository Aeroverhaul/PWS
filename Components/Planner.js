import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content} from 'native-base';

export default class Planner extends React.Component {
  render() {
    return (
        <Container>
            <Content>
                <Swiper loop={false} showsPagination={false} index={0}>
                    <View style={styles.slide}>
                         <Text>Planner</Text>
                    </View>
                </Swiper>
            </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});