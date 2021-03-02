import { ReactNode, MouseEvent } from 'react';
import { LocationDescriptor } from 'history';

export interface ButtonProps {
    children: ReactNode,
    isPrimary?: boolean,
    isDisabled?: boolean,
    type?: 'text' | 'outlined' | 'contained' | 'icon',
    onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void,
    to?: LocationDescriptor
}