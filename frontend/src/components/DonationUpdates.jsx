import React, { useState } from 'react';
import { useSubscription } from '@apollo/client';
import { DONATION_ADDED } from '../graphql/subscriptions';
import { useDispatch } from 'react-redux';
import { addDonation } from '~/redux/reducers/donationSlice';
import Marquee from 'react-fast-marquee';
import { formatAmount } from '~/utils/helper';

const DonationUpdates = ({ campaignId }) => {
    const dispatch = useDispatch();
    const [play, setPlay] = useState(true);
    const [runCount, setRunCount] = useState(0);

    const { data, loading, error } = useSubscription(DONATION_ADDED, {
        variables: { campaignId },
        onSubscriptionData: ({ subscriptionData }) => {
            if (subscriptionData.data) {
                dispatch(addDonation(subscriptionData.data.donationAdded.newDonation));
                setPlay(true);  
                setRunCount(0);
            }
        },
    });

    const { newDonation, totalRaised } = data?.donationAdded || {};

    const handleCycleComplete = () => {
        setRunCount((prev) => prev + 1);
        if (runCount >= 2) {  
            setPlay(false);
        }
    };

    return data && (
        <div className='marquee_donation'>
            {play && <Marquee
                gradient={false}
                play={play}
                onCycleComplete={handleCycleComplete}
                speed={120}
            >
                💰 New donation update : {formatAmount(newDonation.amount)} VND 🤑
            </Marquee>}
        </div>
    ) 
};

export default DonationUpdates;
