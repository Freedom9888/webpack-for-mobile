import React,{useEffect} from 'react';
import { test } from '../../utils/utils'

const Home: React.FC = () => {
    useEffect(() => {
        test()
    }, [])
    return (
        <div>
            <h2>Home Page</h2>
            <p>This is the Home page content.</p>
        </div>
    );
};

export default Home;
