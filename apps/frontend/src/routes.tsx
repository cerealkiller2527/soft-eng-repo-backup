import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ServiceRequest from './routes/serviceRequest.tsx';
import FloorPlan from './routes/floorPlan.tsx';
import Directory from './routes/directory.tsx';
import Login from './routes/login.tsx';
import BackupChildCareCenter from './routes/directoryPages/backupChildCareCenter.tsx';
import CenterofPainMedicine from './routes/directoryPages/centerOfPainMedicine.tsx';
import CrohnsAndColitisCenter from './routes/directoryPages/crohnsAndColitisCenter.tsx';
import EndoscopyCenter from './routes/directoryPages/endoscopyCenter.tsx';
import GretchensAndEdwardA from './routes/directoryPages/gretchensAndEdwardA.tsx';
import OsherClinicalCenter from './routes/directoryPages/osherClinicalCenter.tsx';
import AllergyAndClinicalImmunology from './routes/directoryPages/allergyAndClinicalImmunology.tsx';
import Laboratory from './routes/directoryPages/laboratory.tsx';
import MultispecialityClinic from './routes/directoryPages/multispecialityClinic.tsx';
import PatientFinancialServices from './routes/directoryPages/patientFinancialServices.tsx';
import Pharmacy from './routes/directoryPages/pharmacy.tsx';
import Radiology from './routes/directoryPages/radiology.tsx';
import MRI from './routes/directoryPages/mri.tsx';
import Rehabilitation from './routes/directoryPages/rehabilitation.tsx';
import BrighamDermatologyAssociates from './routes/directoryPages/brighamDermatologyAssociates.tsx';
import BrighamObstetrics from './routes/directoryPages/brighamObstetrics.tsx';
import BrighamPhysiciansGroup from './routes/directoryPages/brighamPhysiciansGroup.tsx';
import BrighamPsychiatricSpecialities from './routes/directoryPages/brighamPsychiatricSpecialities.tsx';
import RequestDashboard from './routes/requestDashboard.tsx';
import CSVPage from './routes/csv.tsx';

export const routes = [
    {
        path: '/ServiceRequest',
        errorElement: <div />,
        element: <ServiceRequest />,
    },
    {
        path: '/FloorPlan',
        errorElement: <div />,
        element: <FloorPlan />,
    },
    {
        path: '/Directory',
        errorElement: <div />,
        element: <Directory />,
    },
    {
        path: '/',
        errorElement: <div />,
        element: <Login />,
    },
    {
        path: '/bccc',
        errorElement: <div />,
        element: <BackupChildCareCenter />,
    },
    {
        path: '/copm',
        errorElement: <div />,
        element: <CenterofPainMedicine />,
    },
    {
        path: '/cacc',
        errorElement: <div />,
        element: <CrohnsAndColitisCenter />,
    },
    {
        path: '/ec',
        errorElement: <div />,
        element: <EndoscopyCenter />,
    },
    {
        path: '/gsea',
        errorElement: <div />,
        element: <GretchensAndEdwardA />,
    },
    {
        path: '/occ',
        errorElement: <div />,
        element: <OsherClinicalCenter />,
    },
    {
        path: '/aci',
        errorElement: <div />,
        element: <AllergyAndClinicalImmunology />,
    },
    {
        path: '/Laboratory',
        errorElement: <div />,
        element: <Laboratory />,
    },
    {
        path: '/Multi-Speciality',
        errorElement: <div />,
        element: <MultispecialityClinic />,
    },
    {
        path: '/pfs',
        errorElement: <div />,
        element: <PatientFinancialServices />,
    },
    {
        path: '/pharmacy',
        errorElement: <div />,
        element: <Pharmacy />,
    },
    {
        path: '/radiology',
        errorElement: <div />,
        element: <Radiology />,
    },
    {
        path: '/MRI',
        errorElement: <div />,
        element: <MRI />,
    },
    {
        path: '/rehab',
        errorElement: <div />,
        element: <Rehabilitation />,
    },
    {
        path: '/bda',
        errorElement: <div />,
        element: <BrighamDermatologyAssociates />,
    },
    {
        path: '/bogg',
        errorElement: <div />,
        element: <BrighamObstetrics />,
    },
    {
        path: '/bpg',
        errorElement: <div />,
        element: <BrighamPhysiciansGroup />,
    },
    {
        path: '/bps',
        errorElement: <div />,
        element: <BrighamPsychiatricSpecialities />,
    },
    {
        path: '/requestdashboard',
        errorElement: <div />,
        element: <RequestDashboard />,
    },
    {
        path: '/csv',
        errorElement: <div />,
        element: <CSVPage />,
    },
];

export const router = createBrowserRouter(routes);
