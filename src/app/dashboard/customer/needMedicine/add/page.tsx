import { useCreateNeedMedicineMutation } from '@/redux/features/needMedicine/needMedicineSlice';
import React from 'react';

const page = () => {
    const {}=useCreateNeedMedicineMutation();
    return (
        <div>
            <h2>add page</h2>
        </div>
    );
};

export default page;