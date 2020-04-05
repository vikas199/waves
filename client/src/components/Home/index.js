import React, { Component } from 'react';
import HomeSlider from './home_slider';
import PromotionSlider from './home_promotions'

class Home extends Component {
    render() {
        return (
            <div>
              <HomeSlider />
              <PromotionSlider />
            </div>
        );
    }
}

export default Home;