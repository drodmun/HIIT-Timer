import type { GatsbyBrowser } from "gatsby";
import { RecoilRoot } from "recoil";
import "@src/global_styles.css";

export const wrapRootElement: GatsbyBrowser["wrapPageElement"] = ({ element }) => <RecoilRoot>{element}</RecoilRoot>;
