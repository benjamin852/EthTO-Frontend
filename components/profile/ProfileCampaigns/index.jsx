import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getUserFromEthAddress } from '../../../services/api/userService';
import { useStyles } from './styles';

//check isBusiness to know if populate cards with influencer or business data
const ProfileCampaigns = ({ campaign, isBusiness }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');

  getUserFromEthAddress(isBusiness ? campaign.influencer.id : campaign.business.id).then(({ data }) =>
    setUsername(data.payload.username),
  );

  return (
    <div className={classes.ProfileCampaigns_container}>
      <div>
        <Image
          className={classes.Profile_round_img}
          src="/TestInfluencer.jpeg"
          // src={isBusiness ? campaign.business.profileImageUrl : campaign.influencer.profileImageUrl}
          alt={username}
          width="95"
          height="95"
        />
      </div>
      <div>
        <br />
        <strong>@{username}</strong>
        <p>{campaign.ongoing ? 'Ongoing Campaign' : 'Campaign Completed'}</p>
      </div>
    </div>
  );
};

export default ProfileCampaigns;