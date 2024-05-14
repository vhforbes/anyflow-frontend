import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Home from "../page";

describe("Page", () => {
  describe("Home", () => {
    it("renders without crashing", () => {
      render(<Home />);
    });
  });
});
