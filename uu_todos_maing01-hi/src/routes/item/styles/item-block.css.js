import Config from "../../config/config";

const header = () => Config.Css.css`
 display: flex;
 justify-content: space-between;
`;

const text = () => Config.Css.css`
text-decoration:line-through;
`;
const checkbox = () => Config.Css.css`
    display:inline-block;
`;

export default { header, text, checkbox };
