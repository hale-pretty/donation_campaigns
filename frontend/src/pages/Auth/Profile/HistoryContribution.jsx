import React from 'react';
import { Table, Badge, Card } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_CAMPAIGNS } from '~/graphql/mutations';
import { formatAmount } from '~/utils/helper';

const DonationHistory = ({ donations = [] }) => {
   const { loading, error, data } = useQuery(GET_CAMPAIGNS);
  console.log(data?.campaigns)
  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  

  const columns = [
    {
      title: 'Campaign',
      dataIndex: 'campaignId',
      key: 'campaignId',
      render: (r) => {
        const campaign = data?.campaigns.find(c => c?.id == r);
    
        return campaign ? (
          <Badge variant="outline" className="font-normal">
            {campaign.title} 
          </Badge>
        ) : (
          'Campaign not found' 
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => (
        <div className="flex items-center gap-2 text-green-600 font-semibold">
          {formatAmount(text)}
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => (
        <div className="flex items-center gap-2 text-gray-500">
          {formatDate(text)}
        </div>
      ),
    },
  ];

  const dataSource = donations.map((donation) => ({
    key: donation.id,
    id: donation.id,
    campaignId: donation.campaignId,
    amount: donation.amount,
    createdAt: donation.createdAt,
  }));

  return (
    <>
      <h4 className='mb-3'></h4>
      <div className="relative overflow-x-auto">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={true}
          locale={{
            emptyText: 'No donation history available',
          }}
          footer={() => (
            <div>Total: {donations.length} Donations</div>
          )}
        />
      </div>
    </>
  );
};

export default DonationHistory;