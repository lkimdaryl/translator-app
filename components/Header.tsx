import { StyleSheet, Text, View} from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>App Translator</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        margin: 20,
        paddingTop: 20,
        // backgroundColor: 'blue',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Header