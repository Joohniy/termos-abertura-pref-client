import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

const renderWithReactRouter = (ui, options) => {
    return render(ui, { wrapper: Router, ...options });
}
  
export * from "@testing-library/react";
export { renderWithReactRouter };
