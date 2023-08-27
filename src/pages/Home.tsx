import {
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react';

import DouyinDownload from './components/DouyinDownload';
import FacebookDownload from './components/FacebookDownload';
import InstgramDownload from './components/InstgramDownload';
import TiktokDownload from './components/TiktokDownload';
import { FacebookLogo, InstagramLogo, TiktokLogo } from 'src/assets/images';

const tabsConfig = [
  {
    label: 'Instagram',
    logo: InstagramLogo,
    component: <InstgramDownload />
  },
  {
    label: 'Facebook',
    logo: FacebookLogo,
    component: <FacebookDownload />
  },
  {
    label: 'Douyin',
    logo: TiktokLogo,
    component: <DouyinDownload />
  },
  {
    label: 'Tiktok',
    logo: TiktokLogo,
    component: <TiktokDownload />
  }
];

const Home = () => {
  return (
    <>
      <Text textAlign="center" fontSize="5xl" fontWeight="bold">
        Trình tải xuống ảnh, video
      </Text>
      <Tabs isFitted variant="soft-rounded" colorScheme="gray" mt={2}>
        <TabList>
          {tabsConfig.map((tabs, index) => (
            <Tab key={index} display="flex" gap={3} alignItems="center">
              <Image
                src={tabs.logo}
                alt="Instagram-Logo"
                width={5}
                height={5}
              />
              {tabs.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabsConfig.map((tabs, index) => (
            <TabPanel key={index}>{tabs.component}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Home;
