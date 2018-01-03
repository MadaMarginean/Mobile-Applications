import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    processColor,
} from 'react-native';
// import {PieChart} from "react-native-charts-wrapper";
import {VictoryContainer, VictoryPie} from 'victory-native';
//http://formidable.com/open-source/victory/docs/victory-pie/

export default class RequestsPopularityPieChart extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <View>
                <VictoryPie colorScale={["tomato", "orange", "gold", "cyan", "navy", "cool"]}
                            data={[
                                { x: "Samsung Galaxy S5", y: 35 },
                                { x: "Samsung Galaxy S7", y: 40 },
                                { x: "Samsung Galaxy S6", y: 55 }
                            ]}
                            containerComponent={<VictoryContainer responsive={true}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chart: {
        flex: 1
    }
});
