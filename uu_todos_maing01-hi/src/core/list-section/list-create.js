//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../../config/config";
import Css from "./list-component.css";
import { useContextModal } from "../../common/modal-manager";
import { useList } from "./context/use-list";
import { ListCreateControls, ListCreateHeader, ListCreateForm } from "./create-form/list-create-form";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TodoList",
  //@@viewOff:statics
};

export const ListCreate = createVisualComponent({
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
    // @@viewOn:hooks
    const [open, close, showAlert] = useContextModal();
    const { handlerMap } = useList();

    //@@viewOff:hooks
    //@@viewOn:private
    function openCreateModal() {
      open({
        header: <ListCreateHeader />,
        content: <ListCreateForm handlerMap={handlerMap} closeModal={close} showAlert={showAlert} />,
        footer: <ListCreateControls />,
      });
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div className={Css.btnStyle()}>
        <UU5.Bricks.Button onClick={() => openCreateModal()} className={Css.btnStyle()}>
          Create New List
        </UU5.Bricks.Button>
      </div>
    );
    //@@viewOff:render
  },
});

export default ListCreate;
