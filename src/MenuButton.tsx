import {styled} from '@mui/material/styles';
import Button from "@mui/material/Button";

type MenuButtonProps = {
    background?: string
};

export const MenuButton = styled(Button)<MenuButtonProps>(({background})=>({
    minWidth: '110',
    fontWeight: 'bold',
    boxShadow: '0 0 0 2px #054B62, 4px 4px 0 0 #054B62',
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    backgroundColor: background || '#1565c0',
    //ставь background , а если ничего не прилетело то ставь '#1565c0' этот цвет
}));