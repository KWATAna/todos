//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "../config/config";
import { useContextModal } from "../list/common/modal-manager";
import { useItem } from "./context/use-item";
import { ListCreateHeader, ListCreateControls, ListCreateForm } from "../list/create-form/list-create-form";
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

    function handleOpenDetailsModal(data) {
      open({
        header: <ListCreateHeader />,
        content: <ListCreateForm data={data} closeModal={close} showAlert={showAlert} />,
        footer: <ListCreateControls />,
      });
    }
    function handleOpenCreateModal(data) {
      open({
        header: <ListCreateHeader />,
        content: (
          <ListCreateForm
            isCreateForm={true}
            listHandlerMap={itemHandlerMap}
            closeModal={close}
            showAlert={showAlert}
          />
        ),
        footer: <ListCreateControls isCreateForm={true} />,
      });
    }
    function handleOpenConfirmModal() {
      return {
        onRefuse: () => console.log("Leave page"),
        onConfirm: () => console.log(data),
        header: "Cookies",
        content: <UU5.Bricks.P>Are you sure you want to delete a joke.</UU5.Bricks.P>,
        confirmButtonProps: { content: "Enter", colorSchema: "green" },
        refuseButtonProps: { content: "Leave page", colorSchema: "danger" },
        confirmButtonLeft: true,
      };
    }
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
        <Uu5Tiles.Grid tileSpacing={8} rowSpacing={8}>
          <ItemBlock
            getConfirmRef={getConfirmRef}
            handleOpenDetailsModal={handleOpenDetailsModal}
            handleOpenConfirmModal={handleOpenConfirmModal}
          ></ItemBlock>
        </Uu5Tiles.Grid>
      </Uu5Tiles.ControllerProvider>
    ) : null;
    //@@viewOff:render
  },
});

export default ItemTiles;
