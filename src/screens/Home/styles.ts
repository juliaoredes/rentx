import styled from 'styled-components/native';
import { FlatList } from 'react-native'; 
import { RFValue } from 'react-native-responsive-fontsize';
import { CarDTO } from '../../dtos/CarDTO';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
 flex: 1;
 background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 113px;

    background-color: ${({ theme }) => theme.colors.header};
    justify-content: flex-end;

    padding: 20px 24px;
`;

export const HeaderContent = styled.View`

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TotalCar = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new () => FlatList<CarDTO>)
.attrs({
    contentContainerStyle: {
        padding: 24
    }, 
    showsVericalScroolIndicator: false
})`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
`;

export const MyCarsButton = styled(RectButton)`
    width: 60px;
    height: 60px;

    border-radius: 30px;

    justify-content: center;
    align-items: center;

    position: absolute;
    bottom: 13px;
    right: 23px;


    background-color: ${({ theme }) => theme.colors.main};
`;

