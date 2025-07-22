import { useState, useEffect } from 'react';

function ChildComponent() {
  const [color, setColor] = useState('red');
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    const timer = setTimeout(() => {
      if (mounted.current) {
        setColor('green');
      }
    }, 3000);

    return () => {
      mounted.current = false;
      clearTimeout(timer);
    };
  }, []);

  return <p style={{ color }}>{color}</p>;
}
export default ChildComponent;
