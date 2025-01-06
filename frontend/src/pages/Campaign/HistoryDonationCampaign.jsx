import React from 'react';
import { Timeline, Avatar, Card } from 'antd';
import dayjs from 'dayjs';
import { useQuery } from '@apollo/client';
import { GET_DONATION_BY_CAMPAIGN_ID } from '~/graphql/mutations';
import { formatAmount, getFirstCharacter } from '~/utils/helper';

const DonationTimeline = ({ campaignId }) => {
    const { data } = useQuery(GET_DONATION_BY_CAMPAIGN_ID, {
        variables: { campaignId },
    });

    const donations = data?.getDonationsByCampaignId || [];
    const sortedDonations = donations.toSorted((a, b) => b.createdAt - a.createdAt).slice(0, 10);


    return (
        <div className='m-2'>
            <h1>Latest contributions</h1>
            <Card>
                {sortedDonations.length > 0 ? (
                    <Timeline>
                        {sortedDonations.map(({ user, amount, createdAt }, index) => (
                            <Timeline.Item key={index}>
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <Avatar 
                                        src={user.avatarUrl} 
                                        alt={user.username} 
                                        style={{ marginRight: 10 }}
                                    >
                                        {getFirstCharacter(user.username)}
                                    </Avatar>
                                    <div>
                                        <div>
                                        <strong>{user.username}</strong> contributed {formatAmount(amount)} VND
                                        </div>
                                        <p>Time: {dayjs(Number(createdAt)).format('DD/MM/YYYY HH:mm:ss')}</p>
                                    </div>
                                </div>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                ) : (
                    <div>Have not donated yet, be the first to donate now</div>
                )}
            </Card>
        </div>
    );
};

export default DonationTimeline;
