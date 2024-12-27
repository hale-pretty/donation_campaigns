import { useState, useEffect } from 'react';
import { HeartOutlined, UpOutlined } from '@ant-design/icons';
import './styles.scss';
import { perks } from '~/components/dummy';
import { Input } from 'antd';

const CrowdfundingPerks = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updatePerks = [...perks, {
    id: 99992,
    isContribution: true,
    title: "Make a contribution",
    description: "Contributions are not associated with perks",
    defaultContribution: 10,
  },]

   return (
    <div className="container pb-4">
      <h2 className="mb-4">Choose your Perk</h2>

      <div className="row g-4 mb-5">
        {updatePerks.map((perk) => (
          <div className="col-md-6" key={perk.id}>
            {perk.isContribution ? (
              <div className="contribution-card">
                <div className="text-center mb-4">
                  <div className="contribution-icon">
                    <HeartOutlined />
                  </div>
                  <h3>{perk.title}</h3>
                  <p className="text-muted">{perk.description}</p>
                </div>

                <div className="input-group mb-4">
                  <span className="input-group-text">$</span>
                  <Input min={0} type='number' />
                  <span className="input-group-text">USD</span>
                </div>

                <button className="btn btn-outline-primary w-100">CONTINUE</button>
              </div>
            ) : (
              <div className="perk-card">
                <span className="offer-badge">{perk.offer}</span>
                <div className="text-center mb-4">
                  <img src={perk.image} alt={perk.title} className="perk-image" />
                </div>
                <h3>{perk.title}</h3>
                <div className="price-container">
                  <span className="current-price">{perk.currentPrice}</span>
                  <span className="original-price">{perk.originalPrice}</span>
                </div>
                <div className="shipping-info">
                  <p className="mb-1">Est. Shipping</p>
                  <p className="text-muted">{perk.shipping.estimate}</p>
                </div>
                <div className="claimed-info mb-4">
                  <span>{perk.claimed.current} out of {perk.claimed.total}</span> of claimed
                </div>
                <button className="btn btn-primary w-100">GET THIS PERK</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showScrollTop && (
        <button 
          className="scroll-top-btn"
          onClick={scrollToTop}
        >
          <UpOutlined />
        </button>
      )}
    </div>
  );
};

export default CrowdfundingPerks;