import React, { Children, createContext, useContext, useEffect, useReducer } from 'react';
import './CustomCollapsable.scss';

interface ICustomCollapsable {
    selectedCollapsable: Array<number>;
}

const initialState: ICustomCollapsable = {
    selectedCollapsable: [],
};

type TActionType = 'open' | 'close';
interface IReducerAction {
    type: TActionType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: Record<string, any>;
}

function reducer(state: ICustomCollapsable, action: IReducerAction): ICustomCollapsable {
    if (!action.payload?.key) {
        throw new Error('key is requiredss');
    }
    switch (action.type) {
        case 'open': {
            return {
                ...state,
                selectedCollapsable: [...state.selectedCollapsable, action.payload.key],
            };
        }
        case 'close': {
            return {
                ...state,
                selectedCollapsable: state.selectedCollapsable.filter((k) => k !== action.payload?.key),
            };
        }
        default: {
            throw new Error();
        }
    }
}

const CustomCollapsableContext = createContext<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [ICustomCollapsable, (type: TActionType, payload?: Record<string, any>) => void]
>([
    initialState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
]);

interface ICustomCollapsableProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CustomCollapsable = ({ children, ...props }: ICustomCollapsableProps): JSX.Element => {
    const [data, dispatchData] = useReducer(reducer, initialState);
    const child = Children.toArray(children) as JSX.Element[];
    return (
        <CustomCollapsableContext.Provider value={[data, (t, p) => dispatchData({ type: t, payload: p })]}>
            <div {...props} className={props.className ? 'collapsable ' + props.className : 'collapsable'}>
                {child.map((c, i) => {
                    return React.cloneElement(c, { ...c.props, collapseId: i + 1 });
                })}
            </div>
        </CustomCollapsableContext.Provider>
    );
};

type TCustomCollapsableContext = {
    openCollapsable: (key: number) => void;
    closeCollapsable: (key: number) => void;
    selectedCollapsable: ICustomCollapsable['selectedCollapsable'];
};
const useCustomCollapsableContext = (): TCustomCollapsableContext => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [context, dispatch] = useContext(CustomCollapsableContext);

    const openCollapsable = (key: number): void => {
        if (!context.selectedCollapsable.includes(key)) {
            dispatch('open', { key });
        }
    };
    const closeCollapsable = (key: number): void => {
        if (context.selectedCollapsable.includes(key)) {
            dispatch('close', { key });
        }
    };

    return { openCollapsable, closeCollapsable, selectedCollapsable: context.selectedCollapsable };
};

interface ICustomCollapsableItemProps extends React.HTMLAttributes<HTMLDivElement> {
    collapseId?: number;
    open?: boolean;
}
export const CustomCollapsableItemContext = React.createContext({ state: false, key: 0 });
export const CustomCollapsableItem = ({
    children,
    collapseId,
    open,
    ...props
}: ICustomCollapsableItemProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { selectedCollapsable, openCollapsable } = useCustomCollapsableContext();
    useEffect(() => {
        if (collapseId && open) {
            openCollapsable(collapseId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CustomCollapsableItemContext.Provider
            value={{ state: selectedCollapsable.includes(collapseId || 0), key: collapseId || 0 }}
        >
            <div {...props} className={props.className ? 'collapsable_item ' + props.className : 'collapsable_item'}>
                {children}
            </div>
        </CustomCollapsableItemContext.Provider>
    );
};
const useCustomCollapsableItemContext = (): { state: boolean; key: number } => {
    return useContext(CustomCollapsableItemContext);
};

interface ICustomCollapsableButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    id?: string;
}
export const CustomCollapsableButton = ({ children, ...props }: ICustomCollapsableButtonProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { openCollapsable, closeCollapsable, selectedCollapsable } = useCustomCollapsableContext();
    const { state, key } = useCustomCollapsableItemContext();
    return (
        <button
            {...props}
            className={props.className ? 'collapsable_button ' + props.className : 'collapsable_button'}
            onClick={() => {
                state ? closeCollapsable(key) : openCollapsable(key);
            }}
        >
            <svg
                viewBox="0 0 24 24"
                focusable="false"
                className="collapsable_button_icon"
                style={{ transform: state ? 'rotate(180deg)' : undefined }}
                aria-hidden="true"
            >
                <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
            </svg>
            {children}
        </button>
    );
};

interface ICustomCollapsablePanelProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CustomCollapsablePanel = ({ children, ...props }: ICustomCollapsablePanelProps): JSX.Element => {
    const { state } = useCustomCollapsableItemContext();

    return (
        <div
            {...props}
            className={props.className ? 'collapsable_panel ' + props.className : 'collapsable_panel'}
            style={{
                ...props.style,
                height: state ? 'unset' : undefined,
                opacity: state ? 1 : undefined,
                padding: state ? undefined : '0',
            }}
        >
            <div className="collapsable_panel_centent">{children}</div>
        </div>
    );
};

export default {
    Container: CustomCollapsable,
    Item: CustomCollapsableItem,
    Button: CustomCollapsableButton,
    Panel: CustomCollapsablePanel,
};
