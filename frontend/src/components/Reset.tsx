import { Fab, styled } from '@mui/material';
import { AiOutlineReload } from 'react-icons/ai';
import { useSearchStore } from '../hooks/useSearchStore';
import { useMapStore } from '../hooks/useMap';
import { useTollData } from '../hooks/useTollData';

const ResetButton = styled(Fab)(({ theme }) => ({
    position: "fixed",
    top: 64,
    right: 16,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    ":hover":{
        backgroundColor: theme.palette.secondary.dark,
    },
    zIndex: 1000,
  }));

const Reset = () => {

    const { resetForm } = useSearchStore();
    const { resetMap } = useMapStore();
    const { setData } = useTollData();

    const handleReset = () => {
        resetForm();
        resetMap();
        setData(undefined);
    }
    return (
        <ResetButton onClick={handleReset} title="reset" size='small'>
            <AiOutlineReload title='resets' size={20} />
        </ResetButton>
    );
};

export default Reset;