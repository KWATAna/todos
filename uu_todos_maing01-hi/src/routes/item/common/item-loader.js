//@@viewOn:imports

import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Calls from "calls";
import ItemContext from "../context/item-context";
import Config from "../../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ListLoader",
  //@@viewOff:statics
};

export const ItemLoader = createComponent({
  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    const dataItemResult = useDataList({
      handlerMap: {
        load: Calls.itemList,
      },
      itemHandlerMap: {},
    });
    return <ItemContext.Provider value={dataItemResult}>{props.children}</ItemContext.Provider>;
  },
  //@@viewOff:render
});

export default ItemLoader;
