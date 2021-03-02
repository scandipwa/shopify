import { ReactNode } from 'react';
import { LocationDescriptor, LocationState } from 'history';

export interface LinkProps {
    children: ReactNode,
    isPrimary: boolean,
    to: LocationDescriptor<LocationState>
}