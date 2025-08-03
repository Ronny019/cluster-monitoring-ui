import { render } from "@testing-library/react";
import Home from "./page";

// Mock useRouter from next/navigation
const replaceMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
}));

describe("Home (App Root)", () => {
  beforeEach(() => {
    replaceMock.mockClear();
  });

  it("renders nothing", () => {
    const { container } = render(<Home />);
    expect(container).toBeEmptyDOMElement();
  });

  it("redirects to /performance on mount", () => {
    render(<Home />);
    expect(replaceMock).toHaveBeenCalledWith("/performance");
  });
});