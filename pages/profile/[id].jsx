import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Button, GridList, GridListTile } from '@material-ui/core';
import {
  GET_ALL_CAMPAIGNS_FOR_BUSINESS_QUERY,
  GET_ALL_CAMPAIGNS_FOR_INFLUENCER_QUERY,
  GET_ALL_BOUNTIES_FOR_INFLUENCER,
  GET_ALL_BOUNTIES_FOR_BUSINESS,
} from '../../apollo/user.gql';
import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
import { useStyles } from './styles';

const ProfileHeader = dynamic(() => import('../../components/profile/ProfileHeader'), {
  loading: () => <p>Profile Header Loading....</p>,
});
const ProfileCampaigns = dynamic(() => import('../../components/profile/ProfileCampaigns'), {
  loading: () => <p>Profile Campaigns Loading....</p>,
});

const Profile = () => {
  const router = useRouter();

  const { id } = router.query;

  const mountedRef = useRef(true);

  const [user, setUser] = useState({});
  const [profileIsBusiness, setProfileIsBusiness] = useState(false);

  const classes = useStyles();

  let deals;

  useEffect(() => {
    async function getUsernameEthAddress() {
      if (!router.isReady) return;
      setUser(id);
    }
    getUsernameEthAddress();
    return () => (mountedRef.current = false);
  }, [router.isReady]);

  //DEAL QUERIES

  const {
    error: errorInfluencer,
    data: dataInfluencer,
    refetch: refetchInfluencer,
  } = useQuery(GET_ALL_CAMPAIGNS_FOR_INFLUENCER_QUERY, {
    variables: { id: user?.userEthAddress },
  });
  // if (errorInfluencer) refetchInfluencer();
  // if (errorInfluencer) console.log('error2!!!');

  const {
    error: errorBusiness,
    data: dataBusiness,
    refetch: refetchBusiness,
  } = useQuery(GET_ALL_CAMPAIGNS_FOR_BUSINESS_QUERY, {
    variables: { id: user?.userEthAddress },
  });

  if (dataInfluencer?.campaigns?.length != 0) deals = dataInfluencer?.campaigns;
  if (dataBusiness?.campaigns?.length != 0) deals = dataBusiness?.campaigns;

  return (
    <>
      <div className={classes.Profile_header_container}>
        <img
          className={classes.Profile_cover_photo}
          src="https://mir-s3-cdn-cf.behance.net/projects/max_808/f7189086626231.Y3JvcCwxMDgwLDg0NCwwLDExNw.png"
        />
        <br />
        <br />
        <div className={classes.Profie_cover_flex}>
          <Image
            className={classes.Profile_round_img}
            src="/TestBusiness.png"
            alt="Change Me"
            width="195"
            height="195"
          />
          <ProfileHeader user={user} />
        </div>
      </div>

      <div className={classes.Profile_content_container}>
        {deals?.length == 0 ? (
          <h1>No Funds</h1>
        ) : (
          <GridList cellHeight={100} className={classes.Profile_gridList} cols={3}>
            {deals?.map((fund, index) => {
              return (
                <GridListTile cols={1} key={index} component={Link} href={`/ongoingfund/${fund?.id}`}>
                  <ProfileCampaigns campaign={fund} influencerData={user?.username} isBusiness={profileIsBusiness} />
                </GridListTile>
              );
            })}
          </GridList>
        )}
      </div>
    </>
  );
};

export default Profile;
