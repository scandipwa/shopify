import MaterialAccordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AccordionProps, AccordionState } from '@virtual-module/ui/src/component/Accordion/Accordion.component';
import { PureComponent } from 'react';

/** @namespace Materialui/Component/Accordion/Component/AccordionComponent */
export class AccordionComponent extends PureComponent<AccordionProps, AccordionState> {
    renderDetails(): JSX.Element {
        const { details } = this.props;

        return (
            <AccordionDetails>
                { details }
            </AccordionDetails>
        );
    }

    renderSummary(): JSX.Element {
        const { summary } = this.props;

        return (
            <AccordionSummary
              expandIcon={ <ExpandMoreIcon /> }
            >
                { summary }
            </AccordionSummary>
        );
    }

    render(): JSX.Element {
        return (
            <MaterialAccordion className="Accordion">
                { this.renderSummary() }
                { this.renderDetails() }
            </MaterialAccordion>
        );
    }
}

export default AccordionComponent;
