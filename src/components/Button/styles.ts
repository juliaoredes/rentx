import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, BorderlessButtonProps, RectButton, RectButtonProps } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { ReactNode } from 'react';

interface ButtonProps extends BorderlessButtonProps {
  color?: string;
}


export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: ${RFValue(19)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color, theme }) => color || theme.colors.main};
  margin-bottom: ${RFValue(8)}px;
`;


export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.shape};
`;