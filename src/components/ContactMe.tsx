import { Box, Image, Text } from '@chakra-ui/react';

import { FacebookLogo, InstagramLogo } from 'src/assets/images';

const ContactMe = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
      <Text fontWeight="bold">❤Made by @minhchi1509</Text>
      <a
        href="https://www.instagram.com/minhchi1509/"
        target="_blank"
        rel="noreferrer"
      >
        <Image src={InstagramLogo} height={18} width={18} />
      </a>
      <a
        href="https://www.facebook.com/minhchi1509"
        target="_blank"
        rel="noreferrer"
      >
        <Image src={FacebookLogo} height={18} width={18} />
      </a>
    </Box>
  );
};

export default ContactMe;
