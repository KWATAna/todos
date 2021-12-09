//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "../../config/config";
import Css from "./list-component.css";
import Lsi from "../../../config/lsi";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TodoList",
  //@@viewOff:statics
};

export const ListComponent = createVisualComponent({
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
    const [active, setActive] = useState(false);
    const [listName, setListName] = useState(props.list?.data?.name);
    console.log(213, listName);
    const list = props.list;
    const dataListResult = props.dataListResult;
    // @@viewOn:hooks
    //@@viewOff:hooks
    //@@viewOn:private
    function deleteList(id) {
      const dtoIn = { forceDelete: true, id };

      try {
        dataListResult.handlerMap.delete(dtoIn);
      } catch (e) {
        console.log(e, "error");
      }
    }

    function updateList(id) {
      const dtoIn = { name: listName, id };
      try {
        dataListResult.handlerMap.update(dtoIn);
        console.log(dtoIn, "dtoIn");
      } catch (e) {
        console.log(e, "error");
      }
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div className={Css.listStyle()}>
        {!active ? (
          <UU5.Bricks.Lsi lsi={Lsi.left(list?.data.name)} />
        ) : (
          <UU5.Forms.Text onChange={(opt) => setListName(opt.value)} value={listName} size="s" />
        )}
        {!active ? (
          <UU5.Bricks.Button onClick={() => setActive(true)}>
            <UU5.Bricks.Icon icon="fa-magic" />
          </UU5.Bricks.Button>
        ) : (
          <div className={Css.listStyle()}>
            <UU5.Bricks.ButtonGroup size="s">
              <UU5.Bricks.Button onClick={() => deleteList(list?.data?.id)}>
                <UU5.Bricks.Icon icon="fa-trash" />
              </UU5.Bricks.Button>
              <UU5.Bricks.Button
                onClick={() => {
                  updateList(list?.data?.id);
                  setActive(false);
                }}
              >
                <UU5.Bricks.Icon icon="fa-check" />
              </UU5.Bricks.Button>
            </UU5.Bricks.ButtonGroup>
          </div>
        )}
      </div>
    );
    //@@viewOff:render
  },
});

export default ListComponent;
