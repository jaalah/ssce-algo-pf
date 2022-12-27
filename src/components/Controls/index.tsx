import { connect } from 'react-redux';
import { GridSizeTypes, InitialStateTypes, Mode } from '../../types';
import { Dispatch } from 'redux';
import { Controls } from './Controls';
import * as actions from '../actions';

const mapStateToProps = (state: InitialStateTypes) => ({
    mode: state.mode,
    gridSize: state.gridSize
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setMode: (mode: Mode) => dispatch(actions.setMode(mode)),
    getPath: () => dispatch(actions.getPath()),
    clearGrid: () => dispatch(actions.clearGrid()),
    updateGridSize: (gridSize: GridSizeTypes) =>
        dispatch(actions.updateGridSize(gridSize))
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
