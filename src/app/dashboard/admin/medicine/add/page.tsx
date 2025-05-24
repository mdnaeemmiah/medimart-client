import { useDeleteMedicineMutation,useGetMedicinesQuery,useUpdateMedicineMutation } from '@/redux/features/medicine/medicineSlice';
import React from 'react';

const page = () => {
   const {} = useDeleteMedicineMutation()

    return (
        <div>
            <h1>add medicine</h1>
        </div>
    );
};

export default page;