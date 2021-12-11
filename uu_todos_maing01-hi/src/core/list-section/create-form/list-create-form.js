//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useLsiValues } from "uu5g04-hooks";
import Config from "../../../config/config";
import Lsi from "./list-create-form-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CreateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

const ListCreateForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { closeModal, handlerMap, data } = props;

    //@@viewOn:hooks

    const [isLoading, setLoading] = useState(false);

    //@@viewOff:hooks

    //@@viewOn:private
    async function handleCreate(formData) {
      const { values, component } = formData;
      let action = handlerMap.create;
      let response;

      component.setPending();
      try {
        response = await action(values);
      } catch (e) {
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveError} />} />,
          colorSchema: "danger",
        });
      }
      component.setReady();

      if (response) {
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveError} />} />,
          colorSchema: "success",
        });
      }
      closeModal();
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <UU5.Forms.ContextForm
        onSave={handleCreate}
        onCancel={closeModal}
        progressIndicator={<UU5.Bricks.Loading />}
        disabled={isLoading}
      >
        <UU5.Forms.Text label="name" name="name" value={data?.data?.name} />
      </UU5.Forms.ContextForm>
    );
    //@@viewOff:render
  },
});

const ListCreateHeader = () => {
  return (
    <UU5.Forms.ContextHeader
      content={<UU5.Bricks.Lsi lsi={Lsi.header} />}
      info={<UU5.Bricks.Lsi lsi={Lsi.info} params={[Config.TEST_TICKET_SET_STATE]} />}
    />
  );
};

const ListCreateControls = ({ isCreateForm }) => {
  return (
    <UU5.Forms.ContextControls
      buttonSubmitProps={{
        content: <UU5.Bricks.Lsi lsi={isCreateForm ? Lsi.submit("Create") : Lsi.submit("Update")} />,
      }}
      buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.cancel} /> }}
    />
  );
};
export { ListCreateHeader, ListCreateControls, ListCreateForm };
export default ListCreateForm;
