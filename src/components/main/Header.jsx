
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../counter/counterSlice';
import ThemeSelector from '../Theme/ThemeSelector';
import './Header.css'

const Header = () => {

    const dispatch = useDispatch();

    const count = useSelector((state) => state.counter.value);


    return (
        <div className="header-container">
            <div className="header-left">
                <h2 className="header-title">Counter Widget</h2>
                <div className="counter-section">
                    <label className="counter-label">Current Count:</label>
                    <input 
                        type='number' 
                        value={count}
                        className="counter-input"
                        readOnly
                    ></input>
                    <div className="counter-buttons">
                        <button 
                            onClick={() => dispatch(increment())} 
                            className="counter-btn counter-increment"
                        >
                            +1
                        </button>
                        <button 
                            onClick={() => dispatch(decrement())} 
                            className="counter-btn counter-decrement"
                        >
                            -1
                        </button>
                    </div>
                </div>
            </div>
            <div className="header-right">
                <ThemeSelector />
            </div>
        </div>
    )
}

export default Header
