import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Navbar from "./Navbar";
import { ClusterProvider } from "../context/ClusterContext";

// Mock next/navigation for usePathname
jest.mock("next/navigation", () => ({
  usePathname: () => "/performance",
}));

describe("Navbar", () => {
  it("renders menu items", () => {
    render(
      <ClusterProvider>
        <Navbar />
      </ClusterProvider>
    );
    expect(screen.getByText("Performance Metrics")).toBeInTheDocument();
    expect(screen.getByText("Edit Snapshot Policy")).toBeInTheDocument();
  });

  it("renders user select and changes user", () => {
    render(
      <ClusterProvider>
        <Navbar />
      </ClusterProvider>
    );
    const userSelect = screen.getByTestId("user-select");
    expect(userSelect).toBeInTheDocument();

    // Fire the change event
    fireEvent.change(userSelect, { target: { value: "AD\\admin" } });

    // Now, check the value
    expect(userSelect).toHaveValue("AD\\admin");
  });
});