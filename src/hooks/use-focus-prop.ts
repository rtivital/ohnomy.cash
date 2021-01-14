import React, { useEffect } from 'react';

export default function useFocusProp(focus: boolean, ref: React.RefObject<HTMLInputElement>) {
  useEffect(() => {
    focus && ref && ref.current && ref.current.focus();
  }, [focus]);
}
