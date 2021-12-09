//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import  ListContext from "./list-context";
//@@viewOff:imports

export function useList() {
  return useContext(ListContext);
}

export default useList;
