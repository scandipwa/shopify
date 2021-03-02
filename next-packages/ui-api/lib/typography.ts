import { ReactNode, ElementType } from 'react';

export interface TypographyProps {
    children: ReactNode,
    component?: ElementType,
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body'
}