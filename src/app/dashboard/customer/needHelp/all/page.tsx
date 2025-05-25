import { useGetHelpRequestsQuery,useDeleteHelpRequestMutation,useUpdateHelpRequestMutation } from '@/redux/features/needHelp/needHelpSlice';
import React from 'react';

const page = () => {
    const {} =useGetHelpRequestsQuery()
    return (
        <div>
            <h2>all help</h2>
        </div>
    );
};

export default page;