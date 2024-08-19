import React, { useEffect } from "react";

type Props = {
  ref: React.RefObject<HTMLElement>;
  callback: (event: MouseEvent | TouchEvent) => void;
};

const useOutsideClick = (ref:React.RefObject<HTMLElement>, callback:(event: MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    const handleClickOutSide = (event:MouseEvent|TouchEvent) =>{
        if(ref.current && !ref.current.contains(event.target as Node)){
            callback(event);
        }
    }
    document.addEventListener('mousedown', handleClickOutSide);
    document.addEventListener('touchstart', handleClickOutSide);

    return () =>{
        document.removeEventListener('mousedown', handleClickOutSide);
        document.removeEventListener('touchstart', handleClickOutSide);
            
    }
  }, [ref, callback]);
};

export default useOutsideClick;
