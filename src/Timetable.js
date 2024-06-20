import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Checkbox,
  Box
} from '@chakra-ui/react';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import app from './FirebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Timetable = forwardRef((props, ref) => {
  const daysMap = {
    0: "SEG",
    1: "TER",
    2: "QUA",
    3: "QUI",
    4: "SEX",
    5: "SAB",
    6: "DOM"
  };

  
  const initialState = Array(7).fill().map(() => Array(24).fill(false));
  const [checkedItems, setCheckedItems] = useState(initialState);

  const transformToJson = (items) => {
    const result = {};
    items.forEach((day, dayIndex) => {
      const dayKey = daysMap[dayIndex];
      result[dayKey] = {};
      day.forEach((checked, hourIndex) => {
        result[dayKey][hourIndex] = checked;
      });
    });
    return result;
  };

  useImperativeHandle(ref, () => ({
    getHorarios() {
      return transformToJson(checkedItems);
    },
    resetHorarios() {
      setCheckedItems(initialState);
    }
  }));

  const handleParentChange = (dayIndex) => (e) => {
    const isChecked = e.target.checked;
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[dayIndex] = Array(24).fill(isChecked);
      return newCheckedItems;
    });
  };

  const handleChildChange = (dayIndex, hourIndex) => (e) => {
    const isChecked = e.target.checked;
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[dayIndex][hourIndex] = isChecked;
      return newCheckedItems;
    });
  };

  const getAllChecked = (dayIndex) => checkedItems[dayIndex].every(Boolean);
  const getIsIndeterminate = (dayIndex) => checkedItems[dayIndex].some(Boolean) && !getAllChecked(dayIndex);

  const hours = Array.from({ length: 24 }, (_, i) => `${i}h`);
  const days = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

  return (
    <Card align='center' size='sm' mx={20} boxShadow=''>
      <CardBody size='sm'>
        <Grid
          templateRows='repeat(24, 1fr)'
          templateColumns='repeat(8, 1fr)'
          gap={0}
          size='sm'
        >
          <GridItem size='sm' rowSpan={25} colSpan={1} bg='' display="flex" alignItems="center" justifyContent="center">
            <Grid templateRows="repeat(24, 1fr)" gap={1}>
              <GridItem py={2} fontWeight={'bold'}>HORÁRIOS</GridItem>
              {hours.map((hour, index) => (
                <Box
                  key={index}
                  py={2}
                  borderBottom={index < 23 ? "1px" : "none"}
                  borderColor="gray.300"
                  w="100%"
                  textAlign="center"
                >
                  {hour}
                </Box>
              ))}
            </Grid>
          </GridItem>

          {days.map((day, dayIndex) => (
            <GridItem rowSpan={25} colSpan={1} key={dayIndex} size='sm'>
              <Grid templateRows="repeat(24, 1fr)" gap={1}>
                <GridItem rowSpan={1} colSpan={1} display="flex" alignItems="center" justifyContent="center">
                  <Checkbox
                    p={0}
                    isChecked={getAllChecked(dayIndex)}
                    isIndeterminate={getIsIndeterminate(dayIndex)}
                    onChange={handleParentChange(dayIndex)}
                    fontWeight={'bold'}
                    size={''}
                    icon={<Box w="0" h="0" backgroundColor="green.500" />}
                  >
                    {day}
                  </Checkbox>
                </GridItem>
                {checkedItems[dayIndex].map((isChecked, hourIndex) => (
                  <Box
                    key={hourIndex}
                    py={2}
                    borderBottom={hourIndex < 23 ? "1px" : "none"}
                    borderColor="gray.300"
                    w="100%"
                    textAlign="center"
                  >
                    <Checkbox
                      isChecked={isChecked}
                      onChange={handleChildChange(dayIndex, hourIndex)}
                      colorScheme='green'
                      size='lg'
                    >
                    </Checkbox>
                  </Box>
                ))}
              </Grid>
            </GridItem>
          ))}
        </Grid>
      </CardBody>
    </Card>
  );
});

export default Timetable;
