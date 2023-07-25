import { useEffect, useState } from 'react';

// This hook runs to prevent React.useStrict from interfering with the execution of react-beautiful-dnd.
// https://github.com/atlassian/react-beautiful-dnd/issues/2396

export const useStrictDroppable = (loading: boolean) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        let animation: any;
        if (!loading) {
            animation = requestAnimationFrame(() => setEnabled(true));
        }
        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, [loading]);

    return [enabled];
};