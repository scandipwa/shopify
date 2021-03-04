import React from 'react'

declare namespace VirtualModule.UI.Component.Accordion {
    export interface AccordionProps {
        summary: React.ReactNode;
        details: React.ReactNode;
    }

    export interface AccordionState {}

    export class AccordionComponent extends React.PureComponent<
        AccordionProps,
        AccordionState
    > {}
}

export import AccordionProps = VirtualModule.UI.Component.Accordion.AccordionProps
export import AccordionState = VirtualModule.UI.Component.Accordion.AccordionState
export import AccordionComponent = VirtualModule.UI.Component.Accordion.AccordionComponent;
export default AccordionComponent;
