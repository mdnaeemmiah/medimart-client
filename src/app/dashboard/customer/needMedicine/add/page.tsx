import { useGetAllNeedMedicinesQuery,useDeleteNeedMedicineMutation,useUpdateNeedMedicineMutation } from '@/redux/features/needMedicine/needMedicineSlice';
import React from 'react';

const page = () => {
    const {} =useGetAllNeedMedicinesQuery()
    return (
        <div>
            <h2>add page</h2>
        </div>
    );
};

export default page;