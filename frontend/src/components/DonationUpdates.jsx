import React from 'react';
import { useSubscription } from '@apollo/client';
import { DONATION_ADDED } from '../graphql/subscriptions';

const DonationUpdates = ({ campaignId }) => {
  const { data, loading, error } = useSubscription(DONATION_ADDED, {
    variables: { campaignId },
  });

  const { newDonation, totalRaised } = data?.donationAdded || {};

  return (data) ? (
    <div>
        <h3>Total: {totalRaised}</h3>
      <h3>New donation update:</h3>
      <div>Donation id: {newDonation.id}</div>
      <div>Amount: {newDonation.amount}</div>
    </div>
  ) : (
    <p>No new donations</p>
  );
};

export default DonationUpdates;