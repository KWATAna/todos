//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent, useEffect, useState } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import UU5 from "uu5g04";
import Config from "../config/config";
import ItemTiles from "./item-wrapper";
import useItem from "./context/use-item.js";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "List",
  //@@viewOff:statics
};

export const ItemList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    const [show, setShow] = useState(true);
    const { handlerMap } = useItem();
    let listId = props.params;
    //@@viewOn:interface
    //@@viewOff:interface
    useEffect(() => {
      handlerMap.load({ listId });
    }, [listId]);

    function filterThings() {
      if (show) {
        handlerMap.load({ listId, state: "active" });
        setShow(!show);
      } else {
        handlerMap.load({ listId });
        setShow(!show);
      }
    }

    //@@viewOn:render
    return (
      <>
        <ItemTiles listId={listId}></ItemTiles>
        <UU5.Bricks.Button onClick={() => filterThings()} content={show?"hide":"show"} />
      </>
    );
    //@@viewOff:render
  },
});

export default ItemList;
