import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Heading,
    Input,
    Button,
    ButtonGroup,
    IconButton, useToast
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import Timetable from './Timetable';
import app from './FirebaseConfig';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

function Form() {
    const [nMoradores, setNMoradores] = useState(1);
    const timetableRefs = useRef([]);
    const [endereco, setEndereco] = useState('')

    const handlePlusCLick = () => {
        setNMoradores(nMoradores + 1);
    };

    //salvando no banco de dados
    const db = getFirestore(app);
    const casasCollectionRef = collection(db, 'casas');
    
    const qtd = 1;
    const handleSaveClick = async () => {
        const allHorarios = timetableRefs.current.map(ref => ref?.getHorarios());
        console.log(allHorarios);
        setNewMoradores(allHorarios);

        const registro = await addDoc(casasCollectionRef, {
            nMoradores,
            endereco,
            allHorarios,
        })
        
        // Update the state with the new data
        window.location.reload()
    };

    const setNewMoradores = (horarios) => {
        // Handle the new data as needed
        console.log(horarios);
    };
    const toast = useToast();
    return (
        <Card size={'md'} mx={200}>
            <CardHeader>
                <Heading size='md'>Moradores Report</Heading>
            </CardHeader>
            <CardBody>
                <Input variant='filled' placeholder='Digite aqui seu endereço' onChange={(e) => setEndereco(e.target.value) }/>
                {Array.from({ length: nMoradores }, (_, index) => (
                    <Timetable key={index} ref={el => timetableRefs.current[index] = el} />
                ))}
            </CardBody>
            <CardFooter>
                <ButtonGroup size='sm' isAttached variant='outline'>
                    <Button onClick={() => {handleSaveClick()
                        toast({
                              title: 'Relatório Enviado!',
                              description: "Seu relatório foi registrado com sucesso, obrigado pela ajuda.",
                              status: 'success',
                              duration: 29000,
                              isClosable: true,
                            })
                    }}>Enviar</Button>
                    <IconButton onClick={handlePlusCLick} aria-label='Add to friends' icon={<AddIcon />} />
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}

export default Form;
