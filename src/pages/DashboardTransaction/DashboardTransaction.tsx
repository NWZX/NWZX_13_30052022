import React, { useState } from 'react';
import AppAccount from 'components/AppAccount/AppAccount';
import AppContainer from 'components/AppContainer/AppContainer';
import AppFooter from 'components/AppFooter/AppFooter';
import AppHeader from 'components/AppHeader/AppHeader';
import CustomCollapsable from 'components/CustomCollapsable/CustomCollapsable';
import './DashboardTransaction.css';
import { transactionFake } from 'data/fakeData';

interface Props {}

const DateFormat = (date: Date): string => {
    const pr = new Intl.PluralRules('en-US', {
        type: 'ordinal',
    });
    const suffixes = {
        zero: '',
        one: 'st',
        two: 'nd',
        few: 'rd',
        other: 'th',
        many: '',
    };
    const dayFormat = (number: number): string => `${number}${suffixes[pr.select(number)]}`;

    const monthList = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return `${monthList[date.getMonth()]} ${dayFormat(date.getDate())}, ${date.getFullYear()}`;
};

const EditButtonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg viewBox="0 0 512 512" width={16} height={16} {...props}>
            <path
                d={`M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z`}
            />
        </svg>
    );
};
const TransactionDetail: React.FC<{ transaction: typeof transactionFake[number] }> = ({ transaction }) => {
    const [isCategoryEdit, setIsCategoryEdit] = useState(false);
    const [isNoteEdit, setIsNoteEdit] = useState(false);

    return (
        <div style={{ textAlign: 'justify', paddingLeft: '2rem' }}>
            <p>Transaction Type: {transaction.type}</p>
            <p>
                Category:{' '}
                {isCategoryEdit ? (
                    <select value={'1'} onChange={() => setIsCategoryEdit(!isCategoryEdit)}>
                        <option value="">--Please choose an option--</option>
                        <option value="1">Food</option>
                        <option value="2">Transportation</option>
                        <option value="3">Entertainment</option>
                        <option value="4">Shopping</option>
                        <option value="5">Others</option>
                    </select>
                ) : (
                    <span>
                        {transaction.category} <EditButtonIcon onClick={() => setIsCategoryEdit(!isCategoryEdit)} />
                    </span>
                )}
            </p>

            <p>
                Notes:{' '}
                {isNoteEdit ? (
                    <input
                        type="text"
                        onKeyDown={(e) => {
                            e.key == 'Enter' && setIsNoteEdit(!isNoteEdit);
                        }}
                    />
                ) : (
                    <span>
                        {transaction.notes} <EditButtonIcon onClick={() => setIsNoteEdit(!isNoteEdit)} />
                    </span>
                )}
            </p>
        </div>
    );
};

const DashboardTransaction: React.FC<Props> = () => {
    return (
        <div id="dashboard-transaction">
            <AppHeader title="Argent Bank" logoSrc="/img/argentBankLogo.png" logoAlt="Argent Bank Logo" logoHref="/" />

            <AppContainer dark>
                <AppAccount.List>
                    <AppAccount.Item title="Checking" amount={1082.5} fullWidth textAlign="center" />
                </AppAccount.List>
                <CustomCollapsable.Container style={{ width: '80%', margin: 'auto' }}>
                    <CustomCollapsable.Item style={{ color: 'white' }}>
                        <div style={{ display: 'flex', paddingInline: '1rem' }}>
                            <div style={{ width: '32px', height: '32px' }}></div>
                            <div
                                style={{
                                    display: 'grid',
                                    width: '100%',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                }}
                            >
                                <div>Date</div>
                                <div>Description</div>
                                <div>Amount</div>
                                <div>Balance</div>
                            </div>
                        </div>
                    </CustomCollapsable.Item>
                    {transactionFake.map((item) => (
                        <CustomCollapsable.Item key={item.id}>
                            <CustomCollapsable.Button>
                                <span
                                    style={{
                                        display: 'grid',
                                        width: '100%',
                                        gridTemplateColumns: 'repeat(4, 1fr)',
                                    }}
                                >
                                    <span>{DateFormat(new Date(item.date))}</span>
                                    <span>{item.description}</span>
                                    <span>${item.amount / 100}</span>
                                    <span>${item.balance / 100}</span>
                                </span>
                            </CustomCollapsable.Button>
                            <CustomCollapsable.Panel>
                                <TransactionDetail transaction={item} />
                            </CustomCollapsable.Panel>
                        </CustomCollapsable.Item>
                    ))}
                </CustomCollapsable.Container>
            </AppContainer>
            <AppFooter />
        </div>
    );
};

export default DashboardTransaction;
