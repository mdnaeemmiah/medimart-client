import Banner from '@/components/modules/about/Banner';
import Company from '@/components/modules/about/Company';
import Question from '@/components/modules/about/Question';
import React from 'react';

const AboutPage = () => {
    return (
        <div className='my-5'>
            <Banner></Banner>
            <Question></Question>
            <Company></Company>
        </div>
    );
};

export default AboutPage;