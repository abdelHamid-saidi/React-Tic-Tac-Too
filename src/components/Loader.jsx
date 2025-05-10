import { useEffect, useState } from 'react';

const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2000); // start fade out
    const timer2 = setTimeout(() => setVisible(false), 2500); // remove after fade
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="loaders" className={fadeOut ? 'fade-out' : ''}>
      <div className="loader">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;