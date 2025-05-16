import Banner from '@/components/modules/home/Banner';
import Heading from '@/components/modules/home/Heading';
import Info from '@/components/modules/home/Info';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <Info></Info>
            <Heading></Heading>
            <Banner></Banner>
        </div>
    );
};

export default HomePage;