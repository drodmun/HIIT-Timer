import type { GatsbyBrowser } from "gatsby";
import { RecoilRoot } from "recoil";

export const wrapRootElement: GatsbyBrowser["wrapPageElement"] = ({ element }) => <RecoilRoot>{element}</RecoilRoot>;
