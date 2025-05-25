import Banner from '@/components/modules/home/Banner';
import CustomerHelp from '@/components/modules/home/CustomerHelp';
import CustomerNeed from '@/components/modules/home/CustomerNeed';
import Dynamic from '@/components/modules/home/Dynamic';
import Heading from '@/components/modules/home/Heading';
import Info from '@/components/modules/home/Info';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <Info></Info>
            <Heading></Heading>
            <CustomerHelp></CustomerHelp>
            <CustomerNeed></CustomerNeed>
            <Dynamic></Dynamic>
        </div>
    );
};

export default HomePage;