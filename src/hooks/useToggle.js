import { useState } from 'react';

function useToggle(init = false) {
  const [state, setState] = useState(init);

  function toggle() {
    setState(!state);
  }

  return [state, toggle];
}

export default useToggle;
