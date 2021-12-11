import Config from "../../config/config";

const listStyle = () => Config.Css.css`
display: flex;
justify-content: space-between;
`;
const btnWrapper = () => Config.Css.css`
margin: 0 auto;
`;
export default {
  listStyle,
  btnWrapper,
};
