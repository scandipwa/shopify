import MaterialAccordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AccordionProps } from '@scandipwa/ui-api';
import { PureComponent } from 'react';

/** @namespace Materialui/Component/Accordion/Component/AccordionComponent */
export class AccordionComponent extends PureComponent<AccordionProps> {
    renderDetails() {
        const { details } = this.props;

        return (
            <AccordionDetails>
                { details }
            </AccordionDetails>
        );
    }

    renderSummary() {
        const { summary } = this.props;

        return (
            <AccordionSummary
              expandIcon={ <ExpandMoreIcon /> }
            >
                { summary }
            </AccordionSummary>
        );
    }

    render() {
        return (
            <MaterialAccordion className="Accordion">
                { this.renderSummary() }
                { this.renderDetails() }
            </MaterialAccordion>
        );
    }
}

export default Accordion;
