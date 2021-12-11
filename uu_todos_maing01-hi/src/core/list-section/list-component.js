//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "../../config/config";
import Css from "./list-component.css";
import Lsi from "../../config/lsi";
import { useContextModal } from "../../common/modal-manager";

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
    const list = props.list;
    const { handlerMap } = list;
    const [, , , getConfirmRef] = useContextModal();
    const [forceDel, setForceDel] = useState(false);

    // @@viewOn:hooks
    //@@viewOff:hooks
    //@@viewOn:private
    function handleOpenConfirmModal(id) {
      return getConfirmRef().open({
        onRefuse: () => console.log("confirmed"),
        onConfirm: () => deleteList(id),
        header: "Cookies",
        content: <UU5.Bricks.P>Are you sure you want to delete this TODO LIST.</UU5.Bricks.P>,
        confirmButtonProps: { content: "Delete", colorSchema: "danger" },
        refuseButtonProps: { content: "Cancel", colorSchema: "green" },
        confirmButtonLeft: true,
      });
    }

    function deleteList(id) {
      const dtoIn = { forceDelete: true };

      try {
        if (forceDel) {
          handlerMap.delete(dtoIn);
          UU5.Environment.setRoute({
            url: { useCase: "home" },
          });
        } else {
          handlerMap.delete();
          setActive(!active);
        }
      } catch (e) {
        console.log(e, "delete list error");
      }
    }

    function updateList(id) {
      const dtoIn = { name: listName };
      try {
        handlerMap.update(dtoIn);
      } catch (e) {
        console.log(e, "error");
      }
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    //
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
          <div>
            <UU5.Bricks.ButtonGroup size="s">
              <UU5.Bricks.Button onClick={handleOpenConfirmModal}>
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
            <UU5.Forms.Checkbox label="force delete" value={forceDel} onChange={(opt) => setForceDel(opt.value)} />
          </div>
        )}
      </div>
    );
    //@@viewOff:render
  },
});

export default ListComponent;
