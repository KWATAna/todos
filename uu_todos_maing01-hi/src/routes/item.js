//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import ItemLoader from "./item/common/item-loader";
import ItemContext from "./item/context/item-context.js";
import DataListStateResolver from "../common/data-list-state-resolver.js";
import ItemList from "./item/item-list.js";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "List",
  //@@viewOff:statics
};

export const Item = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
    let params = props?.params?.listId;

    //@@viewOn:render
    return (
      <ItemLoader>
        <ItemContext.Consumer>
          {(dataItemResult) => {
            return (
              <DataListStateResolver dataList={dataItemResult}>
                <ItemList params={params} />
              </DataListStateResolver>
            );
          }}
        </ItemContext.Consumer>
      </ItemLoader>
    );
    //@@viewOff:render
  },
});

export default Item;
