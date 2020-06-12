import React, { Component } from 'react';

import TopHeader from "./header_top";
import BottomHeader from "./header_bottom";

class NavigationBar extends Component {
    render() {
        return (
            <header>
                <TopHeader />
                <BottomHeader />
            </header>
        );
    }
}

export default NavigationBar;
