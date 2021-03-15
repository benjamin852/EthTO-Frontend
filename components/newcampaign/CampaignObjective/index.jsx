import React, { useState } from 'react';
import { Grid, FormControl, FormControlLabel, RadioGroup, Radio, Button } from '@material-ui/core';
import styles from './index.module.css';

const CampaignObjective = props => {
  const [selectedObjective, setSelectedObjective] = useState('');
  const [error, setError] = useState(false);

  const handleRadioChange = e => {
    setSelectedObjective(e.target.value);
    setError(false);
  };

  const handleSubmit = () => {
    props.objective(selectedObjective);
    props.setCampaignSetupStep(2);
  };

  const handleSelectPreviousStep = () => props.setCampaignSetupStep(0);

  return (
    <div>
      <p className={styles.CampaignObjective_custom_font}>
        <strong>Choose Campaign Objective</strong>
      </p>
      <p className={styles.CampaignObjective_custom_font_faq}>
        <strong>FAQ</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={4}>
            <p>
              <strong className={styles.CampaignObjective_custom_font_heading}>Awareness</strong>
            </p>
            <FormControl component="awareness-objective-root" error={error}>
              <RadioGroup
                aria-label="awareness-objective"
                name="awareness-objective-radio-group"
                value={selectedObjective}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="singlePost" control={<Radio />} label="Single Post" />
                <FormControlLabel value="postViews" control={<Radio />} label="Views" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <p>
              <strong className={styles.CampaignObjective_custom_font_heading}>Engagement</strong>
            </p>
            <FormControl component="engagement-objective-root" error={error}>
              <RadioGroup
                aria-label="engagement-objective"
                name="engagement-objective-radio-group"
                value={selectedObjective}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="profileGrowth" control={<Radio />} label="Profile Growth" />
                <FormControlLabel value="likes" control={<Radio />} label="Likes" />
                <FormControlLabel value="comments" control={<Radio />} label="Comments" />
                <FormControlLabel value="shares" control={<Radio />} label="Shares" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <p>
              <strong className={styles.CampaignObjective_custom_font_heading}>Conversion</strong>
            </p>
            <FormControl component="campaign-objective-root" error={error}>
              <RadioGroup
                aria-label="conversion-objective"
                name="conversion-objective-radio-group"
                value={selectedObjective}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="webVisits" control={<Radio />} label="Website Visits" />
                <FormControlLabel value="atc" control={<Radio />} label="Add To Carts" />
                <FormControlLabel value="sales" control={<Radio />} label="Sales" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={1} justify="flex-end">
          <Grid item xs={6}>
            <Button onClick={handleSelectPreviousStep} variant="outlined" color="primary" size="small">
              Previous
            </Button>
          </Grid>
          <Grid item xs={6} className={styles.CampaignObjective_align_right}>
            <Button type="submit" variant="contained" color="primary" size="small">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CampaignObjective;