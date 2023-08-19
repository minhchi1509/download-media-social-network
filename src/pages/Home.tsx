import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react';

import InstgramDownload from './components/InstgramDownload';

const tabsConfig = [
  {
    label: 'Instagram',
    component: <InstgramDownload />
  },
  {
    label: 'Facebook',
    component: <></>
  },
  {
    label: 'Douyin',
    component: <></>
  },
  {
    label: 'Tiktok',
    component: <></>
  }
];

const Home = () => {
  return (
    <>
      <Text textAlign="center" fontSize="5xl" fontWeight="bold">
        Trình tải xuống ảnh, video
      </Text>
      <Tabs isFitted variant="enclosed" mt={2}>
        <TabList>
          {tabsConfig.map((tabs, index) => (
            <Tab key={index}>{tabs.label}</Tab>
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
