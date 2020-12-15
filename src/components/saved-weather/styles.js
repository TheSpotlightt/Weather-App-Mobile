import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView `
    background-color: #18191A;
    flex: 1;
`

export const ContainerScroll = styled.ScrollView ``;


export const CurrentInfos = styled.View `
    margin-top: 30px;

`;


export const Location = styled.Text `
    color: #e2e2e2;
    font-size: 22px;
    text-align: center;
`;

export const LocalTemperature = styled.Text `
    color: #e2e2e2;
    font-size: 30px;
    text-align: center;
`;
export const LocalCondition = styled.Text `
    color: #e2e2e2;
    font-size: 18px;
    text-align: center;
`;

export const ConditionIcon = styled.Image `
    width: 50px;
    height: 50px;
`;

export const ImgContainer = styled.View `
    align-items: center;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 15px;
    margin-left: 14px;

`;

export const ForecastContainer = styled.View `
    margin-top: 30px;

`;

export const DailyConditions = styled.Text `
    color: #e2e2e2;
    font-size: 17px;
    text-align: center;
`;

export const ForecastImgContainer = styled.View `
    align-items: center;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 15px;
    margin-left: 14px;
`;

export const ForecastTemperature = styled.Text `
    color: #e2e2e2;
    font-size: 18px;
    text-align: center;
`;
export const Table = styled.View `
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    margin-top: 30px;
`;

export const TableTitle = styled.Text `
    color: #e2e2e2;
    font-size: 15px;
`;


export const Infos = styled.Text `
    color: #e2e2e2;
    font-size: 14px;
    opacity: .7;
`;

export const Row1 = styled.View `
    flex-direction: row;
    justify-content: space-between;
    margin: 15px;
`