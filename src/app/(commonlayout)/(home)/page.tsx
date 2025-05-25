import Banner from '@/components/modules/home/Banner';
import CustomerNeed from '@/components/modules/home/CustomerNeed';
import Dynamic from '@/components/modules/home/Dynamic';
import Heading from '@/components/modules/home/Heading';
import Info from '@/components/modules/home/Info';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <Info></Info>
            <CustomerNeed></CustomerNeed>
            <Dynamic></Dynamic>
            <Heading></Heading>
            <Banner></Banner>
        </div>
    );
};

export default HomePage;