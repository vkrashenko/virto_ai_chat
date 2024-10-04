import { memo } from 'react';
import { useRecoilValue } from 'recoil';

import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useAudio } from '@chainlit/react-client';

import UserButton from 'components/atoms/buttons/userButton';
import { Logo } from 'components/atoms/logo';
import ChatProfiles from 'components/molecules/chatProfiles';
import NewChatButton from 'components/molecules/newChatButton';

import { settingsState } from 'state/settings';

import AudioPresence from './chat/inputBox/AudioPresence';
import { OpenSideBarMobileButton } from './sidebar/OpenSideBarMobileButton';
import Translator from 'components/i18n/Translator';

const Header = memo(() => {
  const headerTextLeft = (
    <Translator path="components.organisms.header.text-left" />
  );
  const headerTextRight = (
    <Translator path="components.organisms.header.text-right" />
  );
  const isMobile = useMediaQuery('(max-width:66rem)');

  const { audioConnection } = useAudio();
  const { displayAvatar, isChatHistoryOpen} = useRecoilValue(settingsState);

  return (
    <Box
      px={1}
      py={1}
      display="flex"
      height="45px"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      color="text.primary"
      gap={2}
      id="header"
      position="relative"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
          {audioConnection === 'on' ? (
          <AudioPresence
            type="server"
            height={35}
            width={70}
            barCount={4}
            barSpacing={2}
          />
        ) : null}
        <ChatProfiles />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        {isMobile ? (
          <OpenSideBarMobileButton />
        ) : isChatHistoryOpen ? null : (
          <Box flexDirection="column" alignItems="flex-start" display="flex">
            <Logo style={{ maxHeight: '25px', marginLeft: '8px' }} />
            {headerTextLeft && (
              <Typography variant="caption" sx={{ mt: 0, ml: 1 }}>{headerTextLeft}</Typography>
            )}
          </Box>
        )}
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Box display="flex" alignItems="center">
          <NewChatButton />
          {displayAvatar && <UserButton />}
        </Box>
        {headerTextRight && (
          <Typography variant="caption" sx={{ mt: 0.5, mr: 1 }}>{headerTextRight}</Typography>
        )}
      </Box>
    </Box>
  );
});

export { Header };
