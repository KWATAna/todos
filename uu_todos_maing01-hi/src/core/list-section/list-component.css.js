import Config from "../../config/config";

const listStyle = () => Config.Css.css`
display: flex;
justify-content: space-between;
`;

const btnStyle = () => Config.Css.css`
text-align: center;`;

const divStyle = () => Config.Css.css`
display: flex;`;

export default {
  listStyle,
  btnStyle,
  divStyle,
};
