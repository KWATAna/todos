//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";
import ListLoader from "../routes/list/common/list-loader.js";
import ListContext from "../routes/list/context/list-context.js";
import DataListStateResolver from "../routes/list/common/data-list-state-resolver.js";
import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
import ListComponent from "../routes/list/list-section/list-component.js";
import ListCreate from "../routes/list/list-section/list-create.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:static
  displayName: Config.TAG + "Left",
  //@@viewOff:static
};

export const Left = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private
    function parseList(dataListResult) {
      return dataListResult?.data?.map((list) => ({
        id: list?.data.id,
        href: `list&listId=${list.data.id}`,

        content: <ListComponent key={list?.data.id} list={list} dataListResult={dataListResult} />,
      }));
    }

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <ListLoader>
        <ListContext.Consumer>
          {(dataListResult) => {
            return (
              <DataListStateResolver dataList={dataListResult}>
                <Plus4U5.App.Left
                  {...props}
                  logoProps={{
                    backgroundColor: UU5.Environment.colors.blue.c700,
                    backgroundColorTo: UU5.Environment.colors.blue.c500,
                    title: "uuTodos",
                    companyLogo: Plus4U5.Environment.basePath + "assets/img/unicorn-logo.svg",
                    generation: "1",
                  }}
                  aboutItems={[{ content: <UU5.Bricks.Lsi lsi={Lsi.left.about} />, href: "about" }]}
                  helpHref={null}
                >
                  <Plus4U5.App.MenuTree borderBottom items={parseList(dataListResult)} />
                  <ListCreate />
                </Plus4U5.App.Left>
              </DataListStateResolver>
            );
          }}
        </ListContext.Consumer>
      </ListLoader>
    );
    //@@viewOff:render
  },
});

export default Left;
