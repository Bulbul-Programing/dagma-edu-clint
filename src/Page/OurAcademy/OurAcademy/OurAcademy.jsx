import Banner from "../../Home/Home/Banner/Banner";
import Teachers from "../Teachers/Teachers";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './ouracademy.css'

const OurAcademy = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="my-10">
        <Tabs>
          <TabList className='flex justify-center my-5 gap-x-5'>
            <Tab className='px-4 py-1 cursor-pointer outline-none text-xl font-bold'>Teachers</Tab>
            <Tab className='px-4 py-1 cursor-pointer outline-none text-xl font-bold'>History</Tab>
          </TabList>

          <TabPanel>
            <Teachers></Teachers>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
      
    </div>
  );
};

export default OurAcademy;