//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "../config/config";
import { useContextModal } from "../../common/modal-manager";
import { useItem } from "./context/use-item";
import ItemBlock from "./item-block";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Tiles",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const ItemTiles = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { data, handlerMap: itemHandlerMap } = useItem();
    const listId = props.listId;
    // @@viewOn:hooks
    //@@viewOff:hooks
    //@@viewOn:private
    const [open, close, showAlert, getConfirmRef] = useContextModal();

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <Uu5Tiles.ControllerProvider data={data}>
        <UU5.Forms.TextButton
          buttons={[
            {
              icon: "fa-check",
              onClick: (opt) => {
                itemHandlerMap.create({ listId: listId, text: opt.value });
              },
              colorSchema: "info",
            },
          ]}
        />
        <Uu5Tiles.Grid tileSpacing={8} rowSpacing={2}>
          <ItemBlock getConfirmRef={getConfirmRef}></ItemBlock>
        </Uu5Tiles.Grid>
      </Uu5Tiles.ControllerProvider>
    ) : null;
    //@@viewOff:render
  },
});

export default ItemTiles;
