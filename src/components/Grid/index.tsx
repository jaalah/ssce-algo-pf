import { connect } from 'react-redux';
import { InitialStateTypes, CoordinateTypes } from '../../types';
import { Dispatch } from 'redux';
import { Grid } from './Grid';
import { setCellWall, setStart, setEnd } from '../actions';

const mapStateToProps = (state: InitialStateTypes) => ({
    end: state.end,
    grid: state.grid,
    gridSize: state.gridSize,
    mode: state.mode,
    path: state.path,
    start: state.start
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setCellWall: (coordinates: CoordinateTypes) =>
        dispatch(setCellWall(coordinates)),
    setEnd: (coordinates: CoordinateTypes) => dispatch(setEnd(coordinates)),
    setStart: (coordinates: CoordinateTypes) => dispatch(setStart(coordinates))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
