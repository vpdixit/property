import React, { Component, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/routes';

class App extends Component {
    render() {
        return (<SafeAreaProvider> 
            <Navigator/> 
            </SafeAreaProvider>
            );
        }
    }
    export default App;