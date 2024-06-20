import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import app from './FirebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function Chart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore(app);
            const casasCollectionRef = collection(db, 'casas');
            const data = await getDocs(casasCollectionRef);
            const matriz = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            const processedData = processMatriz(matriz);
            setChartData(processedData);
        };
        fetchData();
    }, []);

    function processMatriz(matriz) {
        const daysOfWeek = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
        const processedData = [];

        matriz.forEach((entry, enderecoIndex) => {
            const result = daysOfWeek.map(day => ({
                name: day,
                data: Array(24).fill(0)
            }));

            const horarios = entry.allHorarios;
            horarios.forEach((horario, morador) => {
                daysOfWeek.forEach((day, dayIndex) => {
                    for (let hr = 0; hr < 24; hr++) {
                        if (horario[day] && horario[day][hr]) {
                            result[dayIndex].data[hr]++;
                        }
                    }
                });
            });

            processedData.push({ endereco: entry.endereco, series: result });
        });

        console.log(processedData); // Verifica os dados processados
        return processedData;
    }

    const chartOptions = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'last',
                dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                }
            },
        },
        xaxis: {
            type: 'category',
            categories: Array.from({ length: 24 }, (_, i) => i), // Horas de 0 a 23
            labels: {
                formatter: function (val) {
                    return `${val}h`;
                }
            }
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        fill: {
            opacity: 1
        }
    };

    return (
        <div>
            {chartData.map((data, index) => (
                <div key={index}>
                    <h3>{data.endereco}</h3>
                    <ApexCharts
                        options={chartOptions}
                        series={data.series}
                        type="bar"
                        width={1000}
                        height={320}
                    />
                </div>
            ))}
        </div>
    );
}

export default Chart;
