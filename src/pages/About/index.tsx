import React, { useEffect } from 'react';
import { test } from '../../utils/utils'

const About: React.FC = () => {
    useEffect(() => {
        test()
    }, [])
    return (
        <div>
            <h2>About  Page</h2>
            <p>This is the About  page content.</p>
        </div>
    );
};

export default About;
