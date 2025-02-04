import React from 'react';
import { Box, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const SocialMediaIcons = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} >
            <IconButton aria-label="Instagram" href="https://instagram.com" target="_blank">
                <InstagramIcon className='text-homePrimary' />
            </IconButton>
            <IconButton aria-label="Twitter" href="https://twitter.com" target="_blank">
                <TwitterIcon className='text-homePrimary' />
            </IconButton>
            <IconButton aria-label="Facebook" href="https://facebook.com" target="_blank">
                <FacebookIcon className='text-homePrimary' />
            </IconButton>
            <IconButton aria-label="YouTube" href="https://youtube.com" target="_blank">
                <YouTubeIcon className='text-homePrimary' />
            </IconButton>
        </Box>
    );
};

export default SocialMediaIcons;
