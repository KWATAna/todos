//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import ListContext from "./list/context/list-context.js";
import Config from "./config/config.js";
import ListLoader from "./list/common/list-loader.js";
import Lsi from "../config/lsi.js";
import DataListStateResolver from "./list/common/data-list-state-resolver.js";
import WelcomeRow from "../bricks/welcome-row.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "List",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  welcomeRow: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;
  
    ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}
  
    .uu5-bricks-header {
      margin-top: 8px;
    }
    
    .plus4u5-bricks-user-photo {
      margin: 0 auto;
    }
  `,
};

export const List = createVisualComponent({
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
      <div {...attrs}>
          <div>DADADA</div>
          {
        // <ListLoader>
        //   <ListContext.Consumer>
        //     {(dataListResult) => {
        //       return (
        //         <DataListStateResolver dataList={dataListResult}>
        //           <div>simple text: {JSON.stringify(dataListResult)}</div>
        //         </DataListStateResolver>
        //       );
        //     }}
        //   </ListContext.Consumer>
        // </ListLoader>
  }
      </div>
    );
    //@@viewOff:render
  },
});

export default List;
