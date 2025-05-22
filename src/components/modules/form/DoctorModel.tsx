import React from 'react';
import {useUpdateDoctorMutation} from "@/redux/features/doctor/doctorSlice";


const DoctorModel = () => {
 
    const [updateDoctor] = useUpdateDoctorMutation();

    return (
        <div>
            <h1>model</h1>
        </div>
    );
};

export default DoctorModel;