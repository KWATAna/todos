//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import ItemContext from "./item-context";
//@@viewOff:imports

export function useItem() {
  return useContext(ItemContext);
}

export default useItem;
