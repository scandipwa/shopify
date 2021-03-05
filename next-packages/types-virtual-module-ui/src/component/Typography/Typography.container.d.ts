import React from 'react';

export namespace VirtualModule {
    export namespace UI {
        export namespace Component {
            export namespace Typography {
                export interface TypographyProps {
                    children: React.ReactNode
                    component: React.ReactNode
                }

                export interface TypographyState {}

                export class TypographyContainer extends React.PureComponent<TypographyProps, TypographyState> {
                    static defaultProps: Record<string, unknown>

                    containerFunctions: Record<string, unknown>

                    containerProps: () => TypographyProps

                    getVariant: () => string
                }
            }
        }
    }
}

declare module '@virtual-module/ui/src/component/Typography' {
    export import TypographyProps = VirtualModule.UI.Component.Typography.TypographyProps;
    export import TypographyState = VirtualModule.UI.Component.Typography.TypographyState;
    import TypographyContainer = VirtualModule.UI.Component.Typography.TypographyContainer;

    export default TypographyContainer;
}

declare module '@virtual-module/ui/src/component/Typography/Typography.container' {
    export import TypographyProps = VirtualModule.UI.Component.Typography.TypographyProps;
    export import TypographyState = VirtualModule.UI.Component.Typography.TypographyState;
    export import TypographyContainer = VirtualModule.UI.Component.Typography.TypographyContainer;

    export default TypographyContainer;
}
