import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, Radio, RadioGroup, Stack, Checkbox
} from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
function Timetable() {
    const [checkedItems, setCheckedItems] = React.useState([false, false])
  
    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked
    return (
        <Card align='center' size='md' m={10} mx={500}>
            <CardBody>
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>Horários</Th>
                                <Th>
                                <Checkbox
                                        isChecked={allChecked}
                                        size='lg'
                                        colorScheme='green'
                                        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
                                    >

                                    </Checkbox>
                                    Seg
                                </Th>
                                <Th>Ter</Th>
                                <Th>Qua</Th>
                                <Th>Qui</Th>
                                <Th>Sex</Th>
                                <Th>Sáb</Th>
                                <Th>Dom</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>08:00</Td>
                                <Td>
                                <Checkbox
                                        isChecked={checkedItems[0]}
                                        size='lg'
                                        colorScheme='green'
                                        onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                                    >

                                    </Checkbox>
                                </Td>
                                
                            </Tr>

                            <Tr>
                                <Td>09:00</Td>
                                <Td>
                                <Checkbox
                                        isChecked={checkedItems[1]}
                                        size='lg'
                                        colorScheme='green'
                                        onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                                    >

                                    </Checkbox>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>09:00</Td>
                                <Td>
                                <Checkbox
                                        isChecked={checkedItems[2]}
                                        size='lg'
                                        colorScheme='green'
                                        onChange={(e) => setCheckedItems([checkedItems[1], e.target.checked])}
                                    >

                                    </Checkbox>
                                </Td>
                            </Tr>
                        </Tbody>

                    </Table>
                </TableContainer>
            </CardBody>
        </Card>
    );
}

export default Timetable;