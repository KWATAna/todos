//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "../config/config";
import Css from "./styles/item-block.css";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ItemBlock",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const ItemBlock = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
    handleOpenDetailsModal: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { getConfirmRef, data: item } = props;

    const name = item?.data?.text;
    function checkComplete() {
      if (item?.data?.state === "completed") {
        return true;
      } else {
        return false;
      }
    }
    const [state, setState] = useState(checkComplete());
    const [update, setUpdate] = useState(false);
    const [itemName, setItemName] = useState(name);
    //@@viewOn:private
    const confirm = getConfirmRef();
    const { handlerMap } = item;

    function updateItem(text) {
      handlerMap.update({ text });
      console.log("text", text, "handlerMap", handlerMap);
    }

    function handleOpenConfirmModal() {
      return {
        onRefuse: () => setUpdate(!update),
        onConfirm: handlerMap.delete,
        header: "Cookies",
        content: <UU5.Bricks.P>Are you sure you want to delete this TODO item.</UU5.Bricks.P>,
        confirmButtonProps: { content: "Delete", colorSchema: "danger" },
        refuseButtonProps: { content: "Cancel", colorSchema: "green" },
        confirmButtonLeft: true,
      };
    }

    async function setFinalState(value) {
      if (value) {
        try {
          await handlerMap.setfinalstate({ state: "completed" });
        } catch (e) {
          console.log(e, "error while deleting todo item");
        }
        setState(true);
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div>
        <UU5.Bricks.Card colorSchema={state ? "deep-orange" : "orange"}>
          <div className={Css.header()}>
            <UU5.Forms.Checkbox
              label="completed"
              labelPosition="right"
              value={state}
              onChange={(opt) => setFinalState(opt.value)}
            />
            {!update ? (
              <UU5.Bricks.Text className={state ? Css.text() : null} content={item?.data?.text} />
            ) : (
              <UU5.Forms.Text onChange={(opt) => setItemName(opt.value)} value={itemName} size="s" />
            )}
            <div>
              {!update ? (
                <UU5.Bricks.Button disabled={state} onClick={() => setUpdate(true)}>
                  <UU5.Bricks.Icon icon="fa-magic" />
                </UU5.Bricks.Button>
              ) : (
                <div>
                  <UU5.Bricks.ButtonGroup size="s">
                    <UU5.Bricks.Button onClick={() => confirm.open(handleOpenConfirmModal())}>
                      <UU5.Bricks.Icon icon="fa-trash" />
                    </UU5.Bricks.Button>
                    <UU5.Bricks.Button
                      onClick={() => {
                        updateItem(itemName);
                        setUpdate(false);
                      }}
                    >
                      <UU5.Bricks.Icon icon="fa-check" />
                    </UU5.Bricks.Button>
                  </UU5.Bricks.ButtonGroup>
                </div>
              )}
            </div>
          </div>
        </UU5.Bricks.Card>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default ItemBlock;
