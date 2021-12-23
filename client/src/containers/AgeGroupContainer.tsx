import React, { useContext, useEffect, useState } from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Area, ComposedChart, ResponsiveContainer, RadialBarChart, RadialBar, Scatter, ScatterChart, ZAxis, PieChart, Pie, Label, BarChart, Bar } from 'recharts';
import { Loading } from '../components/Loading';
import { MiniCard } from '../components/MiniCard';
import { SectionContainer } from '../components/SectionContainer';
import { StyledTooltip } from '../components/StyledTooltip';
import { styled } from '../components/theme';
import { ThemeContext } from '../components/ThemeProvider';
import useFetch from '../hooks/useFetch';
import { IAgeGroupAvg, ITheme } from '../interfaces/Interfaces';
import tokens from '../tokens/baseTokens';



const AgeGroupContainer: React.FC = (() => {
    const [ageData, setAgeData] = useState<IAgeGroupAvg[] | null>();
    const { data, error } = useFetch<IAgeGroupAvg[]>("http://localhost:3001/age-group-avg s")
    const theme = useContext(ThemeContext).theme as ITheme;



    const Container = styled.main`
    padding: 0 1.5rem;
    
    @media ${tokens.constants.device.tablet} {
        padding: 0 1rem;

        }
    `;

    const Separator = styled.div`
    width:100%;
    height:1px;
    background-color: ${(props) => props.theme.interactive.primary.border};
    margin: 2rem 0 3rem 0; 
    `;


    const SalaryTooltip = ({ active, payload, label }: any) => {
        if (active) {
            return (
                <StyledTooltip>
                    <h4>{label}</h4>
                    <p>Lavest - høyest lønn: {payload[0].value[0] + " kr - " + payload[0].value[1]} kr</p>
                    <p>Lønn, gj.snitt: {payload[1].value} kr </p>
                    <p>Utdanning gj.snitt: {payload[2].value} år </p>
                    <p>Erfaring, gj.snitt: {payload[3].value} år </p>
                </StyledTooltip>
            );
        }

        return null;
    };

    const OrganizedTooltip = ({ active, payload, label }: any) => {
        let organizedPercent = 0;
        if (payload.length > 0 && payload[0].payload != null) { organizedPercent = payload[0].payload.organizedPercent };


        if (active) {
            return (
                <StyledTooltip>
                    <h4>{label}</h4>
                    <p>Antall organiserte: {payload[0].value} stk ({organizedPercent}%) </p>
                    <p>Antall ikke-organiserte: {payload[1].value} stk ({(100 - organizedPercent)}%)</p>
                </StyledTooltip>
            );
        }

        return null;
    };

    const SectorTooltip = ({ active, payload, label }: any) => {
        let publicSectorPercent = 0;
        let privateSectorPercent = 0;
        if (payload.length > 0 && payload[1].payload != null) { publicSectorPercent = payload[1].payload.publicSectorPercent };
        if (payload.length > 0 && payload[2].payload != null) { privateSectorPercent = payload[2].payload.privateSectorPercent };

        if (active) {
            return (
                <StyledTooltip>
                    <h4>{label}</h4>
                    <p>Ikke oppgitt: {payload[0].value} stk ({((privateSectorPercent + publicSectorPercent) - 100) * -1}%)</p>
                    <p>Offentlig sektor: {payload[1].value} stk ({(publicSectorPercent)}%)</p>
                    <p>Privat sektor: {payload[2].value} stk ({(privateSectorPercent)}%)</p>
                </StyledTooltip>
            );
        }

        return null;
    };



    return (
        <Container>

            {/*<PieChart width={400} height={300}>
                <Pie data={data} dataKey="organizedAmount" nameKey="groupName" cx="50%" cy="50%" outerRadius={100} fill="#fbb033" label={renderCustomizedLabel} />
                <Tooltip formatter={(value: number) => value + " stk"} />
    </PieChart>*/}
            {data ?
                <>
                    <SectionContainer state={{ direction: "column" }}>
                        <h2>Aldersgrupper</h2>
                        <p>Denne oversikten viser lønn, høyest, lavest og gjennomsnitt, andelen fagorganiserte og hvor mange som jobber i privat/offentlig sektor per aldersgruppe.</p>
                    <Separator/>
                        
                        <div>
                            <h3>Antall respondenter i hver aldersgruppe</h3>
                            <SectionContainer state={{ direction: "row" }}>
                                {data?.map((group: IAgeGroupAvg, index) => {
                                    return (<MiniCard key={group.groupName + "-" + index} state={{ direction: "column" }}>
                                        <h4>{group.groupName}</h4>
                                        <p>{group.groupSize} stk.</p>
                                    </MiniCard>)
                                })}
                            </SectionContainer>
                        </div>

                    </SectionContainer>
                    <Separator/>
                    <SectionContainer state={{ direction: "column" }}>
                        <h3>Lønn og aldersgruppe</h3>
                        <ResponsiveContainer width={"100%"} height={300}>
                            <ComposedChart width={730} height={250} data={data}
                                syncId="anyId"
                                margin={{ top: 0, right: -30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="1" />
                                <XAxis dataKey="groupName" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip content={<SalaryTooltip />} />
                                <Legend />
                                <Area yAxisId="left" unit=" kr" dataKey="minMaxSalary" stroke={theme.miscColors.color1} fill={theme.miscColors.color1} animationBegin={0} animationDuration={600} animationEasing="ease-in-out" />
                                <Line yAxisId="left" unit=" kr" type="monotone" strokeWidth={3} dataKey="avgSalary" stroke={theme.miscColors.color2} animationBegin={0} animationDuration={600} animationEasing="ease-in-out" />
                                <Line yAxisId="right" unit=" år" type="monotone" strokeWidth={3} dataKey="avgEducation" stroke={theme.miscColors.color3} animationBegin={0} animationDuration={600} animationEasing="ease-in-out" />
                                <Line yAxisId="right" unit=" år" type="monotone" strokeWidth={3} dataKey="avgWorkExperience" stroke={theme.miscColors.color5} animationBegin={0} animationDuration={600} animationEasing="ease-in-out" />

                            </ComposedChart>
                        </ResponsiveContainer>
                        <h3>Fagorganiserte</h3>
                        <ResponsiveContainer width={"100%"} height={300}>
                            <BarChart width={730} height={250} data={data}
                                syncId="anyId"
                                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <XAxis dataKey="groupName" />
                                <YAxis />
                                <Legend />
                                <Tooltip content={<OrganizedTooltip />} />
                                <Bar dataKey="nonOrganizedAmount" stackId="a" fill={theme.miscColors.color2} animationBegin={0} animationDuration={400} animationEasing="ease-in-out" />
                                <Bar dataKey="organizedAmount" stackId="a" fill={theme.miscColors.color3} animationBegin={410} animationDuration={400} animationEasing="ease-in-out" />
                            </BarChart>
                        </ResponsiveContainer>
                        <h3>Sektor</h3>
                        <ResponsiveContainer width={"100%"} height={300}>
                            <BarChart width={730} height={250} data={data}
                                syncId="anyId"
                                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <XAxis dataKey="groupName" />
                                <YAxis />
                                <Legend />
                                <Tooltip content={<SectorTooltip />} />
                                <Bar dataKey="noSectorAmount" stackId="a" fill={theme.miscColors.color2} animationBegin={0} animationDuration={400} animationEasing="ease-in-out" />
                                <Bar dataKey="publicSectorAmount" stackId="a" fill={theme.miscColors.color4} animationBegin={410} animationDuration={200} animationEasing="ease-in-out" />
                                <Bar dataKey="privateSectorAmount" stackId="a" fill={theme.miscColors.color5} animationBegin={610} animationDuration={400} animationEasing="ease-in-out" />
                            </BarChart>
                        </ResponsiveContainer>
                    </SectionContainer>
                </> : <Loading/>
            }
        </Container>
    )

})


export default AgeGroupContainer;