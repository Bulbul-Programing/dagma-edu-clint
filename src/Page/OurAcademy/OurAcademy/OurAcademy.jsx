import Banner from "../../Home/Home/Banner/Banner";
import Teachers from "../Teachers/Teachers";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './ouracademy.css'
import Glary from "../Glary/Glary";
import { useState } from "react";
import Results from "./Results/Results";

const OurAcademy = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="my-10">
        <Tabs>
          <TabList className='flex justify-center my-5'>
            <Tab className='px-2 md:px-4 lg:px-4 py-1 cursor-pointer outline-none text-xl font-bold'>Glary</Tab>
            <Tab className='px-2 md:px-4 lg:px-4 py-1 cursor-pointer outline-none text-xl font-bold'>Teachers</Tab>
            <Tab className='px-2 md:px-4 lg:px-4 py-1 cursor-pointer outline-none text-xl font-bold'>History</Tab>
            <Tab className='px-2 md:px-4 lg:px-4 py-1 cursor-pointer outline-none text-xl font-bold'>Results</Tab>
          </TabList>

          <TabPanel>
            <Glary></Glary>
          </TabPanel>
          <TabPanel>
            <Teachers></Teachers>
          </TabPanel>
          <TabPanel>
            <h2 className="text-3xl font-bold text-center my-10">History Loading.....</h2>
          </TabPanel>
          <TabPanel>
            <Results></Results>
          </TabPanel>
        </Tabs>
      </div>

    </div>
  );
};

export default OurAcademy;