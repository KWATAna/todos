//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import ItemLoader from "./item/common/item-loader.js";
import ItemContext from "./item/context/item-context.js";
import DataListStateResolver from "./list/common/data-list-state-resolver.js";

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

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <ItemLoader>
        <ItemContext.Consumer>
          {(dataItemResult) => {
            return <DataListStateResolver dataList={dataItemResult}>
              <div>{JSON.stringify(dataItemResult)}</div>
            </DataListStateResolver>;
          }}
        </ItemContext.Consumer>
      </ItemLoader>
    );
    //@@viewOff:render
  },
});

export default Item;
