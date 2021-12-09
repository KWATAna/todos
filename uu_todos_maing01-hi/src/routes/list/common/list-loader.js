//@@viewOn:imports

import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Calls from "calls";
import ListContext from "../context/list-context";
import Config from "../../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ListLoader",
  //@@viewOff:statics
};

export const ListLoader = createComponent({
  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.listList,
        delete: Calls.listDelete,
        update: Calls.listUpdate,
        create: Calls.listCreate,
      },
      itemHandlerMap: {},
    });
    console.log("dataListResult", dataListResult);
    return <ListContext.Provider value={dataListResult}>{props.children}</ListContext.Provider>;
  },
  //@@viewOff:render
});

export default ListLoader;
