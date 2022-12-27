import React from 'react';
import { GridSizeTypes, Mode } from '../../types';
import './Controls.css';

interface ControlsProps {
    getPath: () => void;
    clearGrid: () => void;
    gridSize: GridSizeTypes;
    mode: Mode;
    setMode: (mode: Mode) => void;
    updateGridSize: (gridSize: GridSizeTypes) => void;
}

const Controls: React.FC<ControlsProps> = ({
    getPath,
    clearGrid,
    gridSize,
    mode,
    setMode,
    updateGridSize
}) => {
    const activeClass = 'control-button--active';
    const [gridWidth, setGridWidth] = React.useState<number>(0);
    const [gridHeight, setGridHeight] = React.useState<number>(0);

    const handleGridWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGridWidth(Number(e.target.value));
    };

    const handleGridHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGridHeight(Number(e.target.value));
    };

    const handleUpdateGridSize = () => {
        updateGridSize({
            width: gridWidth,
            height: gridHeight
        });
    };

    return (
        <>
            <form
                className="form-container"
                onSubmit={(e) => e.preventDefault()}
            >
                <fieldset>
                    <legend>Grid Controls</legend>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Grid Width:</label>
                            <input
                                id="grid-width"
                                max="100"
                                min="5"
                                onChange={handleGridWidthChange}
                                placeholder={`${gridSize.width}`}
                                type="number"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Grid Height:</label>
                            <input
                                id="grid-height"
                                max="100"
                                min="5"
                                onChange={handleGridHeightChange}
                                placeholder={`${gridSize.height}`}
                                type="number"
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="control-button"
                                onClick={handleUpdateGridSize}
                            >
                                Update Grid
                            </button>
                        </div>
                    </div>
                    <div className="form-row">
                        <button
                            className={`control-button ${
                                mode === Mode.setStart ? activeClass : ''
                            }`}
                            onClick={() => setMode(Mode.setStart)}
                        >
                            Choose Starting Point
                        </button>
                        <button
                            className={`control-button ${
                                mode === Mode.setEnd ? activeClass : ''
                            }`}
                            onClick={() => setMode(Mode.setEnd)}
                        >
                            Choose Ending Point
                        </button>
                        <button
                            className={`control-button ${
                                mode === Mode.setWall ? activeClass : ''
                            }`}
                            onClick={() => setMode(Mode.setWall)}
                        >
                            Create Blocks
                        </button>
                    </div>
                    <div className="form-row">
                        <button className="control-button" onClick={getPath}>
                            Run Algorithm
                        </button>
                        <button className="control-button" onClick={clearGrid}>
                            Reset
                        </button>
                    </div>
                </fieldset>
            </form>
            <div className="key-container">
                <div className="key">
                    <span className="key-name">Visited</span>
                    <div className="gridCell gridCell--visited" />
                </div>
                <div className="key">
                    <span className="key-name">Wall</span>
                    <div className="gridCell gridCell--wall" />
                </div>
                <div className="key">
                    <span className="key-name">Path</span>
                    <div className="gridCell gridCell--path" />
                </div>
                <div className="key">
                    <span className="key-name">Block</span>
                    <div className="gridCell gridCell--block" />
                </div>
            </div>
        </>
    );
};

export { Controls };
