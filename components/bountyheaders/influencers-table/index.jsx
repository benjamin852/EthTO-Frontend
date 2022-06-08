//Username Email Followers Top Platform Completed

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { getUserFromEthAddressDb } from '../../../services/api/userService';

const InfluencersTable = ({ influencers }) => {
  const [influencersAll, setInfluencersAll] = useState([]);

  useEffect(() => {
    async function getInfluencersDb() {
      influencers.map(async influencer => {
        const influencerRes = await getUserFromEthAddressDb(influencer?.id);

        const influencerMappedData = {
          id: influencer?.id,
          username: influencerRes?.data?.payload?.username,
          email: influencerRes?.data?.payload?.email,
          followers: 'influencerRes?.data?.payload?.followers',
          topPlatform: 'n/a',
          completed: influencer?.bountiesCompleted,
        };
        setInfluencersAll(oldArray => [influencerMappedData, ...oldArray]);
      });
    }
    getInfluencersDb();
    return () => console.log('cleanup influencer table');
  }, []);

  return (
    <TableContainer style={{ maxHeight: 250 }} component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Followers</TableCell>
            <TableCell align="left">Top Platform</TableCell>
            <TableCell align="left">Campaigns Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {influencersAll.map(influencer => {
            return (
              <TableRow key={influencer.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Link href={`/profile/${influencer?.id}`}>
                    <a>{influencer?.username}</a>
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <Link href={`/profile/${influencer?.id}`}>
                    <a>{influencer?.email}</a>
                  </Link>
                </TableCell>
                <TableCell align="left">7898</TableCell>
                <TableCell align="left">Twitter</TableCell>
                <TableCell align="left">7</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InfluencersTable;