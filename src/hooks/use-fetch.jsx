import { useState, useEffect, useCallback } from 'react';

// To abstract away common fetch logic: loading state, 
// error handling, and storing the result of an async function.

const useFetch = (cb, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await cb(options, ...args);
            setData(response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fn };
};

export default useFetch;