import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import consola from 'consola';
import { Button } from '@material-ui/core';
import 'react-calendar/dist/Calendar.css';
import { getBountyDb } from '../../services/api/bountyService';
import { getUserFromEthAddressDb } from '../../services/api/userService';
import { createNewBountyOnContract } from '../../web3';
import { useStyles } from './styles';

const BusinessReviewHeader = dynamic(() => import('../../components/bountyheaders/BusinessHeader'), {
  loading: () => <p>Business Header Loading...</p>,
});

const ReviewBounty = () => {
  const classes = useStyles();
  const router = useRouter();

  const famepayFactory = useSelector(state => state.famepayFactory);
  const account = useSelector(state => state.account);

  const [campaign, setCampaign] = useState(null);
  const [business, setBusiness] = useState('');

  const { id } = router.query;

  useEffect(() => {
    async function getBountyInfo() {
      const campaign = await getBountyDb(id);
      if (Object.entries(campaign?.data?.payload).length === 0) return <Error statusCode={404} />;

      console.log(campaign, 'the campaign');

      const businessUser = await getUserFromEthAddressDb(campaign?.data?.mongoResponse?.business);

      console.log(businessUser, 'the business');

      setCampaign(campaign?.data?.mongoResponse);
      // setBusiness(businessUser?.data?.payload);
      // setInfluencer(influencerUser?.data?.payload);
    }
    getBountyInfo();
    return () => consola.success('Cleanup ongoing bounty component');
  }, [id]);

  const handleBountyCreation = async confirmed => {
    if (confirmed) {
      await createNewBountyOnContract(
        famepayFactory,
        account,
        campaignDuration[0] ? campaignDuration[0] : simplePostDateStart, //agreedStartDate
        campaignDuration[1] ? campaignDuration[1] : simplePostDateEnd, //agreedDeadline/postDate,
        simplePostMinimumDuration,
        jackpotRewardAmount,
        jackpotTargetAmount,
        bountyMaxWinners,
        objective,
        bountyType,
        stakedAmount,
      );
    }
    router.push(`/reviewcampaign/${campaignDb.data.payload.data._id}`);
  };

  return (
    <div className={classes.ReviewBounty_root_center}>
      <div className={classes.ReviewBounty_headers_side_by_side}>
        <div className={classes.ReviewBounty_business_header}>
          <BusinessReviewHeader
            potentialPayout={campaign?.potentialPayout}
            objective={campaign?.objective}
            username={business?.username}
            website={business?.website}
            ethAddress={business?.userEthAddress}
          />
        </div>
      </div>
      <br />
      <br />
      <Calendar
        // onChange={handleDateChange}
        // minDate={new Date()}
        // selectRange={objective != 'simplePost' ? true : false}
        // value={simpleDate}
        className={classes.ReviewBounty_calendar_size}
      />
      <br />
      <br />
      <div>
        <>
          <Button
            className={classes.ReviewBounty_reject}
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => handleBountyCreation(false)}
          >
            Cancel
          </Button>

          <Button
            className={classes.ReviewBounty_accept}
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => handleBountyCreation(true)}
          >
            Create
          </Button>
        </>
      </div>
    </div>
  );
};

export default ReviewBounty;
