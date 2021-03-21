import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/objectiveNames';
import { useStyles } from './styles.js';

const CampaignReward = ({ objective, objectiveAmount, setCampaignSetupStep }) => {
  const classes = useStyles();
  const [jackpot, setJackpot] = useState(false);
  useEffect(() => {
    setJackpot(objective === 'jackpot' ? true : false);
  }, []);

  const getHeading = () => (jackpot ? 'Jackpot' : 'Incremental');

  const handleDeposit = deposit => console.log(deposit);

  return (
    <div className={classes.font}>
      <h1>{setObjectiveName(objective)} Objective</h1>
      <p className={classes.p_heading}>5. {getHeading()} Payment</p>
      <FormHelperText>
        Enter the conditions for influencer to earn an incremental payment as well as the reward for completing the
        objective
      </FormHelperText>
      <div className={classes.align_inputs}>
        <div>
          {objective === 'jackpot' ? (
            <p>{objective.charAt(0).toUpperCase() + objective.slice(1)} Jackpot Objective:</p>
          ) : (
            <p>{objective.charAt(0).toUpperCase() + objective.slice(1)} Incremental Objective:</p>
          )}

          <NumberFormat className={classes.input} thousandSeparator={true} />
        </div>
        <div>
          {jackpot ? <p>Jackpot Payment:</p> : <p>Incremental Payment: </p>}
          <NumberFormat className={classes.input} thousandSeparator={true} prefix={'$'} />
        </div>
      </div>
      <br />
      <div className={classes.CampaignReward_button_alignment}>
        <Button variant="outlined" color="primary" size="small" onClick={() => setCampaignSetupStep(4)}>
          Previous
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={handleDeposit}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CampaignReward;
