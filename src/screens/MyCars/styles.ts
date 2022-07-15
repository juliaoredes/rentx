import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
 flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 325px;

    background-color: ${({ theme }) => theme.colors.header};

    justify-content: center;
    padding: 25px;
    padding-top: ${getStatusBarHeight() + 30}px;

`;

 export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(20)}px;

    margin-top: 25px;
 `;

 export const SubTitle = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.secondary_400};
    font-size: ${RFValue(12)}px;

    margin-top: 25px;
 `;

export const Content = styled.View`
    flex: 1;
    width: 100%;
    padding: 0 16px;
`;

export const Appointments = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
`;

export const AppointmentQuantity = styled.Text`
    color: ${({ theme }) => theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(12)}px;
`;

